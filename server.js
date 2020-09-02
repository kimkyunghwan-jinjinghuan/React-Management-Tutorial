const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//해당주소로 들어오고, 함수작동하게
app.get("/api/hello", (req, res) => {
  res.send({ mesage: "Hello Express!" });
});

//해당 포트번호로 데이터요청을 듣고 있게 한다
// ${ } 달러기호 붙이기 템플릿리터럴내에서 변수사용
app.listen(port, () => console.log(`Listening on port ${port}`));
