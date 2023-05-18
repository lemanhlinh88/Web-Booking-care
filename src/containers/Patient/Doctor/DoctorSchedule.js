import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils/constant";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  async componentDidMount() {
    let arrDate = this.getAllAvailableTime();

    this.setState({
      allDays: arrDate,
    });
  }

  getAllAvailableTime = () => {
    let { language } = this.props;

    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      if (language === LANGUAGES.VI) {
        arrDate.push({
          label: moment(new Date()).add(i, "days").format("dddd - DD/MM"),
          value: moment(new Date()).add(i, "days").startOf("day").valueOf(),
        });
      } else {
        arrDate.push({
          label: moment(new Date())
            .add(i, "days")
            .local("en")
            .format("ddd - DD/MM"),
          value: moment(new Date()).add(i, "days").startOf("day").valueOf(),
        });
      }
    }

    return arrDate;
  };

  async componentDidUpdate(prevProps, prevStates) {
    if (this.props.language !== prevProps.language) {
      let arrDate = this.getAllAvailableTime();

      this.setState({
        allDays: arrDate,
      });
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let arrDate = this.getAllAvailableTime();

      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        arrDate[0].value
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log(res);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnchangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calender">
            <span>
              <i className="fas fa-calendar-alt"></i>
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>

          <div className="time-content">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              <>
                <div className="buttons">
                  {allAvailableTime.map((item, index) => (
                    <button
                      key={index}
                      className={
                        language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                      }
                    >
                      {language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>
                  ))}
                </div>

                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <i className="far fa-hand-point-up"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="font-italic font-weight-bold">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
