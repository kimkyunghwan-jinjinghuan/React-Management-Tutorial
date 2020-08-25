import "./App.css";
import React, { Component } from "react";
import Customer from "./components/Customer";

const custormers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "EBRA",
    birthday: "900914",
    gender: "남자",
    job: "무직",
  },
  {
    id: 1,
    image: "https://placeimg.com/64/64/2",
    name: "MESSI",
    birthday: "870914",
    gender: "남자",
    job: "무직",
  },
  {
    id: 1,
    image: "https://placeimg.com/64/64/3",
    name: "COCU",
    birthday: "760914",
    gender: "남자",
    job: "축구선수",
  },
];

//위 부분이 데이터베이스에 스테이트로

class App extends Component {
  render() {
    return (
      <div>
        {
          //customers배열을 c로 순회 travers한다
          custormers.map((c) => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                iamge={c.iamge}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              ></Customer>
            );
          })
        }
        ;
      </div>
    );
  }
}

export default App;
