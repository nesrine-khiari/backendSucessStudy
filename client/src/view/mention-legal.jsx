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
const MentionLegal = () =>{

    const { t } = useTranslation();


useEffect(()=>{
    window.scrollTo(0, 0);
},[])
    return(
        <div className="background_f5f5f5">
        <NavBar />
        <main className="mainAboutUs">
          <section className="container my-5 pb-5 px-3">
            <h1 className="title_main text-center aboutUsTitle title_main color_main my-1 pb-5">
              {t("mentions_legales.title")}
            </h1>
  
            {/* Loop through the section keys and render the content */}
            {[1,2,3,4,5,6,7,8].map((sectionKey, index) => (
              <div key={index} className="text-justify color_main aboutUsSubTitle  mt-3 mb-5">
                <p className="line-text-s">{t(`mentions_legales.section_${sectionKey}_title`)}</p>
                <p dangerouslySetInnerHTML={{ __html: t(`mentions_legales.section_${sectionKey}_text`) }} />
              </div>
            ))}
          </section>
        </main>

        <Footer />
      </div>

    )

}

export default MentionLegal;


/**   import React, { useEffect } from "react";
// ** bootstrap
import { Col, Row } from "reactstrap";
// ** Parts
import Footer from "../partials/footer/Footer";
import NavBar from "../partials/header/AuthNavBar";

import { useTranslation } from "react-i18next";

const AboutUs = () => {
    const { t } = useTranslation();
  
    return (
      <div className="background_f5f5f5">
        {/* ... rest of the code ... 
        <main className="mainAboutUs">
          <section className="container my-5 pb-5 px-3">
            <h1 className="title_main text-center aboutUsTitle title_main color_main my-1 pb-5">
              {t("mentions_legales.title")}
            </h1>
  
            {/* Loop through the section keys and render the content 
            {sectionKeys.map((sectionKey, index) => (
              <div key={index} className="text-justify color_main aboutUsSubTitle  mt-3 mb-5 line-text-s">
                <p className="line-text-s">{t(`mentions_legales.section_${index}_title`)}</p>
                <p dangerouslySetInnerHTML={{ __html: t(`mentions_legales.section_${index}_text`) }} />
              </div>
            ))}
          </section>
        </main>
        {/* ... rest of the code ... 
      </div>
    );
  };
  
  export default AboutUs;

 */