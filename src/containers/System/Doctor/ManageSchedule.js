import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
import moment from "moment";

import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: Date.now(),
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorsStart();
    this.props.fetchAllHourStart();
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: this.buildDataSelect(this.props.allDoctors),
      });
    }
    if (preProps.language !== this.props.language) {
      this.setState({
        listDoctors: this.buildDataSelect(this.props.allDoctors),
      });
    }

    if (preProps.allTime !== this.props.allTime) {
      let data = this.props.allTime;

      if (data && data.length > 0) {
        data = data.map((item, index) => ({ ...item, isSelected: false }));
      }

      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataSelect = (data) => {
    let language = this.props.language;
    if (data && data.length > 0) {
      return data.map((item, index) => ({
        value: item.id,
        label:
          language === LANGUAGES.VI
            ? `${item.lastName} ${item.firstName}`
            : `${item.firstName} ${item.lastName}`,
      }));
    }

    return [];
  };

  handleChangeSelected = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickButtonTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      let data = rangeTime.map((item, index) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }

        return item;
      });

      this.setState({
        rangeTime: data,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid Date!");
      return;
    }

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid Selected doctor");
      return;
    }

    let formattedDate = new Date(currentDate).getTime();
    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(
        (item, index) => item.isSelected === true
      );

      if (selectedTime && selectedTime.length > 0) {
        selectedTime.forEach((schedule) => {
          result.push({
            doctorId: selectedDoctor.value,
            date: formattedDate,
            timeType: schedule.keyMap,
          });
        });
      } else {
        toast.error("Invalid Selected time");
        return;
      }
    }

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: "" + formattedDate,
    });
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="schedule-container">
        <div className="schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelected}
                options={this.state.listDoctors}
              />
            </div>

            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                // value={this.state.currentDate}
                // selected={this.state.currentDate}
                minDate={new Date().setHours(0, 0, 0, 0)}
              />
            </div>
          </div>
          <div className="pick-hour">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, index) => (
                <button
                  className={
                    item.isSelected
                      ? "btn btn-schedule active"
                      : "btn btn-schedule"
                  }
                  key={index}
                  onClick={() => this.handleClickButtonTime(item)}
                >
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </button>
              ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-primary btn-save-schedule"
              onClick={() => this.handleSaveSchedule()}
            >
              <FormattedMessage id="manage-schedule.save" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allTime: state.admin.allTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
    fetchAllHourStart: () => dispatch(actions.fetchAllHourStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
