import React from "react";
import { Row } from "reactstrap";
// ** Parts
import Footer from "../partials/footer/Footer";
import AuthNavBar from "../partials/header/AuthNavBar";
// ** assets
import profile_card_yellow from "../assets/images/profile_card_yellow.webp";
import yellow_points from "../assets/images/yellow_points.webp";
import user_big from "../assets/images/user_big.webp";
// ** styles
import "../assets/styles/StudentProfileCard.css";
// ** ==>
function StudentProfileCard() {
  return (
    <>
      <AuthNavBar />
      <main className="profile_card">
        <div className="d-flex justify-content-between align-items-start">
          <div classname="d-flex justify-content-start">
            <img
              src={profile_card_yellow}
              className="corner_picture"
              alt="half yellow circle"
            />
          </div>
          <div className="p-4">
            <img src={yellow_points} height="60" alt="half yellow circle" />
          </div>
        </div>
        <div className="d-flex">
          <div className="user_picture_container d-flex align-items-center justify-content-center">
            <img
              src={user_big}
              alt="user picture"
              className="img-fluid user_picture_border"
            />
          </div>
          <div className="ps-3 pt-5 mt-5">
            <p className="user_name  title_forth">No9bisama</p>
            <p className="user_email user_email_position title_second">
              No9bisama@email.com
            </p>
          </div>
          <div></div>
        </div>
        <div className="card_p_container title_second">
          <p className="profile_card_p">Ravi de nous voir parmi nous</p>
          <p className="profile_card_p">
            Finalisons ensemble la configuration de votre compte
          </p>
          <button className="btn main_btn profile_btn_p ps-0 mt-4 title_forth">
            Continuer
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-start">
          <div className="m-4">
            <img src={yellow_points} height="90" alt="half yellow circle" />
          </div>
          <div classname="d-flex justify-content-start">

            <img
              src={profile_card_yellow}
              className="corner_picture2"
              alt="half yellow circle"
            />
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default StudentProfileCard;
