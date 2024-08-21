import React, { useState } from "react";
import { Eye, Mail, X } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, InputGroup, InputGroupText, Label } from "reactstrap";
// ** Assets
import NavBar from "../../partials/header/AuthNavBar";
import signup from "../../assets/images/signup2.webp";
// ** styles
import "../../assets/styles/SignUp.css";
import styles from "./styles.module.scss";
import logo from "../../assets/images/logo.webp";

// ** ==>
import { useDispatch, useSelector } from "react-redux";
import { ActionLogin } from "../../redux/user/user.actions";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggletext,settoggleText] = useState(false)

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handle_change = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(ActionLogin(user, () => {}));
  };
  const {t} = useTranslation()

  const isMobile = useMediaQuery({ maxWidth: 992 });

  const desktopScreen = (
    <>
      <NavBar />
    <div className={styles.main}>
    <div className={styles.img_side}>
      <img src={signup} />
    </div>
      
    <div className={styles.form_side}>
    <div style={{

              cursor: "pointer"
      }}>
          <Link to={"/"} >
            <img src={logo} alt="logo" width={125} />
          </Link>
      </div>
      <div className="w-100 mt-lg-5 pt-5">
        <h3 className="sigup_title color_main title_forth">Connexion</h3>
      </div>
      <Form className="mt-5 pt-5">
        <div className="mb-5">
          <Label className="ps-3 pb-2 form-label signup_label" id="email">
            {t('login.email')}
          </Label>
          <InputGroup className="border-0">
            <Input
              id="email"
              className="signup_input border_left"
              placeholder={t('login.email')}
              name="email"
              value={user.email}
              onChange={handle_change}
            />
            <InputGroupText className="signup_input border_right">
              <Mail size={18} className="color_grey " />
            </InputGroupText>
          </InputGroup>
        </div>
        <div className="mb-5">
          <Label className="ps-3 pb-2 form-label signup_label" id="password">
          {t('login.pwd')}
          </Label>
          <InputGroup className="border-0">
            <Input
              id="password"
              className="signup_input border_left"
              placeholder={t('login.pwd')}
              type={toggletext ? "text": "password"}
              name="password"
              value={user.password}
              onChange={handle_change}
            /> 
            <InputGroupText className="signup_input border_right">
              <Eye size={18} className="color_grey "             onClick={e => settoggleText(!toggletext)} 
/>
            </InputGroupText>
          </InputGroup>
        </div>
        <p className="signup_typo pb-5 pt-1" style={{textAlign:"left",fontSize:"14px"}}>
          {t('login.oublied')}{" "}
            <Link className="color_second" to={"/verify-email"}>
            {t('login.here')}
            </Link>
          </p>
        <button
          className="btn main_btn w-100 signup_btn mb-2"
          onClick={handleSubmit}
        >
         {t('login.button')}
        </button>

        <p className="signup_typo pb-5 pt-4">
        {t('login.register')}{" "}
          <Link className="color_second" to={"/sign-up"}>
          {t('login.sign')}
          </Link>
        </p>
      </Form>
    </div>
  </div>
  </>
  )
  const mobileScreen = (
    <div className={styles.main}>
      <NavBar />
 
    <div className={styles.img_side}>
      <img src={signup} />
    </div>

      
<div className={styles.form_side}>

  <div className="w-100 mt-lg-5 pt-5">
    <h3 className="sigup_title color_main title_forth">Connexion</h3>
  </div>
  <Form className="mt-5 pt-5">
    <div className="mb-5">
      <Label className="ps-3 pb-2 form-label signup_label" id="email">
        {t('login.email')}
      </Label>
      <InputGroup className="border-0">
        <Input
          id="email"
          className="signup_input border_left"
          placeholder={t('login.email')}
          name="email"
          value={user.email}
          onChange={handle_change}
        />
        <InputGroupText className="signup_input border_right">
          <Mail size={18} className="color_grey " />
        </InputGroupText>
      </InputGroup>
    </div>
    <div className="mb-5">
      <Label className="ps-3 pb-2 form-label signup_label" id="password">
      {t('login.pwd')}
      </Label>
      <InputGroup className="border-0">
        <Input
          id="password"
          className="signup_input border_left"
          placeholder={t('login.pwd')}
          type={toggletext ? "text": "password"}
          name="password"
          value={user.password}
          onChange={handle_change}
        />
        <InputGroupText className="signup_input border_right">
          <Eye size={18} className="color_grey "  onClick={e => settoggleText(!toggletext)} />
        </InputGroupText>
      </InputGroup>
    </div>
    <p className="signup_typo pb-5 pt-1" style={{textAlign:"left",fontSize:"14px"}}>
          {t('login.oublied')}{" "}
            <Link className="color_second" to={"/verify-email"}>
            {t('login.here')}
            </Link>
          </p>
    <button
      className="btn main_btn w-100 signup_btn mb-2"
      onClick={handleSubmit}
    >
     {t('login.button')}
    </button>

    <p className="signup_typo pb-5 pt-4">
    {t('login.register')}{" "}
      <Link className="color_second" to={"/sign-up"}>
      {t('login.sign')}
      </Link>
    </p>
  </Form>
</div>
</div>

  )
  return (
    isMobile ? 
    mobileScreen : desktopScreen
  );
}

export default SignIn;
