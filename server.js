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

const multer = require("multer");
const upload = multer({ dest: "./upload" }); //사용자의 파일이 업로드파일에, 여기서 내가 multer라고 해야하는데 require오타내서 시간을...

//해당주소로 들어오고, 함수작동하게
app.get("/api/hello", (req, res) => {
  res.send({ mesage: "Hello Express!" });
});

app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
  //고객데이터 삽입요청 처리해주기
  //사용자로부터 이미지사진도 받아와야 파일처리를 위해 multer라이브러리 설치해준다
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

app.use(
  "/Users/kimkyunghwan/React-Project-Tutorial/management/image",
  express.static("./upload")
);
//업로드폴더를 공유하도록
//이미지폴더에서 해당 업로드폴더에 접근할 수 있도록

app.post("/api/customers", upload.single("image"), (req, res) => {
  //바이너리파일 받아올 변수 image설정
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)"; //sql문 준비해주고, db에서 auto-increment설정해줬고, 0 삭제되지 않은 상태값
  let image =
    "/Users/kimkyunghwan/React-Project-Tutorial/management/image/" +
    req.file.filename;
  let name = req.body.name; //request body
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(image); //데이터 확인용
  console.log(name);
  console.log(birthday);
  console.log(gender);
  console.log(job);
  let params = [image, name, birthday, gender, job];

  //query(변수1, 변수2, 함수객체콜백함수)s
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
    console.log(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id=?"; //:id 이게 params구나 index.d.ts에 정의되어있다. 동적인 부분이 파라미터
  console.log(req.params);
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//해당 포트번호로 데이터요청을 듣고 있게 한다
// ${ } 달러기호 붙이기 템플릿리터럴내에서 변수사용
app.listen(port, () => console.log(`Listening on port ${port}`)); //포트번호 3000
