import React, { useState, useEffect } from "react";
// ** styles
import "../../assets/styles/UniversityProfileTab.css";
import { useDispatch } from "react-redux";
import { UpdateInfoUniv } from "../../redux/university/university.actions";
import { Row, Col } from "reactstrap";
import { useTranslation } from "react-i18next";
import i18n from "../../functions/i18n";
import ARRAY_NUMBER from "../../assets/CountriesN";
// ** ==>
function GeneralInfos({ univ }) {
  const [form, setForm] = useState({
    nom: "",
    fullname: "",
    tel: "",
    OrganMere: "",
    address: "",
    pays: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const { nom, fullname, tel, OrganMere, address, pays } = univ;
    setForm({ nom, fullname, tel, OrganMere, address, pays });
  }, [univ]);

  const handle_change = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const { description, long_desc } = univ;
    let old_data = { description, long_desc };
    dispatch(UpdateInfoUniv(univ.id, { ...old_data, ...form }, () => {}));
  };

  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Col md={6} xs={12}>
          <p className="section_title_style text-capitalize title_second pt-3 mt-5">
            {t("uni_params.label")} <span className="color_second">*</span>
          </p>
          <input
            className="bios_container w-100"
            placeholder="Libelle de l'université"
            value={form.nom}
            name="nom"
            onChange={handle_change}
          />
        </Col>

        <Col md={6} xs={12}>
          <p className="section_title_style text-capitalize title_second pt-3 mt-5">
            {t("uni_params.university_name")}{" "}
            <span className="color_second">*</span>
          </p>
          <input
            className="bios_container w-100"
            placeholder="Full University Name"
            value={form.fullname}
            name="fullname"
            onChange={handle_change}
          />
        </Col>

        <Col md={6} xs={12}>
          <p className="section_title_style text-capitalize title_second pt-3 mt-5">
            {t("uni_params.organization_parent_2")}{" "}
            <span className="color_second">*</span>
          </p>
          <input
            className="bios_container w-100"
            placeholder="Organisation Mére"
            value={form.OrganMere}
            name="OrganMere"
            onChange={handle_change}
          />
        </Col>

        <Col md={6} xs={12}>
          <p className="section_title_style text-capitalize title_second pt-3 mt-5">
            {t("uni_params.phone_number_2")}{" "}
            <span className="color_second">*</span>
          </p>
          <input
            className="bios_container w-100"
            placeholder="Numero De Telephone"
            value={form.tel}
            name="tel"
            onChange={handle_change}
          />
        </Col>

        <Col md={6} xs={12}>
          <p className="section_title_style text-capitalize title_second pt-3 mt-5">
            {t("uni_params.address_2")} <span className="color_second">*</span>
          </p>
          <input
            className="bios_container w-100"
            placeholder="address"
            value={form.address}
            name="address"
            onChange={handle_change}
          />
        </Col>

        <Col md={6} xs={12}>
          <p className="section_title_style text-capitalize title_second pt-3 mt-5">
            {t("uni_params.country_2")} <span className="color_second">*</span>
          </p>
          <select
            className="bios_container w-100"
            placeholder={univ.pays}
            value={form.pays.toLowerCase()}
            name="pays"
            onChange={handle_change}
          >
            {ARRAY_NUMBER.map((x) => {
              return (
                <option value={x.country.toLowerCase()}>{x.country}</option>
              );
            })}
          </select>
        </Col>
      </Row>

      <button
        className="btn main_btn w-100 signup_btn title_second my-3"
        onClick={handleSubmit}
      >
        {t("uni_params.modify_data")}
      </button>
    </div>
  );
}

export default GeneralInfos;
