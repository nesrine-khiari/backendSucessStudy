import React, { useEffect } from "react";
import { Check } from "react-feather";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Input, Label } from "reactstrap";
// ** styles

import "../../../assets/styles/StudentSubmission.css";
import i18n from "../../../functions/i18n";
// ** ==>
function ProfileTab() {
  const user = useSelector((state) => state.UserReducer.user);

  const {t} = useTranslation()

  return (
    <div>
      <p className="section_title_style text-capitalize title_second pt-2 mt-5">
        {t('user.user')}
      </p>

      <p className="type_name_3 title_second mb-3 pt-2 color_main">
        {user.firstName} {user.lastName}
      </p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3 ">
        {t('user.email')}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">{user.email}</p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3">
      {t('user.lang')}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">{i18n.language =="fr" ?"Français" : "English" }</p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3">
      {t('user.pays')}
      </p>

      <p className="type_name_3 pt-3 mb-3 color_main">
        {user.pays && (
          <Check size={25} className="type_name color_second me-4 color_main" />
        )}
        {user.pays ? user.pays : "Pas encore définie"}
      </p>

      <p className="section_title_style text-capitalize title_second pt-3">
        Notifications
      </p>

      <div class>
        <div className="form-check form-switch  pt-3">
          <Label for="exampleCustomSwitch" className="form-check-label ps-5">
            <span className="type_name_3 text-capitalize title_second color_main">
              On
            </span>
          </Label>
          <Input
            className="check_input"
            type="switch"
            name="customSwitch"
            id="exampleCustomSwitch"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
