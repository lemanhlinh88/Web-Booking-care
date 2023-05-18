import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUDACTIONS } from "../../../utils/constant";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      userEditId: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: CRUDACTIONS.CREATE,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genders !== this.props.genders) {
      let arrGenders = this.props.genders;
      this.setState({
        ...this.state,
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      let arrRoles = this.props.roles;
      this.setState({
        ...this.state,
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let arrPossitions = this.props.positions;
      this.setState({
        ...this.state,
        positionArr: arrPossitions,
        position:
          arrPossitions && arrPossitions.length > 0
            ? arrPossitions[0].keyMap
            : "",
      });
    }

    if (prevProps.users !== this.props.users) {
      let arrGenders = this.props.genders;
      let arrRoles = this.props.roles;
      let arrPossitions = this.props.positions;
      this.setState({
        ...this.state,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPossitions && arrPossitions.length > 0
            ? arrPossitions[0].keyMap
            : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUDACTIONS.CREATE,
      });
    }
  }

  handleOnchangeInput = (event, id) => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("base64 image", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        avatar: base64,
      });
    }
  };

  handleSaveUser = (event) => {
    event.preventDefault();
    let valid = this.checkValidateInput();
    if (valid === false) return;

    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      avatar: this.state.avatar,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  handleEditUserFromUser = (user) => {
    this.setState({
      ...this.state,
      ...user,
      userEditId: user.id,
      role: user.roleId,
      position: user.positionId,
      avatar: "",
      action: CRUDACTIONS.EDIT,
    });
  };

  handleEditUser = (event) => {
    event.preventDefault();

    this.props.editAUser({
      id: this.state.userEditId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      avatar: this.state.avatar,
    });
  };

  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title mb-3">Learn React-redux với hỏi dan it</div>
        <div className="text-redux-body mb-3 ">
          <div className="container bg-light p-3">
            <form>
              <div className="my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="row mb-2">
                <div className="form-group col-md-3">
                  <label htmlFor="inputEmail4">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    value={email}
                    disabled={
                      this.state.action === CRUDACTIONS.EDIT ? true : false
                    }
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "email")
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputPassword4">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    value={password}
                    disabled={
                      this.state.action === CRUDACTIONS.EDIT ? true : false
                    }
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "password")
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="firstname">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={firstName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "firstName")
                    }
                  />
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="lastname">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={lastName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "lastName")
                    }
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="form-group col-md-3">
                  <label htmlFor="inputphone">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputphone"
                    value={phoneNumber}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  />
                </div>

                <div className="form-group col-md-9">
                  <label htmlFor="inputAddress">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    value={address}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "address")
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="form-group col-md-3">
                  <label htmlFor="inputgender">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="inputgender"
                    className="form-control"
                    value={gender}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "gender")
                    }
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputPosition">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    id="inputPosition"
                    className="form-control"
                    value={position}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "position")
                    }
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputroleid">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    id="inputroleid"
                    className="form-control"
                    value={role}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "role")
                    }
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label htmlFor="inputImage">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <input
                    type="file"
                    id="inputImage"
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                </div>
              </div>
              {this.state.action === CRUDACTIONS.EDIT ? (
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={(event) => this.handleEditUser(event)}
                >
                  <FormattedMessage id="manage-user.edit" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(event) => this.handleSaveUser(event)}
                >
                  <FormattedMessage id="manage-user.save" />
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <TableManageUser onHandleEditUser={this.handleEditUserFromUser} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    positions: state.admin.positions,
    roles: state.admin.roles,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createUserStart(data)),
    fetchUsers: () => dispatch(actions.fetchAllUserStart()),
    editAUser: (user) => dispatch(actions.editUserStart(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
