const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

//npm install express body-parser 했었는데
//express app이 body-parser를 쓸 수 있게
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

//해당주소로 들어오고, 함수작동하게
app.get("/api/hello", (req, res) => {
  res.send({ mesage: "Hello Express!" });
});

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});

// [
//   {
//     id: 1,
//     image: "https://placeimg.com/64/64/1",
//     name: "EBRA",
//     birthday: "900914",
//     gender: "남자",
//     job: "무직",
//   },
//   {
//     id: 2,
//     image: "https://placeimg.com/64/64/2",
//     name: "MESSI",
//     birthday: "870914",
//     gender: "남자",
//     job: "무직",
//   },
//   {
//     id: 3,
//     image: "https://placeimg.com/64/64/3",
//     name: "COCU",
//     birthday: "760914",
//     gender: "남자",
//     job: "축구선수",
//   },
// ]
//하드코딩된 데이터는 필요없게 된다. 디비와 연동할거니까

//해당 포트번호로 데이터요청을 듣고 있게 한다
// ${ } 달러기호 붙이기 템플릿리터럴내에서 변수사용
app.listen(port, () => console.log(`Listening on port ${port}`));
