// ** react imports
import React, { useState } from "react";
// ** bootstrap imports
import { Tab, Tabs } from "react-bootstrap";
// ** Tabs
import StudentSubmission from "../partials/dashboard/tabs/StudentSubmission";
import Transaction from "../partials/dashboard/tabs/Transaction";
import StudentSubmissionTable from "./../partials/dashboard/tabs/StudentSubmissionTable";
import CertifStudent from "./../partials/dashboard/tabs/CertifStudent";
// ** Parts
import AuthNavBar from "../partials/header/AuthNavBar";
import Footer from "./../partials/footer/Footer";
// **  styles
import "../assets/styles/dashboard.css";

import {useSelector} from 'react-redux'
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// ** ==>
function Dashboard() {
  const [key, setKey] = useState("1");
  const [OneDemand, SetOneDemand] = useState(null);
  const [submittion, SetSubmittion] = useState(true);
  const univ = useSelector((state) => state.UniversityReducer.selected_univ);
  const {t} = useTranslation()
  // ** ==>
  const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <>
      <AuthNavBar />
      <div className="dashboard_container">
        <h1 className="main_title color_second title_main">{t('uniDash.dash')}</h1>
        <div className="content">
          
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className={isMobile ? "custom-tabs d-block mt-5" : "custom-tabs"}
          >
            <Tab eventKey="1" title={t('uniDash.soumis')}>
              {OneDemand ? (
                submittion ? (
                  <StudentSubmission
                    dem={OneDemand}
                    SetOneDemand={SetOneDemand}
                    SetSubmittion={SetSubmittion}
                    univer ={univ}
                  />
                ) : (
                  <CertifStudent
                    dem={OneDemand}
                    SetOneDemand={SetOneDemand}
                    SetSubmittion={SetSubmittion}
                    univer ={univ}
                  />
                )
              ) : (
                <StudentSubmissionTable
                  SetOneDemand={SetOneDemand}
                  SetSubmittion={SetSubmittion}
                  OneDemand={OneDemand}
                  type={key}
                />
              )}
            </Tab>
            <Tab eventKey="2"title={t('uniDash.trans')}>
              <Transaction />
            </Tab>
            <Tab eventKey="3"  title={t('uniDash.approved')}>
            <> {console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",key)}</> 
              <StudentSubmissionTable
                SetOneDemand={SetOneDemand}
                SetSubmittion={SetSubmittion}
                OneDemand={OneDemand}
                type={key}
              />
            </Tab>
            <Tab eventKey="4"  title={t('uniDash.refused')}>
              <StudentSubmissionTable
                SetOneDemand={SetOneDemand}
                SetSubmittion={SetSubmittion}
                OneDemand={OneDemand}
                type={key}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
