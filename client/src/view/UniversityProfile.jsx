import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { Col, Progress, Row } from "reactstrap";
// ** tabs
import Profil from "../partials/universityProfile/Profil";
import Pictures from "./../partials/universityProfile/Pictures";
import Bios from "./../partials/universityProfile/Bios";
import GeneralInfos from "./../partials/universityProfile/GeneralInfos";
import Formation from "./../partials/universityProfile/Formation";
// ** Parts
import AuthNavBar from "./../partials/header/AuthNavBar";
import Footer from "./../partials/footer/Footer";
import ProfileCard from "./../components/ProfileCard";
// ** Assets
import university_icon from "../assets/images/university_icon.webp";
import { useSelector } from "react-redux";
// ** styles
import "../assets/styles/Profile.css";
import i18n from "../functions/i18n";
import { useTranslation } from "react-i18next";
// ** ==>
function UniversityProfile() {
  const univ = useSelector((state) => state.UniversityReducer.selected_univ);
  // ** states
  console.log("____________________oo_____________",univ.id);
  const [key, setKey] = useState("1");
  // ** styles
  const progressStyle = {
    backgroundColor: "rgba(217, 217, 217, 0.39)",
    height: "3px",
    borderRadius: "43px",
  };
  const { t } = useTranslation()
  // ** ==>
  return (
    <>
      <AuthNavBar />
      <div className="container_1">
        <div className="mb-5">
          <div className="d-flex align-items-center gap-3 pb-3">
            <ArrowLeft size={25} className="title_main color_second" />
            {i18n.language == "fr" ?
              <span className="title_main color_second previous_title">
                {key !== "5" ? "Précedent" : "On a Terminer merci Beaucoup !"}
              </span>
              :
              <span className="title_main color_second previous_title">
                {key !== "5" ? "Previous" : "We have finished, thank you very much!"}
              </span>
            }
          </div>
          <Progress
            value={key === "1" ? 25 : key === "2" ? 50 : key === "3" ? 75 : 100}
            style={progressStyle}
          />
        </div>
        <Row>
          <Col md={4} xs={12} className="">
            <ProfileCard
              image={univ.logo || university_icon}
              name={univ.nom}
              email={univ.fullname}
            />
          </Col>

          <Col md={8} xs={12} className="">
            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
              <Tab eventKey="1" title={t('user.profil')}>
                <Profil univ={univ} />
              </Tab>
              <Tab eventKey="2" title={t('user.ph')}>
                <Pictures univ={univ} />
              </Tab>
              <Tab eventKey="3" title={t('uni_params.bio')}>
                <Bios univ={univ} />
              </Tab>
              <Tab eventKey="4" title={t('user.gen')}>
                <GeneralInfos univ={univ} />
              </Tab>
              <Tab eventKey="5" title={t('user.info')}>
                <Formation univId={univ.id} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default UniversityProfile;
