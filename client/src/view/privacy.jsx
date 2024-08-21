import React, { useEffect } from "react";
// ** bootstrap
import { Col, Row } from "reactstrap";
// ** Parts
import Footer from "../partials/footer/Footer";
import NavBar from "../partials/header/AuthNavBar";
// ** assets
import friends_with_smile from "../assets/images/friends_with_smile.webp";

import StudentsImage from "../assets/images/studentsCongrats.webp";

import "../view/AboutUs/styles.scss";
// ** styles partners.webp
import "../assets/styles/AboutUs.css";
import { useTranslation } from "react-i18next";
const Privacy = () =>{
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    const {t}  = useTranslation()
    return(
        <div className="background_f5f5f5">
        <NavBar />
        <main className="mainAboutUs">
        <section className="container my-5 pb-5 px-3">
          <h1 className="title_main text-center aboutUsTitle title_main color_main my-1 pb-5">
            {t('privacy.title')}
          </h1>
          {[1,2,3,4,5,6].map((section, index) => (
            <p className="text-justify color_main aboutUsSubTitle mt-3 mb-5" key={index} >
              <p className="line-text-s">{t('privacy.section_title_'+section)}</p>
              <p dangerouslySetInnerHTML={{ __html: t('privacy.section_text_'+section)}} />
            </p>
          ))}
        </section>
      </main>

        <Footer />
      </div>

    )

}

export default Privacy;