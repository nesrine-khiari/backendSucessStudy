import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ** icons
import { Check, DownloadCloud, File, Trash } from "react-feather";
// ** bootsteap
import { ChevronDown, Eye, Mail, Phone, User, MapPin, X } from "react-feather";
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
import { UpdatePassword } from "../../../redux/user/user.actions";
import { useTranslation } from "react-i18next";

function PasswordChange() {
  const init_user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { old_password, new_password };
    console.log(data);
    dispatch(UpdatePassword(data, init_user.id));
  };
  const { t } = useTranslation();
  return (
    <Form className="mt-5">
      <Row>
        <Col md={6} xs={12}>
          <div className="mb-5">
            <Label
              className="ps-3 pb-2 form-label signup_label"
              id="oldPassword"
            >
              {t("register.pwdOld")}
            </Label>
            <InputGroup className="border-0">
              <Input
                id="oldPassword"
                className="signup_input border_left"
                placeholder="old password"
                name="oldPassword"
                value={old_password}
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
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
              {t("register.pwdNew")}
            </Label>
            <InputGroup className="border-0">
              <Input
                id="newPassword"
                className="signup_input border_left"
                placeholder="Enter new password"
                name="newPassword"
                type="password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputGroupText className="signup_input border_right">
                <User size={18} className="color_grey " />
              </InputGroupText>
            </InputGroup>
          </div>
        </Col>
      </Row>
      <button
        className="btn main_btn w-100 signup_btn title_second mb-1"
        onClick={handleSubmit}
      >
        {t("user.pwd")}
      </button>
    </Form>
  );
}

export default PasswordChange;
