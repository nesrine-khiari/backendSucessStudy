import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Eye, Mail, Phone, User, Globe } from "react-feather";
import NavBar from "../../partials/header/AuthNavBar";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Navbar,
  Row,
} from "reactstrap";
// ** Assets
import logo from "../../assets/images/logo.webp";

import signup from "../../assets/images/signup2.webp";
// ** styles
import "../../assets/styles/SignUp.css";
import { useDispatch } from "react-redux";
import {
  ActionRegister,
  ActionRegisterUniv,
} from "../../redux/user/user.actions";
import { toast } from "react-hot-toast";


import styles from "./styles.module.scss";
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import ARRAY_NUMBER from "../../assets/CountriesN";

// ** ==>
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState("Etudiant"); // [student,university]
  const [selected, setSelected] = useState(ARRAY_NUMBER[218]); // [student,university]
  const [selectedNum, setSelectedNum] = useState(null); 
  const [code, setCode] = useState(null); 

  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    tel: "",
    pays: ""
  });



  const [user_univ, setUser_univ] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pays: ""
  });

  const [univ, setUniv] = useState({
    nom: "",
    tel: "",
    pays: "",
  });

  const [toggletext, settoggleText] = useState(false)

  function getCodeByCountry(countryName) {
    const country = ARRAY_NUMBER.find(entry => entry.country === countryName);
    return country ? country.code : null;
  }
  

  const handle_change = (event) => {
    const { name, value } = event.target;
    if(name==="pays")
{
  
  setUser({ ...user, [name]: value });
  console.log(getCodeByCountry(value));
setSelectedNum(getCodeByCountry(value));
setCode(getCodeByCountry(value));
}
else {
  setUser({ ...user, [name]: value });
}
  };

  const handle_change_user_univ = (event) => {
    const { name, value } = event.target;
    setUser_univ({ ...user_univ, [name]: value });
  };




  const handle_change_univ = (event) => {
    

    const { name, value } = event.target;  
if(name==="pays")
{
  
  setUniv({ ...univ, [name]: value });
  console.log(getCodeByCountry(value));
setSelectedNum(getCodeByCountry(value));
setCode(getCodeByCountry(value));
}
else {
  setUniv({ ...univ, [name]: value });
}

  };
  function areAllFieldsNotEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === '') {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    
   console.log(code);

  }, [code]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const succ = () => {
      navigate("/sign-in");
    };
    if (type === "Etudiant") {
      const user2={...user, ["tel"]:"+"+code+user.tel}      
      console.log(user2);

      console.log(areAllFieldsNotEmpty(user2));
      if (areAllFieldsNotEmpty(user2))
        dispatch(ActionRegister(user2, succ));
      else
        toast.error(`Vos devez remplir tous les informations !`);
    }

    if (type === "Université") {

const univ2={...univ, ["tel"]:"+"+code+univ.tel}      
console.log(univ2);
      let formdata = { user: user_univ, university: univ2 };
      formdata.user.pays = formdata.university.pays
      if (areAllFieldsNotEmpty(user_univ) && areAllFieldsNotEmpty(univ2))
      {
        formdata.university.pays=formdata.university.pays.toLowerCase();
        dispatch(ActionRegisterUniv(formdata)); /*callback function missing*/
      }
       
      else
        toast.error(`Vos devez remplir tous les informations !`);
    }
  };

  const { t } = useTranslation()
  const isMobile = useMediaQuery({ maxWidth: 992 });

  const mobileDesk = (
    <div className={styles.main}>
    <NavBar />

  <div className={styles.img_side}>
    <img src={signup} />
  </div>

    
<div className={styles.form_side}>

<div className="w-100 mt-lg-5 pt-5">
          <h3 className="sigup_title title_forth color_main">{t('register.title')}</h3>
        </div>
        <p className="sub_title_signup mb-4 title_3rd color_main">
          {t('register.desc')}
        </p>
        <Form className="mt-5 w-100">
          <Row>
            <Col md={6} xs={12}>
              <div className="mb-5">
                <Label className="ps-3 pb-2 form-label signup_label" id="email">
                  {t('register.profile')}
                </Label>
                <div className="dropdown w-100 signup_input border-0 border_left w-100">
                  <button
                    className="btn dropdown-toggle  d-flex align-items-center justify-content-between w-100 title_second border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="button-text nav_link_style drop_down_title title_second">
                    {type === "Etudiant" ? (t('register.student')) : (t('register.uni'))}
                                        </span>
                  </button>
                  <ul className="dropdown-menu  nav_link_ul w-100">
                    <li
                      onClick={() => {
                        setType("Etudiant");
                      }}
                    >
                      <span
                        className="dropdown-item nav_link_style_active title_second color_main discover_service_dropdown w-100"
                        to="#"
                      >
                        {t('register.student')}
                      </span>
                    </li>
                    <li
                      onClick={() => {
                        setType("Université");
                      }}
                    >
                      <span
                        className="dropdown-item nav_link_style_active title_second color_main discover_service_dropdown w-100"
                        to="#"
                      >
                        {t('register.uni')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          {type === "Etudiant" && (
            <>
              <Row>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t('register.lastName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="firstName"
                        className="signup_input border_left"
                        placeholder={t('register.lastName')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.firstName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="lastName"
                        type="text"
                        className="signup_input border_left"
                        placeholder={t('register.firstName')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="email"
                    >
                      {t('register.email')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="email"
                        className="signup_input border_left"
                        placeholder={t('register.email')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="phoneNumber"
                    >
                      {t('register.num')}
                    </Label>
                    <InputGroup className="border-0">
                      <div className="btn-group">
                        <button type="button" className="group_text border_right dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <span  >


                          {selectedNum?"+" + selectedNum:"+" + selected.code}
                          </span>
                        </button>
                        <ul className="dropdown-menu" style={{ height: "250px", overflowY: "scroll" }}>
                          {ARRAY_NUMBER.map(x => {

                            return (
                              <li onClick={e =>{setSelectedNum(null); setSelected(x); setCode(x.code)}}><span className="dropdown-item" style={{
                                border: "1px solid #f4f4f4",
                                padding: " 1.2rem",
                                fontSize: "16px"
                              }}>

                                <ReactCountryFlag
                                  countryCode={x.iso}
                                  svg
                                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                  cdnSuffix="svg"
                                  title={x.iso}
                                  style={{ marginRight: "1rem", borderRadius: "50%", height: "auto", width: "24px" }}

                                />
                                {"+" + x.code}</span></li>

                            )
                          }
                          )}
                        </ul>

                      </div>
                      <Input
                        id="phoneNumber"
                        className="signup_input border_left"
                        placeholder={t('register.num')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="password"
                    >
                      {t('register.country')}
                    </Label>
                    <InputGroup>
                      <Input type="select"
                        id="select"
                        className="signup_input border_left"
                        placeholder={t('register.country')}
                        name="pays"
                        value={user.pays}
                        onChange={handle_change}
                      >
                        <option value="" > {t('register.chose')}</option>

                        {ARRAY_NUMBER.map(x => {
                          return (
                            <option value={x.country}>{x.country}</option>
                          )
                        })}

                      </Input>

                      <InputGroupText className="signup_input border_right">
                        <Globe size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>

                </Col>
              </Row>
              <Row>
                <Col md={12} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-3 form-label signup_label"
                      id="password"
                    >
                      {t('register.pwd')}
                    </Label>
                    <InputGroup>
                      <Input
                        id="password"
                        className="signup_input border_left"
                        placeholder={t('register.pwd')}
                        type={toggletext ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handle_change}
                      />
                      <InputGroupText className="signup_input border_right">
                        <Eye size={18} className="color_grey " onClick={e => settoggleText(!toggletext)} />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </>
          )}

          {type === "Université" && (
            <>
              <Row>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t('register.firstName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="firstName"
                        className="signup_input border_left"
                        placeholder={t('register.firstName')}
                        name="firstName"
                        value={user_univ.firstName}
                        onChange={handle_change_user_univ}
                      />
                      <InputGroupText className="signup_input border_right">
                        <User size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.lastName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="lastName"
                        type="text"
                        className="signup_input border_left"
                        placeholder={t('register.lastName')}
                        name="lastName"
                        value={user_univ.lastName}
                        onChange={handle_change_user_univ}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="email"
                    >
                      {t('register.email')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="email"
                        className="signup_input border_left"
                        placeholder={t('register.email')}
                        name="email"
                        value={user_univ.email}
                        onChange={handle_change_user_univ}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.uniName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="lastName"
                        type="text"
                        className="signup_input border_left"
                        placeholder={t('register.uniName')}
                        name="nom"
                        value={univ.nom}
                        onChange={handle_change_univ}
                      />
                      <InputGroupText className="signup_input border_right">
                        <User size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.uniCountry')}
                    </Label>
                    <InputGroup>
                      <Input type="select"
                        id="select"
                        className="signup_input border_left"
                        placeholder={t('register.uniCountry')}
                        name="pays"
                        value={univ.pays}
                       
                        onChange={handle_change_univ}
                      >
                        <option value="" > {t('register.chose')}</option>

                        {ARRAY_NUMBER.map(x => {
                          return (
                            <option value={x.country}>{x.country}</option>
                          )
                        })}
                      </Input>

                      <InputGroupText className="signup_input border_right">
                        <Globe size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="phoneNumber"
                    >
                      {t('register.numUni')}
                    </Label>

                    <InputGroup className="border-0">
                      <div className="btn-group">
                        <button type="button" className="group_text_full border_right dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <span  >

                             {selectedNum?"+" + selectedNum:"+" + selected.code}
                          </span>
                        </button>
                        <ul className="dropdown-menu" style={{ height: "250px", overflowY: "scroll" }}>
                          {ARRAY_NUMBER.map(x => {

                            return (
                              <li onClick={e =>{setSelectedNum(null); setSelected(x); setCode(x.code)}}><span className="dropdown-item" style={{
                                border: "1px solid #f4f4f4",
                                padding: " 1.2rem",
                                fontSize: "16px"
                              }}>

                                <ReactCountryFlag
                                  countryCode={x.iso}
                                  svg
                                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                  cdnSuffix="svg"
                                  title={x.iso}
                                  style={{ marginRight: "1rem", borderRadius: "50%", height: "auto", width: "24px" }}

                                />
                                 {"+" + x.code}</span></li>

                            )
                          }
                          )}
                        </ul>

                      </div>
                      <Input
                        id="phoneNumber"
                        className="signup_input border_left"
                        placeholder={t('register.numUni')}
                        name="tel"
                        value={univ.tel}
                        onChange={handle_change_univ}
                      />
                      <InputGroupText className="signup_input border_right">
                        <Phone size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </>
          )}
          <button
            className="btn main_btn w-100 signup_btn title_second mb-1"
            onClick={handleSubmit}
          >
            {t('register.button')}
          </button>

          <p className="signup_typo pt-2 pb-3">
            {t('register.alreadyAccount')}{" "}
            <Link to={"/sign-in"} className="color_second">
              {t('register.sign')}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )

  const deskScreen = (
    <>
    <NavBar/>
    <div className={styles.main}>
      <div className={styles.img_side}>
        <img src={signup} />
      </div>
      <div className={styles.form_side}>
        <div style={{
          marginBottom: "2.5rem",
          cursor: "pointer"
        }}>
          <br /><br /><br /><br />
          <Link to={"/"} >
            <img src={logo} alt="logo" width={125} />
          </Link>
        </div>
        <div className="w-100 mt-lg-1 pt-0 mb-3">
          <h3 className="sigup_title title_forth color_main">{t('register.title')}</h3>
        </div>
        <p className="sub_title_signup mb-4 title_3rd color_main">
          {t('register.desc')}
        </p>
        <Form className="mt-5 w-100">
          <Row>
            <Col md={6} xs={12}>
              <div className="mb-5">
                <Label className="ps-3 pb-2 form-label signup_label" id="email">
                  {t('register.profile')}
                </Label>
                <div className="dropdown w-100 signup_input border-0 border_left w-100">
                  <button
                    className="btn dropdown-toggle  d-flex align-items-center justify-content-between w-100 title_second border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="button-text nav_link_style drop_down_title title_second">
                    {type === "Etudiant" ? (t('register.student')) : (t('register.uni'))}
                    </span>
                  </button>
                  <ul className="dropdown-menu  nav_link_ul w-100">
                    <li
                      onClick={() => {
                        setType("Etudiant");
                      }}
                    >
                      <span
                        className="dropdown-item nav_link_style_active title_second color_main discover_service_dropdown w-100"
                        to="#"
                      >
                        {t('register.student')}
                      </span>
                    </li>
                    <li
                      onClick={() => {
                        setType("Université");
                      }}
                    >
                      <span
                        className="dropdown-item nav_link_style_active title_second color_main discover_service_dropdown w-100"
                        to="#"
                      >
                        {t('register.uni')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          {type === "Etudiant" && (
            <>
              <Row>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t('register.lastName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="firstName"
                        className="signup_input border_left"
                        placeholder={t('register.lastName')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.firstName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="lastName"
                        type="text"
                        className="signup_input border_left"
                        placeholder={t('register.firstName')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="email"
                    >
                      {t('register.email')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="email"
                        className="signup_input border_left"
                        placeholder={t('register.email')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="phoneNumber"
                    >
                      {t('register.num')}
                    </Label>
                    <InputGroup className="border-0">
                      <div className="btn-group">
                        <button type="button" className="group_text border_right dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <span  >


                          {selectedNum?"+" + selectedNum:"+" + selected.code}
                          </span>
                        </button>
                        <ul className="dropdown-menu" style={{ height: "250px", overflowY: "scroll" }}>
                          {ARRAY_NUMBER.map(x => {

                            return (
                              <li onClick={e => {setSelectedNum(null); setSelected(x); setCode(x.code)}}><span className="dropdown-item" style={{
                                border: "1px solid #f4f4f4",
                                padding: " 1.2rem",
                                fontSize: "16px"
                              }}>

                                <ReactCountryFlag
                                  countryCode={x.iso}
                                  svg
                                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                  cdnSuffix="svg"
                                  title={x.iso}
                                  style={{ marginRight: "1rem", borderRadius: "50%", height: "auto", width: "24px" }}

                                />
                              {"+" + x.code}</span></li>

                            )
                          }
                          )}
                        </ul>

                      </div>
                      <Input
                        id="phoneNumber"
                        className="signup_input border_left"
                        placeholder={t('register.num')}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="password"
                    >
                      {t('register.country')}
                    </Label>
                    <InputGroup>
                      <Input type="select"
                        id="select"
                        className="signup_input border_left"
                        placeholder={t('register.country')}
                        name="pays"
                        value={user.pays}
                        onChange={handle_change}
                      >
                        <option value="" > {t('register.chose')}</option>

                        {ARRAY_NUMBER.map(x => {
                          return (
                            <option value={x.country}>{x.country}</option>
                          )
                        })}

                      </Input>

                      <InputGroupText className="signup_input border_right">
                        <Globe size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>

                </Col>
              </Row>
              <Row>
                <Col md={12} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-3 form-label signup_label"
                      id="password"
                    >
                      {t('register.pwd')}
                    </Label>
                    <InputGroup>
                      <Input
                        id="password"
                        className="signup_input border_left"
                        placeholder={t('register.pwd')}
                        type={toggletext ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handle_change}
                      />
                      <InputGroupText className="signup_input border_right">
                        <Eye size={18} className="color_grey " onClick={e => settoggleText(!toggletext)} />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </>
          )}

          {type === "Université" && (
            <>
              <Row>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t('register.firstName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="firstName"
                        className="signup_input border_left"
                        placeholder={t('register.firstName')}
                        name="firstName"
                        value={user_univ.firstName}
                        onChange={handle_change_user_univ}
                      />
                      <InputGroupText className="signup_input border_right">
                        <User size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.lastName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="lastName"
                        type="text"
                        className="signup_input border_left"
                        placeholder={t('register.lastName')}
                        name="lastName"
                        value={user_univ.lastName}
                        onChange={handle_change_user_univ}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="email"
                    >
                      {t('register.email')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="email"
                        className="signup_input border_left"
                        placeholder={t('register.email')}
                        name="email"
                        value={user_univ.email}
                        onChange={handle_change_user_univ}
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
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.uniName')}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        id="lastName"
                        type="text"
                        className="signup_input border_left"
                        placeholder={t('register.uniName')}
                        name="nom"
                        value={univ.nom}
                        onChange={handle_change_univ}
                      />
                      <InputGroupText className="signup_input border_right">
                        <User size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="lastName"
                    >
                      {t('register.uniCountry')}
                    </Label>
                    <InputGroup>
                      <Input type="select"
                        id="select"
                        className="signup_input border_left"
                        placeholder={t('register.uniCountry')}
                        name="pays"
                      
                        value={univ.pays}
                        onChange={handle_change_univ}
                      >
                        <option value="" > {t('register.chose')}</option>

                        {ARRAY_NUMBER.map(x => {
                          return (
                            <option value={x.country}>{x.country}</option>
                          )
                        })}
                      </Input>

                      <InputGroupText className="signup_input border_right">
                        <Globe size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="phoneNumber"
                    >
                      {t('register.numUni')}
                    </Label>

                    <InputGroup className="border-0">
                      <div className="btn-group">
                        <button type="button" className="group_text_full border_right dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <span  >

                      
                            {selectedNum?"+" + selectedNum:"+" + selected.code}
                          </span>
                        </button>
                        <ul className="dropdown-menu" style={{ height: "250px", overflowY: "scroll" }}>
                          {ARRAY_NUMBER.map(x => {

                            return (
                              <li onClick={e =>{setSelectedNum(null); setSelected(x); setCode(x.code)}}><span className="dropdown-item" style={{
                                border: "1px solid #f4f4f4",
                                padding: " 1.2rem",
                                fontSize: "16px"
                              }}>

                                <ReactCountryFlag
                                  countryCode={x.iso}
                                  svg
                                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                  cdnSuffix="svg"
                                  title={x.iso}
                                  style={{ marginRight: "1rem", borderRadius: "50%", height: "auto", width: "24px" }}

                                />
                                {"+" + x.code}</span></li>

                            )
                          }
                          )}
                        </ul>

                      </div>
                      <Input
                        id="phoneNumber"
                        className="signup_input border_left"
                        placeholder={t('register.numUni')}
                        name="tel"
                        value={univ.tel}
                        onChange={handle_change_univ}
                      />
                      <InputGroupText className="signup_input border_right">
                        <Phone size={18} className="color_grey " />
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </>
          )}
          <button
            className="btn main_btn w-100 signup_btn title_second mb-1"
            onClick={handleSubmit}
          >
            {t('register.button')}
          </button>

          <p className="signup_typo pt-2 pb-3">
            {t('register.alreadyAccount')}{" "}
            <Link to={"/sign-in"} className="color_second">
              {t('register.sign')}
            </Link>
          </p>
        </Form>
      </div>
    </div>
    </>
  )

  return (
    isMobile ? mobileDesk : deskScreen
  );

}

export default SignUp;