import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ** icons
import { Check, DownloadCloud, File, Trash } from "react-feather";
// ** bootsteap
import { ChevronDown, Eye, Mail, Phone, User, MapPin, X } from "react-feather";
import ARRAY_NUMBER from "../../../assets/CountriesN";

import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../../../redux/user/user.actions";
import { useTranslation } from "react-i18next";

function GeneralInfos() {
  const init_user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    tel: "",
    pays: "",
    niveau: "",
  });

  useEffect(() => {
    const { email, firstName, lastName, tel, pays, niveau } = init_user;
    setUser({ email, firstName, lastName, tel, pays, niveau });
  }, [init_user]);

  const handle_change = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateProfile(user, init_user.id));
  };
  const { t } = useTranslation();
  return (
    <Form className="mt-5">
      <Row>
        <Col md={6} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-2 form-label signup_label" id="firstName">
              {t("register.firstName")}
            </Label>
            <InputGroup className="border-0">
              <Input
                id="firstName"
                className="signup_input border_left"
                placeholder="Prénom"
                name="firstName"
                value={user.firstName}
                onChange={handle_change}
              />
              <InputGroupText className="signup_input border_right">
                <User size={18} className="color_grey " />
              </InputGroupText>
            </InputGroup>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-2 form-label signup_label" id="lastName">
              {t("register.lastName")}
            </Label>
            <InputGroup className="border-0">
              <Input
                id="lastName"
                type="text"
                className="signup_input border_left"
                placeholder="Nom de famile"
                name="lastName"
                value={user.lastName}
                onChange={handle_change}
              />
              <InputGroupText className="signup_input border_right">
                <User size={18} className="color_grey " />
              </InputGroupText>
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-2 form-label signup_label" id="email">
              {t("register.email")}
            </Label>
            <InputGroup className="border-0">
              <Input
                id="email"
                className="signup_input border_left"
                placeholder="Adresse e-mail"
                name="email"
                value={user.email}
                onChange={handle_change}
              />
              <InputGroupText className="signup_input border_right">
                <Mail size={18} className="color_grey " />
              </InputGroupText>
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-2 form-label signup_label">
              {t("register.num")}
            </Label>
            <InputGroup className="border-0">
              <Input
                className="signup_input border_left"
                placeholder="Numéro de téléphone"
                name="tel"
                value={user.tel}
                onChange={handle_change}
              />
              <InputGroupText className="signup_input border_right">
                <Phone size={18} className="color_grey " />
              </InputGroupText>
            </InputGroup>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-2 form-label signup_label" id="password">
              {t("register.country")}
            </Label>
            <InputGroup className="border-0">
              <select
                className="signup_input border_left"
                placeholder={init_user.pays}
                value={user.pays.toLowerCase()}
                name="pays"
                onChange={handle_change}
              >
                {ARRAY_NUMBER.map((x) => {
                  return (
                    <option value={x.country.toLowerCase()}>{x.country}</option>
                  );
                })}
              </select>
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-3 form-label signup_label" id="password">
              {t("user.level")}
            </Label>
            <InputGroup>
              <Input
                className="signup_input"
                placeholder="Pays"
                type="select"
                name="niveau"
                value={user.niveau}
                onChange={handle_change}
              >
                <option value="Avec Bac">{t("user.with")}</option>
                <option value="Sans Bac">{t("user.not_with")}</option>
              </Input>
            </InputGroup>
          </div>
        </Col>
      </Row>

      <button
        className="btn main_btn w-100 signup_btn title_second mb-1"
        onClick={handleSubmit}
      >
        {t("user.change_in")}
      </button>
    </Form>
  );
}

export default GeneralInfos;
