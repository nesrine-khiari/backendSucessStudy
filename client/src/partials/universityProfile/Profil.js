import React from "react";
import { Check } from "react-feather";
import { useTranslation } from "react-i18next";
import { Input, Label } from "reactstrap";
// ** styles
import "../../assets/styles/UniversityProfileTab.css";
// ** ==>
function Profil({ univ }) {

  const {t} = useTranslation()

  return (
    <div>
      <p className="section_title_style text-capitalize title_second pt-2 mt-5">
        {t('uni_params.name')}
      </p>

      <p className="type_name_3 title_second mb-3 pt-2 color_main">
        {univ?.nom}
      </p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3 ">
      {t('uni_params.full_name')}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">{univ?.fullname}</p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3 ">
      {t('uni_params.phone_number')}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">{univ.tel}</p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3">
      {t('uni_params.country')}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">
        {/* <Check size={25} className="type_name color_second me-4 color_main" /> */}
        {univ.pays}
      </p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3">
      {t('uni_params.organization_parent')}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">
        {/* <Check size={25} className="type_name color_second me-4 color_main" /> */}
        {univ.OrganMere}
      </p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3">
        {t('uni_params.address')}
      </p>

      <p className="type_name_3 pt-3 mb-3 color_main">
        {/* <Check size={25} className="type_name color_second me-4 color_main" /> */}
        {univ.address}
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

export default Profil;
