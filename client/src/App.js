import React, { Component } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import "./App.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowx: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    marginp: theme.spacing(2),
  },
});

// const custormers = [
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
// ];
// //위 부분이 데이터베이스에 스테이트로 여기 있던 데이터들이 server.js로

class App extends Component {
  // state = {
  //   customers: "",
  //   completed: 0,
  // };
  constructor(props) {
    //초기화
    super(props);
    this.state = {
      customers: "",
      completed: 0,
    };
  }

  stateRefresh = () => {
    this.setState({
      //초기화하는 setState(), 뒤에서 callApi()에서 또 setState()를, 부분갱신을 위해서 각 이벤트핸들러함수에 초기화setState를 다 날리고 다시 그리기
      //실제로 상용서비스에서 적용할때는 최근 10개 목록만 가져오게 하고, 그 이후는 스크롤을 통해서 불러오도록하는 방식으로
      customers: "",
      completed: 0,
    });
    this.callApi()
      .then((res) => this.setState({ customers: res })) //res는 배열 [ {},{},{} ]
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); //progress함수가 0.2초마다 실행되도록
    this.callApi()
      .then((res) => this.setState({ customers: res })) //res는 배열 [ {},{},{} ]
      .catch((err) => console.log(err));
  }

  //async function(param){ }
  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    // console.log(classes);

    return (
      <div>
        <Paper>
          <Table className={classes.root}>
            <TableHead className={classes.table}>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableHead>
            <TableBody>
              {
                //customers배열을 c로 순회 travers한다
                this.state.customers ? (
                  this.state.customers.map((c) => {
                    return (
                      <Customer
                        key={c.id}
                        id={c.id}
                        image={c.image}
                        name={c.name}
                        birthday={c.birthday}
                        gender={c.gender}
                        job={c.job}
                      ></Customer>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress
                        className={classes.progress}
                        variant="determinate"
                        value={this.state.completed}
                      />
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
// export default App;
