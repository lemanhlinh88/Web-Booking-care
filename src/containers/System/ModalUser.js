import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phoneNumber: "",
      gender: "1",
      role: "1",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODEL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        phoneNumber: "",
        gender: "1",
        role: "1",
      });
    });
  };

  componentDidMount() {}

  toggle = () => {
    this.props.onToggle();
  };

  handleOnchaneInput = (event, id) => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstname",
      "lastname",
      "address",
      "phoneNumber",
    ];
    let arrInputLength = arrInput.length;

    for (let i = 0; i < arrInputLength; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameter: " + arrInput[i]);
        return false;
      }
    }

    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();

    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size="lg">
        <ModalHeader toggle={() => this.toggle()}>
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => this.handleOnchaneInput(event, "email")}
                  value={this.state.email}
                />
              </div>

              <div className="form-group col-6">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={(event) =>
                    this.handleOnchaneInput(event, "password")
                  }
                  value={this.state.password}
                />
              </div>

              <div className="form-group col-md-6 mt-3">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="firstname"
                  name="firstname"
                  onChange={(event) =>
                    this.handleOnchaneInput(event, "firstname")
                  }
                  value={this.state.firstname}
                />
              </div>

              <div className="form-group col-md-6 mt-3">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="lastname"
                  className="form-control"
                  id="lastname"
                  placeholder="lastname"
                  name="lastname"
                  onChange={(event) =>
                    this.handleOnchaneInput(event, "lastname")
                  }
                  value={this.state.lastname}
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  name="address"
                  onChange={(event) =>
                    this.handleOnchaneInput(event, "address")
                  }
                  value={this.state.address}
                />
              </div>

              <div className="form-phone-gender-role mt-3">
                <div className="form-group col-md-6">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={(event) =>
                      this.handleOnchaneInput(event, "phoneNumber")
                    }
                    value={this.state.phoneNumber}
                  />
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputState">Gender</label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="Gender"
                    onChange={(event) =>
                      this.handleOnchaneInput(event, "gender")
                    }
                    value={this.state.gender}
                  >
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    className="form-control"
                    name="role"
                    onChange={(event) => this.handleOnchaneInput(event, "role")}
                    value={this.state.role}
                  >
                    <option value="1">Admin</option>
                    <option value="2">Doctor</option>
                    <option value="3">Patient</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-4 bg-primary"
            onClick={() => this.handleAddNewUser()}
          >
            Add new
          </Button>
          <Button className="px-4 bg-secondary" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
