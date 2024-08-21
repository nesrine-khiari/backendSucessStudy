import React, { useEffect } from "react";
// ** bootstrap
// ** Parts
import Footer from "../../partials/footer/Footer";
import NavBar from "../../partials/header/AuthNavBar";
// ** assets
import friends_with_smile from "../../assets/images/friends_with_smile2.webp";
import { Helmet } from "react-helmet"
import StudentsImage from "../../assets/images/aboutus5.webp";
import certif from "../../assets/images/certificat.webp";
import clock from "../../assets/images/clock.webp";
import partners from "../../assets/images/partners.webp";
import "./styles.scss";
// ** styles partners.webp
import "../../assets/styles/AboutUs.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// ** ==>
function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  const { t } = useTranslation()
  return (

    <div className="background_f5f5f5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us-Success Study</title>
        <meta name="description" content="À propos de nous & nos valeurs" />
      </Helmet>
      <NavBar />
      <main className="mainAboutUs">
        <section className="container mt-5 px-3" >
          <h1 className="title_main text-center aboutUsTitle title_main color_main my-1">
            {t('title')}
          </h1>
          <p className="text-justify color_main aboutUsSubTitle  mt-5 mb-5">
            {t('description_about_1')}
          </p>
          <p className="text-justify color_main aboutUsSubTitle  mt-3 mb-5">
            {t('description_about_2')}
          </p>
          <p className="text-justify color_main aboutUsSubTitle  mt-3 mb-5">
            {t('description_about_3')}


          </p>
          <p className="text-justify color_main aboutUsSubTitle  mt-3 mb-5">
            {t('description_about_4')}


          </p>
          <p className="text-justify color_main aboutUsSubTitle  mt-3 mb-5">
            {t('description_about_5')}
          </p>
          <div className="mx-1">
            <img
              src={friends_with_smile}
              alt="friends with smile at university"
              className="img-fluid h-auto"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </section>

        <div className="histoire_section">
          <div className="container">
            <div className="d-lg-block d-xl-flex justify-content-between">
              <div className="text_container_55 text_container_55_p1">
                <h3 className="color_second title_main title_3">
                  {t('sub_title')}
                </h3>
                <p className="color_main title_second about_us_text">
                  {t('sub_desc')}
                  <span className="color_second title_main"> Success Study </span> {t('sub_desc_1')}
                </p>
              </div>
              <div className="img_container_55">
                <img src={StudentsImage} alt="etudiants" />
              </div>
              <div className="text_container_55 text_container_55_p2">
                <div className="h-100 d-flex flex-column justify-content-end">
                  <h3 className="color_second title_main title_3">
                    {t('sub_title_sec')}
                  </h3>
                  <p className="color_main title_second about_us_text">
                    {t('sub_desc_sec')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="our_services_55" style={{ margin: "5% 0 10% 0" }}>
        <div className="service_55">
          <div className="title_5">
            <img src={certif} width={48} className="me-2" alt="icon formations" /> 125+
          </div>
          <h4 className="color_main describe_offer text-center">
            {t('heading_one')}
          </h4>
        </div>
        <div className="service_55  left_border">
          <div className="title_5">
            <img src={clock} className="me-4" width={38} alt="icone horloge" />
            8+
          </div>
          <h4 className="color_main describe_offer text-center">
            {t('heading_two')}
          </h4>
        </div>

        <div className="service_55  left_border ">
          <div className="title_5">
            <img src={partners} className="me-4 pb-4" width={38} alt="icone université" />
            <span className="title_5">25+</span>
          </div>
          <h4 className="color_main describe_offer text-center">
            {t('heading_three')}
          </h4>
        </div>
      </div>
      <section className="position-relative end_of_about_us">
        <div className="w-100 " style={{ zIndex: "2" }}>
          <p className="text-center   mb-5">
            {t('text_about')}
          </p>
          <div className="w-100 d-flex justify-content-center">
            <Link to="/contact-us" className="btn main_btn fw-bold">{t("contact-button")}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AboutUs;
