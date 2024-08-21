import React from "react";
import { Col, Row } from "reactstrap";
// ** Parts
import NavBar from "../partials/header/AuthNavBar";
import Footer from "../partials/footer/Footer";
// ** Assets
import discover_our_service from "../assets/images/discover_our_service.webp";
// ** styles
import "../assets/styles/discoverOurService.css";
import { useTranslation } from "react-i18next";

// ** ==>
function DiscoverOurService() {
  return (
    <>
      <NavBar />
      <main className="position-relative">
        <div className="h-auto position-relative">
          <img
            src={discover_our_service}
            alt="discover our services"
            className="img-fluid"
          />
          <div className="position-absolute page_title_container w-100">
            <h3 className="discover_title color_main text-center title_main">
              Découvrez nos services
            </h3>
            <p className="color_main title_second discover_sub_title text-center">
              L'éducation en Tunisie ou a l'étranger avec un accès plus que
              facile
            </p>
          </div>
        </div>
        <div className="position-absolute seconde_section_positioning">
          <div className="services_box h-100 d-flex">
            <Col md={3} xs={12} className="background_main gy-2 px-4">
              <button className="btn main_btn services_btn w-100 my-3 title_second">
                Poursuivre Les études en Tunisie
              </button>
              <button className="btn main_btn services_btn w-100 mb-3 title_second">
                Poursuivre Les études en France
              </button>
              <button className="btn main_btn services_btn w-100 mb-3 title_second">
                Poursuivre Les études en Espagne
              </button>
              <button className="btn main_btn services_btn w-100 mb-3 title_second">
                Poursuivre Les études en Canda
              </button>
            </Col>
            <Col
              md={9}
              xs={12}
              className="services_introductions bg-white px-5"
            >
              <p className="color_main title_main intro_typo_1 mb-5">
                <span className="color_second title_main">Success Study</span>{" "}
                vous offre des services exceptionnels et sur mesure{" "}
              </p>
              <p className="color_main title_second intro_typo_3">
                <span className="color_second title_main">Success Study</span>{" "}
                est une agence d'accompagnement et de conseil en études
                supérieurs en Tunisie ou en France. Nous accompagnons les
                étudiants dans toutes les démarches relatives à une candidature
                au sein d'une université Tunisienne ou Française, depuis
                l'orientation initiale, jusqu'à l'inscription définitive, en
                passant par l'optimisation des candidatures.Notre méthode de
                fonctionnement est simple :
              </p>
              <ul className="color_main title_main">
                <li className="color_main intro_typo_3">
                  <strong>
                    Dans un premier temps, nous assurons un entretien avec vous,
                    pour vous écouter et avoir une idée sur votre choix
                    d'études.
                  </strong>
                </li>
                <li className="color_main intro_typo_3">
                  <strong>
                    Après une première étude approfondie de votre dossier, nous
                    constatons les possibilités relatives a votre choix d'études
                    et nous identifions les universités et programmes qui vous
                    conviennent le mieux.
                  </strong>
                </li>
                <li className="color_main intro_typo_3">
                  <strong>
                    Dans un deuxième temps, nous vous offrons un accompagnement
                    complet pour postuler au sein des établissements choisis et
                    minimiser au maximum les risques de refus en utilisant nos
                    astuces professionnelles dans la constitution d'un dossier
                    digne des meilleures universités.
                  </strong>
                </li>
              </ul>
              <p className="intro_type_2 color_main title_second mt-5 mb-5">
                <strong className="fs_24"> Bon plan :</strong> en postulant a
                travers{" "}
                <span className="color_second title_main">Success Study</span>{" "}
                vous aurez plus de garantie de satisfaction et un accompagnement
                sur mesure a travers toutes les étapes de votre dossier.
              </p>
              <p className="intro_typo_3 color_main title_second pb-0 mb-0">
                Peut importe votre choix d'étudier en Tunisie ou a l'étranger
                Success Study vous assure :{" "}
              </p>
              <ul className="intro_typo_3 color_main title_second">
                <li className="color_main intro_typo_3">
                  <strong>Une inscription dans de grandes écoles</strong>
                </li>
                <li className="color_main intro_typo_3">
                  <strong>
                    Un hébergement dans des foyers universitaires étatiques ou
                    privés à proximité des écoles Une bonne installation
                  </strong>
                </li>
                <li className="color_main intro_typo_3">
                  <strong>Un suivi personnalisé</strong>
                </li>
              </ul>
            </Col>
          </div>
        </div>
        <div className="bg-white empty_div third_section_margin"></div>
      </main>
      <Footer />
    </>
  );
}

export default DiscoverOurService;
