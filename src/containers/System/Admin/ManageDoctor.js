import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUDACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

import { getDetailInfoDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // save to doctor_info
      listPrice: [],
      selectedPrice: "",
      listPayment: [],
      selectedPayment: "",
      listProvince: [],
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorsStart();
    this.props.getDoctorPrice();
    this.props.getDoctorPayment();
    this.props.getDoctorProvince();
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: this.buildDataSelect(this.props.allDoctors, "USER"),
      });
    }
    if (preProps.allPrice !== this.props.allPrice) {
      this.setState({
        listPrice: this.buildDataSelect(this.props.allPrice, "PRICE"),
      });
    }
    if (preProps.allPayment !== this.props.allPayment) {
      this.setState({
        listPayment: this.buildDataSelect(this.props.allPayment),
      });
    }
    if (preProps.allProvince !== this.props.allProvince) {
      this.setState({
        listProvince: this.buildDataSelect(this.props.allProvince),
      });
    }
    if (preProps.language !== this.props.language) {
      this.setState({
        listDoctors: this.buildDataSelect(this.props.allDoctors, "USER"),
        listPrice: this.buildDataSelect(this.props.allPrice, "PRICE"),
        listPayment: this.buildDataSelect(this.props.allPayment),
        listProvince: this.buildDataSelect(this.props.allProvince),
      });
    }
  }

  buildDataSelect = (data, type) => {
    let language = this.props.language;
    if (type === "USER") {
      if (data && data.length > 0) {
        return data.map((item, index) => ({
          value: item.id,
          label:
            language === LANGUAGES.VI
              ? `${item.lastName} ${item.firstName}`
              : `${item.firstName} ${item.lastName}`,
        }));
      }
    }
    if (type === "PRICE") {
      if (data && data.length > 0) {
        return data.map((item, index) => ({
          value: item.keyMap,
          label:
            language === LANGUAGES.VI
              ? `${item.valueVi} VND`
              : `${item.valueEn} USD`,
        }));
      }
    } else {
      if (data && data.length > 0) {
        return data.map((item, index) => ({
          value: item.keyMap,
          label:
            language === LANGUAGES.VI ? `${item.valueVi}` : `${item.valueEn}`,
        }));
      }
    }

    return [];
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    console.log("handle save markdonw", this.state);

    this.props.saveADoctorsStart({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action:
        this.state.hasOldData === true ? CRUDACTIONS.EDIT : CRUDACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  handleChangeSelected = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInfoDoctor(selectedDoctor.value);

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnchangeText = (event, id) => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  };

  handleChangeSelectDoctorInfo = (selectedOption, name) => {
    let stateName = name.name;
    this.setState({
      ...this.state,
      [stateName]: selectedOption,
    });
  };

  render() {
    const { selectedDoctor, description, hasOldData } = this.state;
    console.log(this.state);
    return (
      <div className="manage-doctor-container">
        <div className="title mb-5">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>

        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelected}
              options={this.state.listDoctors}
              placeholder={"Chọn bác sĩ"}
            />
          </div>

          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(event) =>
                this.handleOnchangeText(event, "description")
              }
              value={description}
            ></textarea>
          </div>
        </div>

        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              name="selectedProvince"
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event, "nameClinic")}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnchangeText(event, "addressClinic")
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event, "note")}
            />
          </div>
        </div>

        <div className="manage-doctor-editer">
          <MdEditor
            style={{ width: "100%", height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        {hasOldData ? (
          <button
            className="save-content-doctor"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            <FormattedMessage id="admin.manage-doctor.save" />
          </button>
        ) : (
          <button
            className="save-content-doctor create"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            <FormattedMessage id="admin.manage-doctor.add" />
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allPrice: state.admin.allPrice,
    allPayment: state.admin.allPayment,
    allProvince: state.admin.allProvince,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsStart: (id) => dispatch(actions.fetchAllDoctorsStart()),
    saveADoctorsStart: (data) => dispatch(actions.saveADoctorsStart(data)),
    getDoctorPrice: () => dispatch(actions.fetchDoctorPriceStart()),
    getDoctorPayment: () => dispatch(actions.fetchDoctorPaymentStart()),
    getDoctorProvince: () => dispatch(actions.fetchDoctorProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
