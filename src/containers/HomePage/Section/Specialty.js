import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

class Specialty extends Component {
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
      <div className="specialty section-home">
        <div className="section-container">
          <div className="section-header">
            <h2>Chuyên khoa phổ biến</h2>
            <button>Xem thêm</button>
          </div>

          <div className="section-body">
            <Slider {...settings}>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Cơ xương khớp 1</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Cơ xương khớp 1</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Cơ xương khớp 1</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Cơ xương khớp 1</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Cơ xương khớp 1</span>
              </div>
              <div className="section-content">
                <div className="section-img" />
                <span className="description">Cơ xương khớp 1</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
