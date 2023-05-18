import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDetailDoctor = (item) => {
    // return <Redirect to={`../doctor/${item.id}`} />;
    this.props.history.push(`/detail-doctor/${item.id}`);
  };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    let { arrDoctors } = this.state;
    let { language } = this.props;
    // arrDoctors = arrDoctors
    //   .concat(arrDoctors)
    //   .concat(arrDoctors)
    //   .concat(arrDoctors);

    return (
      <div className="Doctor section-home">
        <div className="section-container">
          <div className="section-header">
            <h2>
              <FormattedMessage id="homepage.out-standing-doctor" />
            </h2>
            <button>
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>

          <div className="section-body">
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }

                  return (
                    <div
                      className="section-content"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="outer-bg">
                        <div
                          className="section-img"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        />
                      </div>
                      <p className="description text-center px-3">
                        {`${
                          language === LANGUAGES.VI
                            ? item.positionData.valueVi
                            : item.positionData.valueEn
                        }, ${item.lastName} ${item.firstName}`}
                      </p>
                      <p className="spec text-center">Da liễu</p>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctorsStart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
