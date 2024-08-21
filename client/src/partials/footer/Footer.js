import React, { useState } from "react";
import { Link } from "react-router-dom";
// ** Assets
import footer_logo from "../../assets/images/footer_logo.webp";
import phoneIcon from "../../assets/images/phoneIcon.svg";
import englishIcon from "../../assets/images/uk.svg";
import fbIcon from "../../assets/images/facebook.webp";

import linkedIn from "../../assets/images/linkedin.webp";
import Insta from "../../assets/images/instagram.webp";
import whatsApp from "../../assets/images/whatsapp.webp";
import frenshIcon from "../../assets/images/franceIcon.webp";

// ** styles  franceIcon.webp
import "../../assets/styles/footer.css";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// ** ==>
function Footer() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("fr");

  const handleLanguageChange = (lng) => {
    console.log(lng);
    setLang(lng);
    i18n.changeLanguage(lng);
  };
  const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <>
      <footer className="d-none d-lg-block footer_container text-center text-white background_main">
        <div className="d-flex justify-content-center gap-3">
          <div className="col-12 col-lg-4">
            <img src={footer_logo} alt="logo" className="img-fluid" />
          </div>

          <div className="col-12 col-lg-4">
            <p className="footer_title text-left">{t("about")}</p>
            <ul>
              <li className="pb-4 ">
                <Link to="/about-us" className="white-text-footer-tr">
                  {t("who")}
                </Link>
              </li>
              <li className="pb-4 ">
                <Link
                  to="/politique-de-confidentialité"
                  className="white-text-footer-tr"
                >
                  {t("conf")}
                </Link>
              </li>
              <li className="pb-4 ">
                <Link to="/mentions-légales" className="white-text-footer-tr">
                  {t("mention")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-4">
            <p className="footer_title-contact text-left">{t("contact")}</p>
            <p className="text-footer pb-4 ">{t("hesitate")}</p>
            <p className="contact-mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-envelope-fill pe-3"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <a className="contact-mail" href="mailto:contact@successtudy.net">
                contact@successtudy.net
              </a>
            </p>
            <p className="contact-mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-envelope-fill pe-3"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <a
                className="contact-mail"
                href="mailto:najjar.anissa@successtudy.net"
              >
                najjar.anissa@successtudy.net
              </a>
            </p>
            <p className="contact-mail">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B33616975878&text&type=phone_number&app_absent=0"
                className="fa-brands fa-lg fa-whatsapp"
                style={{ color: "#ffb803", width: "30px" }}
              ></a>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B33616975878&text&type=phone_number&app_absent=0"
                className="contact-mail"
                style={{ color: "#ffb803", width: "30px" }}
              >
                (+33) 6 16 97 58 78
              </a>
            </p>
            <p className="contact-mail">
              <i
                className="fa-solid fa-location-dot pe-3"
                style={{ color: "#ffb703", width: "30px", height: "30px" }}
              ></i>
              3 Rue Kawakibi, Tunis 1002
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="btn-group dropup">
            <button
              type="button"
              className="btn dropdown-toggle multilang-btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={lang == "fr" ? frenshIcon : englishIcon}
                width="34"
                alt="contact icon"
                className="pe-3"
              />
              {lang == "fr" ? "Francais-fr" : "English-en"}
            </button>
            <ul className="dropdown-menu">
              <li onClick={() => handleLanguageChange("fr")}>
                <a className="dropdown-item">
                  <img
                    src={frenshIcon}
                    width="34"
                    alt="contact icon"
                    className="pe-3"
                  />
                  Francais-fr
                </a>
              </li>
              <li onClick={() => handleLanguageChange("en")}>
                <a className="dropdown-item">
                  <img
                    src={englishIcon}
                    width="34"
                    alt="contact icon"
                    className="pe-3"
                  />
                  English-en
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="d-flex justify-content-between py-6">
          <div className="">{t("copyrights")}</div>
          <div className="d-flex justify-content-between">
            <a
              href="https://www.facebook.com/profile.php?id=100093564009230"
              target="_blank"
            >
              <div className="icon-img me-2">
                <img src={fbIcon} alt="fb icon"></img>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/success-study/"
              target="_blank"
            >
              <div className="icon-img">
                <img src={linkedIn} alt="linkedin icon"></img>
              </div>
            </a>
            <a
              href="https://www.instagram.com/success_study_369/"
              target="_blank"
            >
              <div className="icon-img">
                <div className="icon-img">
                  <img src={Insta} alt="instagram icon"></img>
                </div>
              </div>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B21653808808&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              <div className="icon-img">
                <div className="icon-img">
                  <img src={whatsApp} alt="whatsapp icon"></img>
                </div>
              </div>
            </a>
          </div>
        </div>
      </footer>
      <footer className="d-block d-lg-none footer_container text-center text-white background_main">
        <div className="row g-0">
          <div className="col-12 col-lg-3">
            <img
              src={footer_logo}
              alt="logo"
              className="d-flex justify-content-start my-5"
              style={{ width: "156px", marginLeft: isMobile ? "0" : "1rem" }}
            />
          </div>

          <div className="col-12 col-lg-3">
            <p className="footer_title text-left">A propos</p>
            <ul className={isMobile ? "p-0" : ""}>
              <li className="pb-4 ">
                <Link to="/about-us" className="white-text-footer-tr">
                  {t("who")}
                </Link>
              </li>
              <li className="pb-4 ">
                <Link
                  to="/politique-de-confidentialité"
                  className="white-text-footer-tr"
                >
                  {t("conf")}
                </Link>
              </li>
              <li className="pb-4 ">
                <Link to="/mentions-légales" className="white-text-footer-tr">
                  {t("mention")}
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="col-12 col-lg-3"
            style={{ paddingLeft: isMobile ? "0rem" : "2rem" }}
          >
            <p className="footer_title-contact text-left">Contact</p>
            <p className="text-footer pb-4 ">{t("hesitate")}</p>
            <p className="contact-mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-envelope-fill pe-3"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <a className="contact-mail" href="mailto:contact@successtudy.net">
                contact@successtudy.net
              </a>
            </p>
            <p className="contact-mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-envelope-fill pe-3"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <a
                className="contact-mail"
                href="mailto:najjar.anissa@successtudy.net"
              >
                najjar.anissa@successtudy.net
              </a>
            </p>
            <p className="contact-mail">
              <img
                src={phoneIcon}
                width="30"
                height="30"
                alt="contact icon"
                className="pe-3"
              />
              (+216) 53 808 808
            </p>
            <p className="contact-mail">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B33616975878&text&type=phone_number&app_absent=0"
                className="fa-brands fa-lg fa-whatsapp"
                style={{ color: "#ffb803", width: "30px" }}
              ></a>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B33616975878&text&type=phone_number&app_absent=0"
                className="contact-mail"
                style={{ color: "#ffb803", width: "30px" }}
              >
                (+33) 6 16 97 58 78
              </a>
            </p>
            <p className="contact-mail">
              <i
                className="fa-solid fa-location-dot pe-3"
                style={{ color: "#ffb703", width: "30px", height: "30px" }}
              ></i>
              3 Rue Kawakibi, Tunis 1002
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div className="btn-group dropup">
            <button
              type="button"
              className="btn dropdown-toggle multilang-btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={lang == "fr" ? frenshIcon : englishIcon}
                width="34"
                alt="contact icon"
                className="pe-3"
              />
              {lang == "fr" ? "Francais-fr" : "English-en"}
            </button>
            <ul className="dropdown-menu">
              <li onClick={() => handleLanguageChange("fr")}>
                <a className="dropdown-item" href="#">
                  <img
                    src={frenshIcon}
                    width="34"
                    alt="contact icon"
                    className="pe-3"
                  />
                  Francais-fr
                </a>
              </li>
              <li onClick={() => handleLanguageChange("en")}>
                <a className="dropdown-item" href="#">
                  <img
                    src={englishIcon}
                    width="34"
                    alt="contact icon"
                    className="pe-3"
                  />
                  English-en
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="d-flex justify-content-between py-6">
          <div className="">{t("copyrights")}</div>
          <div className="d-flex justify-content-between">
            <a
              href="https://www.facebook.com/profile.php?id=100093564009230"
              target="_blank"
            >
              <div className="icon-img me-2">
                <img src={fbIcon} alt="fb icon"></img>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/success-study/"
              target="_blank"
            >
              <div className="icon-img">
                <img src={linkedIn} alt="linkedin icon"></img>
              </div>
            </a>
            <a
              href="https://www.instagram.com/success_study_369/"
              target="_blank"
            >
              <div className="icon-img">
                <div className="icon-img">
                  <img src={Insta} alt="instagram icon"></img>
                </div>
              </div>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B21653808808&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              <div className="icon-img">
                <div className="icon-img">
                  <img src={whatsApp} alt="whatsapp icon"></img>
                </div>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
