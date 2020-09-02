import React, { Component } from "react";
import Customer from "./components/Customer";

import "./App.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowx: "auto",
  },
  table: {
    minWidth: 1080,
  },
});

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
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "MESSI",
    birthday: "870914",
    gender: "남자",
    job: "무직",
  },
  {
    id: 3,
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
    const { classes } = this.props;
    // console.log(classes);

    return (
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
              custormers.map((c) => {
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
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
// export default App;
