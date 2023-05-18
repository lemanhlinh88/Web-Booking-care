import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import "./HomePage.scss";
import MedicalFacility from "./Section/MedicalFacility";
import Doctor from "./Section/Doctor";
import HandBook from "./Section/HandBook";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty />
        <MedicalFacility />
        <Doctor />
        <HandBook />
        <About />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
