import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.users !== this.props.users) {
      this.setState({
        users: this.props.users,
      });
    }
  }

  handleDeleteUser = (item) => {
    this.props.deleteUser(item.id);
  };

  handleEditUser = (item) => {
    this.props.onHandleEditUser(item);
  };

  render() {
    let arrUsers = this.state.users;

    return (
      <React.Fragment>
        <table id="table-manage-user" className="my-5">
          <thead>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.map((item, index) => (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditUser(item)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteUser(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <MdEditor
          style={{ width: "100%", height: "500px", marginBottom: "100px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
