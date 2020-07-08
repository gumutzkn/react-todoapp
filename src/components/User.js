import React, { Component } from "react";
import PropTypes from "prop-types";
import UserConsumer from "../context";

class User extends Component {
  state = {
    isVisible: false
  };
  static defaultProps = {
    name: "Bilgi Yok",
    salary: "Bilgi Yok",
    department: "Bilgi Yok"
  };

  onClickEvent = () => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  };

  onDeleteUser = (dispatch, e) => {
    const { id } = this.props;
    // Consumer Dispatch
    dispatch({ type: "DELETE_USER", payload: id });
  };

  render() {
    const { name, department, salary } = this.props;
    const { isVisible } = this.state;

    return (
      <UserConsumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="col-md-8 mb-4">
              <div
                className="card"
                style={isVisible ? { background: "#3ffff8" } : null}
              >
                <div className="card-header d-flex justify-content-between">
                  <h4
                    style={{ cursor: "pointer" }}
                    className="d-inline"
                    onClick={this.onClickEvent}
                  >
                    {name}
                  </h4>
                  <i
                    onClick={this.onDeleteUser.bind(this, dispatch)}
                    style={{ cursor: "pointer" }}
                    className="far fa-trash-alt"
                  ></i>
                </div>
                {isVisible ? (
                  <div className="card-body">
                    <p className="card-text">Maaş: {salary} </p>
                    <p className="card-text">Bölüm: {department} </p>
                  </div>
                ) : null}
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
User.propTypes = {
  name: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default User;
