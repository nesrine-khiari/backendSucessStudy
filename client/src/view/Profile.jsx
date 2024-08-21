import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { Col, Progress, Row } from "reactstrap";
// ** tabs
import ProfileTab from "./../partials/studentProfile/tabs/ProfileTab";
import Documents from "./../partials/studentProfile/tabs/Documents";
// ** parts
import ProfileCard from "./../components/ProfileCard";
// ** Assets
// ** styles
import "../assets/styles/Profile.css";
import Footer from "./../partials/footer/Footer";
import NavBar from "../partials/header/AuthNavBar";
import { useSelector } from "react-redux";
import GeneralInfos from "../partials/studentProfile/tabs/GeneralInfos";
import PasswordChange from "../partials/studentProfile/tabs/PasswordChange";
import ProfileImgUpdate from "../partials/studentProfile/tabs/ProfileImgUpdate";
import { useTranslation } from "react-i18next";
import i18n from "../functions/i18n";
import { useMediaQuery } from "react-responsive";
// ** ==>
function Profile() {
  const user = useSelector((state) => state.UserReducer.user);
  const [key, setKey] = useState("1");
  // ** styles
  const progressStyle = {
    backgroundColor: "rgba(217, 217, 217, 0.39)",
    height: "3px",
    borderRadius: "43px",
  };
  // ** ==>
  const { t } = useTranslation()

  const isMobile = useMediaQuery({ maxWidth: 992 });


  return (
    <>
      <NavBar />
      <div className="container_1">
        <div className="mb-5">
          <div className="d-flex align-items-center gap-3 pb-3">
            <ArrowLeft size={25} className="title_main color_second" />
            {i18n.language == "fr" ?
              <span className="title_main color_second previous_title">
                {key !== "4" ? "Précedent" : "On a Terminer merci Beaucoup !"}
              </span>
              :
              <span className="title_main color_second previous_title">
                {key !== "4" ? "Previous" : "We have finished, thank you very much!"}
              </span>
            }

          </div>
          <Progress value={key * 25} style={progressStyle} />
        </div>
        <Row>
          <Col md={4} xs={12}>
            <ProfileCard
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
              image={user?.picture}
            />
          </Col>

          <Col md={8} xs={12} className={`profile_card_container ps-4 mt-5 ${isMobile ? "d-flex flex-column align-items-center" : ""}`}>
  <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`d-flex flex-wrap justify-content-center ${isMobile ? "flex-column mt-5" : ""}`} style={{ maxWidth: "100%" }}>
    <Tab eventKey="1" title={t('user.profil')} >
      <ProfileTab />
    </Tab>
    <Tab eventKey="2" title={t('user.gen')} >
      <GeneralInfos />
    </Tab>
    <Tab eventKey="3" title={t('user.img_prof')} >
      <ProfileImgUpdate />
    </Tab>
    <Tab eventKey="4" title={t('user.docs')} >
      <Documents />
    </Tab>
    <Tab eventKey="5" title={t('user.pwd')} >
      <PasswordChange />
    </Tab>
  </Tabs>
</Col>

        </Row>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
