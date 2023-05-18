import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

class MedicalFacility extends Component {
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

    return (
      <div className="MedicalFacility section-home">
        <div className="section-container">
          <div className="section-header">
            <h2>Cơ sở y tế nổi bật</h2>
            <button>Xem thêm</button>
          </div>

          <div className="section-body">
            <Slider {...settings}>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Hệ thống y tế thu cúc</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Hệ thống y tế thu cúc</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Hệ thống y tế thu cúc</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Hệ thống y tế thu cúc</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Hệ thống y tế thu cúc</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Hệ thống y tế thu cúc</span>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
