import React from "react";
import { Row } from "reactstrap";
// ** assets
import yellow_points from "../assets/images/yellow_points.webp";

import profile_card_yellow from "../assets/images/profile_card_yellow.webp";
// ** styles
import "../assets/styles/ProfileCard.css";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// ** ==>
function ProfileCard({ image, name, email }) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <div
      className={
        isMobile ? "profile_card_container" : "profile_card_container me-4"
      }
    >
      <div className="d-flex justify-content-between align-items-start">
        <div classname="d-flex justify-content-start">
          <img
            src={profile_card_yellow}
            className="corner_picture"
            alt="half yellow circle"
          />
        </div>
      </div>
      <div className="d-flex w-100 justify-content-center">
        <div className="user_picture_container d-flex align-items-center justify-content-center">
          {(image?.length || "") === 0 ? (
            <div className="avatar-big">
              {name.split(" ")[0][0].toUpperCase()}
              {name.split(" ")[1][0].toUpperCase()}
            </div>
          ) : (
            <img
              src={image}
              alt="user picture"
              className="img-fluid user_picture_border"
              style={{ width: "121px", height: "121px" }}
            />
          )}
        </div>
      </div>
      <div className="w-100 pt-5">
        <p className="name_styling user_name text-center title_forth">{name}</p>
      </div>
      <div className="w-100 pt-3 pb-3">
        <p className="section_title_style user_name text-center title_forth">
          {email}
        </p>
      </div>
      <div className="w-100 pt-3 d-flex justify-content-center btn_card_container mb-5"></div>
      <div className="d-flex justify-content-between align-items-start">
        <div className="p-4 mt-4 me-5">
          <img src={yellow_points} height="60" alt="half yellow circle" />
        </div>
        <div classname="d-flex justify-content-start">
          <img
            src={profile_card_yellow}
            className="corner_picture3"
            alt="half yellow circle"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
