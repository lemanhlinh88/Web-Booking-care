import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="about">
        <h2 className="about-header">Truyền thông nói về BookingCare</h2>

        <div className="about-content">
          <div className="about-video">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <p className="about-description">
            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện cung cấp
            nền tảng công nghệ giúp bệnh nhân dễ dàng lựa chọn đúng bác sĩ từ
            mạng lưới bác sĩ chuyên khoa giỏi, với thông tin đã xác thực và đặt
            lịch nhanh chóng.
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
