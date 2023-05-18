import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageHome(language);
  };

  returnToHome = () => {
    this.props.history.push("/home");
  };

  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="logo">
              <i className="fas fa-bars"></i>
              <img
                className="header-logo"
                src={logo}
                onClick={() => this.returnToHome()}
              />
              <div className="header-logo"></div>
            </div>
            <div className="navigation">
              <ul className="nav">
                <li>
                  <div className="title-header">
                    <FormattedMessage id="home-header.specially" />
                  </div>
                  <div className="description">
                    <FormattedMessage id="home-header.searchdoctor" />
                  </div>
                </li>

                <li>
                  <div className="title-header">
                    <FormattedMessage id="home-header.health-facility" />
                  </div>
                  <div className="description">
                    <FormattedMessage id="home-header.select-clinic" />
                  </div>
                </li>

                <li>
                  <div className="title-header">
                    <FormattedMessage id="home-header.doctor" />
                  </div>
                  <div className="description">
                    <FormattedMessage id="home-header.select-doctor" />
                  </div>
                </li>

                <li>
                  <div className="title-header">
                    <FormattedMessage id="home-header.fee" />
                  </div>
                  <div className="description">
                    <FormattedMessage id="home-header.check" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="help">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>

              <div className="language">
                <div className="language-vi">
                  <span
                    className={language === "vi" ? "active" : null}
                    onClick={() => this.changeLanguage(LANGUAGES.VI)}
                  >
                    VN
                  </span>
                </div>
                <div className="language-en">
                  <span
                    className={language === "en" ? "active" : null}
                    onClick={() => this.changeLanguage(LANGUAGES.EN)}
                  >
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner ? (
          <div className="banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm chuyên khóa khám bệnh" />
              </div>
            </div>

            <div className="content-down">
              <div className="options">
                <ul className="list-options">
                  <li className="option-child">
                    <div className="icon-child">
                      <i className="far fa-hospital"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.specialist-examination" />
                    </div>
                  </li>

                  <li className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.remote-exam" />
                    </div>
                  </li>

                  <li className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-procedures"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.general-exam" />
                    </div>
                  </li>

                  <li className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-flask"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.medical-test" />
                    </div>
                  </li>

                  <li className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-user-md"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.mental-health" />
                    </div>
                  </li>

                  <li className="option-child">
                    <div className="icon-child">
                      <i className="fas fa-briefcase-medical"></i>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.dental-examination" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageHome: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
