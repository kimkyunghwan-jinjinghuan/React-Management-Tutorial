import React from "react";

class CustomerDelete extends React.Component {
  deleteCustomer(id) {
    //어떤 녀석을 삭제할지에 대한 대상에 대한 정보가 필요해
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    this.props.stateRefresh(); //App.js에 있는 stateRefresh()함수
  }

  render() {
    return (
      <button
        onClick={(e) => {
          this.deleteCustomer(this.props.id);
        }}
      >
        삭제
      </button>
    );
  }
}

export default CustomerDelete;
