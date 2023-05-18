import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({
        currentDoctorId: this.props.match.params.id,
      });

      let id = this.props.match.params.id;
      let res = await getDetailInfoDoctor(id);

      if (res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate() {}

  render() {
    let doctor = this.state.detailDoctor;

    return (
      <div>
        <HomeHeader isShowBanner={false} />
        <div className="docter-detail-comtainer">
          <div className="intro-doctor">
            <div
              className="img"
              style={{
                backgroundImage: `url(${doctor.image || ""})`,
              }}
            ></div>
            <div className="introduction">
              <div className="up">
                {doctor &&
                  doctor.positionData &&
                  `${
                    this.props.language === LANGUAGES.VI
                      ? doctor.positionData.valueVi
                      : doctor.positionData.valueEn
                  }, ${doctor.lastName} ${doctor.firstName}`}
              </div>
              <div className="down">
                {doctor.Markdown && <span>{doctor.Markdown.description}</span>}
              </div>
            </div>
          </div>
          <div className="schedule">
            <div>
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>

            <div></div>
          </div>
          <div className="detail-info">
            {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: doctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comments"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
