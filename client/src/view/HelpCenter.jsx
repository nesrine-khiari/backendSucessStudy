import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
// ** Parts
import NavBar from "./../partials/header/AuthNavBar";
import Footer from "./../partials/footer/Footer";
// ** assets
import help_center from "../assets/images/help_center6.webp";
// ** css
import "../assets/styles/helpCenter.css";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// ** ==>
function HelpCenter() {
  const { t } = useTranslation();

  useEffect(()=>{
    window.scrollTo(0, 0);
},[])

const isMobile = useMediaQuery({ maxWidth: 992 });

const isDesMobile = (
  <>
      <NavBar />



      <main>
        <div
          className="help_center_container "
          style={{ backgroundImage: `url(${help_center})`   }}
        >
          <div className="help_center_content"  >
            <h3 className="help_center_title title_main color_main mb-4">
              Success Study
            </h3>
            <h6 className="help_center_sub_title color_main title_second">
              {t('faq.title')}
            </h6>
          </div>
        </div>
        <div className="faq_section">
        <h3 className="faq_title title_main color_second">
          {t("faq.section_title_1")}
        </h3>
        <Row className="">
          <Col lg={6} md={12}   className="my-3">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_22")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                {t('faq.section_text_1', { returnObjects: true }).map((item) => (
                  <li key={item.key} className="dropdown-item help_center_active_drop_down color_main title_second text-wrap f-12" dangerouslySetInnerHTML={{
                    __html: t(item.text),
                  }}>
                   
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12}   className="my-3">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_2")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                {t('faq.section_text_2', { returnObjects: true }).map((item) => (
                  <li key={item.key} className="dropdown-item help_center_active_drop_down color_main title_second text-wrap f-12" dangerouslySetInnerHTML={{
                    __html: t(item.text),
                  }}>
                   
                  </li>
                ))}
              </ul>

            </div>
          </Col>
        </Row>
        <Row className="">
          <Col lg={6} md={12}  className="my-3">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_3")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                <li
                  className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: t("faq.section_desc_3"),
                  }}
                />
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12}  className="my-3">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_4")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                <li
                  className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: t("faq.section_desc_4"),
                  }}
                />
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12}  className="my-3">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_5")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                <li
                  className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: t("faq.section_desc_5"),
                  }}
                />
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      </main>
      <Footer />
    </>
)
const isResMobile = (
  <>
      <NavBar />
      <main>
        <div
          className="help_center_container "
          style={{ backgroundImage: `url(${help_center})` }}
        >
          <div className="help_center_content">
            <h3 className="help_center_title title_main color_main mb-4">
              Success Study
            </h3>
            <h6 className="help_center_sub_title color_main title_second">
              {t('faq.title')}
            </h6>
          </div>
        </div>
        <div className="faq_section">
        <h3 className="faq_title title_main color_second">
          {t("faq.section_title_1")}
        </h3>
        <Row className="mb-5 pb-5">
          <Col lg={6} md={12} className="mb-5">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_22")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                {t('faq.section_text_1', { returnObjects: true }).map((item) => (
                  <li key={item.key} className="dropdown-item help_center_active_drop_down color_main title_second text-wrap f-12" dangerouslySetInnerHTML={{
                    __html: t(item.text),
                  }}>
                   
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12} className="mb-5">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_2")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                {t('faq.section_text_2', { returnObjects: true }).map((item) => (
                  <li key={item.key} className="dropdown-item help_center_active_drop_down color_main title_second text-wrap f-12" dangerouslySetInnerHTML={{
                    __html: t(item.text),
                  }}>
                   
                  </li>
                ))}
              </ul>

            </div>
          </Col>
        </Row>
        <Row className="mb-5 pb-5">
          <Col lg={6} md={12} className="mb-5">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_3")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                <li
                  className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: t("faq.section_desc_3"),
                  }}
                />
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12} className="mb-5">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_4")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                <li
                  className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: t("faq.section_desc_4"),
                  }}
                />
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} className="mb-5">
            <div className="dropdown w-100">
              <button
                className="btn dropdown-toggle btn-elipss-css drop_down_title d-flex align-items-center justify-content-between w-100 title_second drop_down_title_border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("faq.section_title_5")}
              </button>
              <ul className="dropdown-menu w-100 scrollin" aria-labelledby="dropdownMenuLink">
                <li
                  className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
                  dangerouslySetInnerHTML={{
                    __html: t("faq.section_desc_5"),
                  }}
                />
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      </main>
      <Footer />
    </>
)

  return (
    isMobile ? isDesMobile : isResMobile
  );
}

export default HelpCenter;
