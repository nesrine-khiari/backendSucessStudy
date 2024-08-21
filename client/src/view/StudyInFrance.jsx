import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ThumbsUp, Check } from "react-feather";
// ** Assets
import study_in_france from "../assets/images/study_in_france.webp";
import visa_on_desk from "../assets/images/tun_sec3.webp";
import blue_cirlce from "../assets/images/blue_circle.webp";
import yellow_circle from "../assets/images/yellow_circle.webp";
import tour_effel from "../assets/images/paris-sec3.webp";
// ** styles
import "../assets/styles/discoverOurService.css";
import AuthNavBar from "./../partials/header/AuthNavBar";
import Footer from "../partials/footer/Footer";
import valid from "../assets/images/valid.webp";
import { useTranslation } from "react-i18next";

// ** static data
const masters = [
  { name: "Mastère en droit des affaires", link: "#" },
  { name: "Mastère Gestion & Management", link: "#" },
  ,
  { name: "Mastère en Comptabilité et Système d'information", link: "#" },
  { name: "Mastère en Finance Islamique", link: "#" },
  { name: "Mastère en Gestion de la Relation avec le Client", link: "#" },
  { name: "Mastère en Gestion des Organisations", link: "#" },
  {
    name: "Mastère en Management des Organisations et Entrepreneuriat",
    link: "#",
  },
  {
    name: "Mastère en Ingénierie Financière",
    link: "#",
  },
  {
    name: "Mastère en Gestion des Ressources Humaines",
    link: "#",
  },
  {
    name: "Mastère en Marketing et commerce international",
    link: "#",
  },
  {
    name: "Mastère en Marketing Digital",
    link: "#",
  },
  {
    name: "Mastère en Affaires Commerciales",
    link: "#",
  },
  {
    name: "Mastère en Hautes Etudes Commerciales",
    link: "#",
  },
  {
    name: "Mastère en Management Intégré : Qualité Sécurité Environnement",
    link: "#",
  },
  {
    name: "Mastère Européen en Management du sport Mastère finance de marché",
    link: "#",
  },
  {
    name: "Mastère : Economie de l'énergie, gestion de l'énergie et développement durable",
    link: "#",
  },
  {
    name: "Mastère en Sécurité des Systèmes Informatiques Communicants et Embarqués",
    link: "#",
  },
  {
    name: "Mastère en Big Data et Machine Learning",
    link: "#",
  },
  {
    name: "Mastère en CLOUD COMPUTING",
    link: "#",
  },
  {
    name: "Mastère droit privé des affaires",
    link: "#",
  },
  {
    name: "Mastère sciences politiques Ingénierie des Risques Economiques et Financiers",
    link: "#",
  },
  {
    name: "Mastère Assurance, banque et Finance",
    link: "#",
  },
  {
    name: "Mastère Marchés financiers et gestion des risques",
    link: "#",
  },
];

const diplomeIngenieur = [
  { name: "Ingénieur en génie civile", link: "#" },
  { name: "Ingénieur en automatisme et informatique industrielle", link: "#" },
  { name: "Ingénieur en énergétique", link: "#" },
  { name: "Ingénieur en électromécanique", link: "#" },
  { name: "Ingénieur en génie pétrolière", link: "#" },
  { name: "Ingénieur en génie industrielle", link: "#" },
];
const diplomeNationaux = [
  {
    name: "Diplôme national d'architecture",
    link: "#",
  },
  {
    name: "Diplôme national de mastère en génie de l'environnement, de la sécurité et de la qualité",
    link: "#",
  },
];
// ** ==>
function StudyInFrance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const { t } = useTranslation()
  return (
    <>
      <AuthNavBar />
      <main className="page-our-ser" style={{ position: "relative" }}>
        <div className="h-auto">
          <img
            src={study_in_france}
            alt="discover our services"
            className="img-fluidDesc"
          />
          <div className="position-absolute page_title_container studyInFranceContainer" style={{ margin: "0!important" }}>
            <h3 className="discover_title color_main text-center title_main mb-5 w-100">
              Success Study Services
            </h3>
            <h6 className="discover_sub_title color_main title_second text-center mb-5 w-100">
              {t('service.title')}
            </h6>

          </div>

        </div>

        <div className="container_2 position-relative margin-barcha">
          <Row className="">
            <Col md={7} xs={12}>
              <h2 className="title_main color_second title_1 mb-5">
                {t('service.heading_one')}
              </h2>
              <ul className="ul-list-border-green p-0 ps-4">
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_1')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_2')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_3')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_4')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_5')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_6')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_7')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_8')}
                </li>
              </ul>
            </Col>

            <Col md={1} xs={12} className="justify-content-top"></Col>
            <Col md={4} xs={12} className="justify-content-top">
              <div className="img-sec-desk">
                <img src={visa_on_desk} alt="via on desk" />
              </div>
            </Col>
          </Row>
        </div>
        <div className="container_2 mt-4">
          <Row>
            <Col md={7} xs={12} className="">
              <h2 className="title_main color_second title_1 mb-5">
                {t('service.int_service')}
              </h2>


              <ul className="ul-list-border-green p-0 ps-4">
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_1')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_2')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_3')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_4')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_5')}
                </li>
                <li className="service-list-drop-downs ">
                  <div className="me-3">
                    <Check size={25} />
                  </div>
                  {t('service.service_6')}
                </li>
              
              </ul>
            </Col>
            <Col md={1} xs={12} className="justify-content-top"></Col>
            <Col md={4} xs={12} className="justify-content-top">
              <div className="img-sec-desk">
                <img src={tour_effel} alt="via on desk" />
              </div>
            </Col>
          </Row>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default StudyInFrance;
