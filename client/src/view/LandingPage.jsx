import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from 'react-swipeable';
import NavBar from "../partials/header/AuthNavBar";
import image from "../assets/images/yellowBlue.webp";
import tunisie from "../assets/images/tun2.webp";
import france from "../assets/images/fr2.webp";
import espagne from "../assets/images/sp2.webp";
import canada from "../assets/images/can2.webp";
import modify from "../assets/images/modify5.webp";
import valid from "../assets/images/valid2.webp";
import subs from "../assets/images/subs.webp";
import ong from "../assets/images/pngwing 2.webp";
import uni from "../assets/images/uni.webp";
import grad from "../assets/images/grad.webp";
import right from "../assets/images/right.svg";
import left from "../assets/images/small-left.svg";
import jamila from "../assets/images/jamila.webp";
import israa from "../assets/images/israa.webp";
import eya from "../assets/images/mreai.webp";
import moaataz from "../assets/images/moaataz.webp";
import saada from "../assets/images/saada.webp";
import fourah from "../assets/images/fourah.webp";
import skye from "../assets/images/skye.webp";
import straw from "../assets/images/straw.webp";
import laila from "../assets/images/laila.webp";
import nav from "../assets/images/Nav.webp";
import plays from "../assets/images/plays.webp";
import elips from "../assets/images/elips.webp";
import Footer from "../partials/footer/Footer";
import smartphone from "../assets/images/smartphone.webp";
import vid from "../assets/Final3.webm";
import "../assets/styles/landingPage.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet";


const LanddingPage = () => {

  const { t} = useTranslation();

  const elements = [
    <div className="row px-3">
      <div className="col-12 ">
        <div className="py-3">
          <p className="service-destination-text-loc">{t('pack1')}</p>
        </div>
        <ul className="ul-list-border-green p-0 pe-4">
          <li className="service-list-drop-down ">

            {t('service_1')}
          </li>
          <li className="service-list-drop-down ">

            {t('service_2')}
          </li>
          <li className="service-list-drop-down ">

            {t('service_3')}
          </li>

        </ul>
      </div>


    </div>
    ,
    <div className="row px-3">
      <div className="col-12 " style={{ maxWidth: "180px", position: "relative" }}>
        <div className="py-3">
          <p className="service-destination-text-loc2">{t('pack2')}</p>
        </div>
        <ul className="ul-list-border-green p-0 pe-4">
          <li className="service-list-drop-down2 ">

            {t('service_4')}
          </li>
          <li className="service-list-drop-down ">

            {t('service_5')}
          </li>
          <li className="service-list-drop-down ">

            {t('service_6')}
          </li>


        </ul>
      </div>

    </div>
    ,

    <div className="row px-3">
      <div className="col-12 ">
        <div className="py-3">
          <p className="service-destination-text-loc">{t('pack3')}</p>
        </div>
        <ul className="ul-list-border-green p-0 pe-4">
          <li className="service-list-drop-down ">

            {t('service_7')}
          </li>
          <li className="service-list-drop-down ">

            {t('service_8')}
          </li>
          <li className="service-list-drop-down ">

            {t('service_9')}
          </li>


        </ul>
      </div>

    </div>

  ];
  const [index, setIndex] = useState(0);
  const cardFeedRef = useRef();
  const cardFeedReffd = useRef();
  const intervalRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 992 });



  function moveSrollNext() {
    console.log(cardFeedReffd);
    intervalRef.current = setInterval(() => {
      cardFeedReffd.current.scrollLeft = cardFeedReffd.current.scrollLeft + 5;

    }, 10);
  }
  function moveSrollPrev() {
    intervalRef.current = setInterval(() => {
      cardFeedReffd.current.scrollLeft = cardFeedReffd.current.scrollLeft - 5;

    }, 10);
  }

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setIndex((prevIndex) => (prevIndex === 0 ? elements.length - 1 : prevIndex - 1));
    } else if (direction === 'right') {
      setIndex((prevIndex) => (prevIndex === elements.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right')
  });

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === elements.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? elements.length - 1 : prevIndex - 1));
  };



  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(() => {
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home-Success Study</title>
        <meta name="description" content="Solution Digitale,prestataire de services d’accompagnement et orientation académique, vise à optimiser le parcours universitaire et professionnel et à soutenir les jeunes étudiants." />
      </Helmet>
      <NavBar />
      <div className={isMobile ? "main-section-bar-video-mob" : "main-section-bar-video"}>
        <video
          style={{ width: "100%" }}
          className="elementor-video"
          src={vid}
          autoPlay={true}
          loop={true}
          muted="muted"
          playsinline=""
          controlslist="nodownload"
        ></video>
      </div>
      <div style={{ margin: isMobile ? "5rem 0 6rem 0" : "13rem 0 16rem 0" }}>
        <div className="custom-container">
          <div className="row" style={{ position: "relative" }}>
            <div className="pos-elips-image-bg">
              <img src={elips} alt="elips" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="col-12 col-lg-6">
              <div style={{ marginLeft: "6rem", marginTop: "30px" }}>
                <img src={image} alt="" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />
              </div>
            </div>
            <div className="col-12 col-lg-6  py-5">
              <div className="landing-page-success">
                <h1 className="landing-page-success-text">{t("title_first")}</h1>
              </div>
              <div className="landing-describe-sucess my-5">
                <p className="landing-describe-sucess-text">
                  {t('first_title')}

                </p>
              </div>
              <div className="width-button-landinga-page my-3">
                <Link to="/profile" className="width-btn-landinga-page">
                  {t('showmore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: isMobile ? "15% 0 7% 0" : "10% 0 5% 0", position: "relative" }}>
        <div className="pos-right-fles-txt"></div>
        <div className="custom-container">
          <div className="mt-5">
            <h1 className="porps-about-company-des">
              {t('prince')}
            </h1>
            <p className="porps-about-company-des-title">
              {t('princ_desc')}
            </p>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6 my-3">
              <div className="flip-card my-4">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="text-about-dis-box">
                      <p style={{ fontFamily: "White Dream PERSONAL USE ONLY" }}>
                        {t('tunisia')}
                      </p>
                    </div>
                    <img
                      src={tunisie}
                      alt="image tunisie"
                      style={{ width: "100%", height: "304px", borderRadius: "8px", imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "100%", }}>
                      <Link to="/city/tunisie" className="btn-about-card-front">{t('showmore')} !</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 my-3">
              <div className="flip-card my-4">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="text-about-dis-box">
                      <p style={{ fontFamily: "White Dream PERSONAL USE ONLY" }}>
                        France
                      </p>
                    </div>
                    <img
                      src={france}
                      alt="image france"
                      style={{ width: "100%", height: "304px", borderRadius: "8px", imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                      <Link to="/city/france" className="btn-about-card-front">{t('showmore')} !</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 my-3">
              <div className="flip-card my-4">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="text-about-dis-box">
                      <p style={{ fontFamily: "White Dream PERSONAL USE ONLY" }}>
                        {t('spain')}
                      </p>
                    </div>
                    <img
                      src={espagne}
                      alt="image espagne"
                      style={{ width: "100%", height: "304px", borderRadius: "8px", imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                      <Link to="/city/espagne" className="btn-about-card-front">{t('showmore')} !</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 my-3">
              <div className="flip-card my-4">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="text-about-dis-box">
                      <p style={{ fontFamily: "White Dream PERSONAL USE ONLY" }}>
                        Canada
                      </p>
                    </div>
                    <img
                      src={canada}
                      alt="image canada"
                      style={{ width: "100%", height: "304px", borderRadius: "8px", imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                      <Link to="/city/canada" className="btn-about-card-front">{t('showmore')} !</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "19rem 0 15 0" }}>
        <div className="d-lg-block d-none"
          style={{
            width: "100%",
            height: "665px",
            position: "relative",
            margin: "8rem 0",
          }}
        >
          <div className="img-section-box-landing">
            <img src={modify} style={{ width: "100%", height: "auto" }} alt="service image container"/>
          </div>
          <div className="card-pos-about-landing">
            <div className="border-green-supp-landing" style={{ position: "relative", top: '330px' }}>
              <div className="my-5 px-3" style={{ position: "relative" }}>
                <p className="our-service-lang"> {t('service_title')}</p>
                <div className="text-post-underline"></div>
              </div>

              <div className="row">




                <div className="d-flex justify-content-center" style={{ height: "600px" }}>

                  <div style={{ position: "relative", left: "60px", width: "100%", overflow: "hidden" }}>
                    <img src={smartphone} style={{ width: "100%", height: "100%" }} alt="background" />
                    <div style={{ position: "absolute", top: "15%", left: "45%", transform: "translateX(-50%)", textAlign: "center" }}>








                      <div className="row px-3">
                        <div className="col-12 ">
                          <div className="py-3">
                            <p className="service-destination-text-loc">{t('pack1')}</p>
                          </div>
                          <ul className="ul-list-border-green p-0 pe-4">
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>
                              {t('service_1')}
                            </li>
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>
                              {t('service_2')}
                            </li>
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>
                              {t('service_3')}
                            </li>

                          </ul>
                        </div>


                      </div>






                    </div>
                  </div>

                  <div style={{ position: "relative", left: "30px", width: "100%", overflow: "hidden" }}>
                    <img src={smartphone} style={{ width: "100%", height: "100%" }} alt="smartphone contains service" />
                    <div style={{ maxWidth: "230px", position: "absolute", top: "15%", left: "43%", transform: "translateX(-50%)", textAlign: "center" }}>




                      <div className="row px-3">
                        <div className="col-12 ">
                          <div className="py-3">
                            <p className="service-destination-text-loc">{t('pack2')}</p>
                          </div>
                          <ul className="ul-list-border-green p-0 pe-4">
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>                        {t('service_4')}
                            </li>
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>                      {t('service_5')}
                            </li>
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>                      {t('service_6')}
                            </li>


                          </ul>
                        </div>


                      </div>




                    </div>
                  </div>

                  <div style={{ marginRight: "70px", position: "relative", width: "100%", overflow: "hidden" }}>
                    <img src={smartphone} style={{ width: "100%", height: "100%" }} alt="smartphone contains service"/>
                    <div style={{ position: "absolute", top: "15%", left: "45%", transform: "translateX(-50%)", textAlign: "center" }}>








                      <div className="row px-3">
                        <div className="col-12 ">
                          <div className="py-3">
                            <p className="service-destination-text-loc">{t('pack3')}</p>
                          </div>
                          <ul className="ul-list-border-green p-0 pe-4">
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>                        {t('service_7')}
                            </li>
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>                      {t('service_8')}
                            </li>
                            <li className="service-list-drop-down ">
                              <div className="me-3">
                                <img src={valid} alt="valid" width={12} height={12} />
                              </div>                      {t('service_9')}
                            </li>


                          </ul>
                        </div>


                      </div>




                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>


        <div className="d-block d-lg-none img-sec-lan">
          <div className="d-flex justify-content-center">
            <div className="card-pos-about-landing-md">
              <div className="border-green-supp-landing" style={{ marginTop: "100px" }}>
                <div className="my-3 px-3" style={{ position: "relative" }}>
                  <p className="our-service-lang"> Nos services</p>
                  <div className="text-post-underline"></div>
                </div>

                <div className="row">




                  <div className="d-flex justify-content-center">
                    <button onClick={handlePrev} style={{
                      border: 'none', padding: '0', width: '50px', height: '150px', borderRadius: "10px"
                      , backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      filter: 'blur(1px)',
                      marginTop: "150px"
                    }}>
                      <img
                        src={right}
                        alt="rgiht"
                        style={{ cursor: "pointer", transform: "rotate(180deg)" }}
                        onMouseDown={moveSrollNext}
                        onMouseUp={stopCounter}
                        onMouseLeave={stopCounter}
                      />

                    </button>
                    <div style={{ position: "relative", width: "70%", overflow: "hidden" }}>
                      <img src={smartphone} style={{ width: "100%", height: "100%" }} alt="smartphone contains service"/>
                      <div style={{ position: "absolute", top: "10%", left: "45%", transform: "translateX(-50%)", textAlign: "center" }}>

                        {elements[index]}


                      </div>

                    </div>
                    <button onClick={handleNext} style={{
                      border: 'none', padding: '0', width: '50px', height: '150px', borderRadius: "10px"
                      , backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      filter: 'blur(1px)', marginTop: "150px"
                    }}>
                      <img
                        src={left}
                        alt="rgiht"
                        style={{ cursor: "pointer", transform: "rotate(180deg)" }}
                        onMouseDown={moveSrollNext}
                        onMouseUp={stopCounter}
                        onMouseLeave={stopCounter}
                      />
                    </button>


                  </div>






                </div>


              </div>
            </div>
          </div>

        </div>
      </div>






      <div style={{ margin: isMobile ? "5rem 0" : "13rem 0" }}
        className={isMobile ? "shaodw-box-container-mob" : "shaodw-box-container"}>
        <div className="custom-container">
          <div className="row" style={{ position: "relative", top: isMobile ? "100px" : "300px" }}>
            <div className="col-12 col-lg-5">
              <div className="">
                <img src={subs} alt="" style={{ width: "100%", height: "100%", marginTop: "80px" }} />
              </div>
            </div>
            <div
              className="col-12 col-lg-7 d-flex align-items-center py-5 "
              style={{ position: "relative" }}
            >
              <div className="pos-relative-landing">
                <img src={ong} alt="" style={{ width: "100%", height: "100%" }} />
              </div>
              <div className=" pss-5">
                <div className="landing-page-success ">
                  <h1 className="landing-page-success-text">
                    {" "}
                    <span className="landing-page-success-text color_main ">
                      {t('title_why')}
                    </span>{" "}
                    Success Study ?
                  </h1>
                  <h2 className="landing-page-success-text-desc-popings">
                    {t('sub_title_why')}
                  </h2>
                </div>
                <div className="landing-describe-sucess my-2">
                  <p className="landing-describe-sucess-text-popings">
                    {t('des_title_why')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="psxs-5" style={{ margin: isMobile ? "5rem 0" : "13rem 0" }}>
        <div className="" style={{ width: "100%", position: "relative", top: "100px" }}>
          <div className="d-flex justify-content-center">
            <h1 className="text-success-to-say">
              Success Study{" "}
              <span className="text-success-to-say color_main ">
                {t('num_title')}
              </span>{" "}
            </h1>
          </div>
          <div className="d-lg-flex justify-content-between">
            <div className="card-user-yallow-lang-suc">
              <div className="d-lg-flex justify-content-center">
                <div className="box-fomation-do-success-study">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="me-3">
                      <img src={uni} alt="/" />
                    </div>
                    <p
                      className="text-card-fomration-lan"
                      style={{ margin: "0", marginTop: "10px" }}
                    >
                      125+
                    </p>
                  </div>
                  <div className="mt-3">
                    <p
                      className="text-card-fomration-lan-blue"
                      style={{ margin: "0" }}
                    >
                      {t('formation_chiff')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-user-yallow-lang-suc-yal">
              <div className="d-flex justify-content-center">
                <div className="box-fomation-do-success-study">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="me-3">
                      <img src={grad} alt="/" />
                    </div>
                    <p
                      className="text-card-fomration-lan"
                      style={{ margin: "0", marginTop: "10px" }}
                    >
                      300+
                    </p>
                  </div>
                  <div className="mt-3">
                    <p
                      className="text-card-fomration-lan-blue"
                      style={{ margin: "0" }}
                    >
                      {t('student_text')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: isMobile ? "5rem 0" : "13rem 0", position: "relative" }}>
        <div className="pos-right-fles-txt"></div>
        <div className="pos-absolute-next">
          <img
            src={left}
            alt="rgiht"
            style={{ cursor: "pointer" }}
            className="me-5"
            onMouseDown={moveSrollPrev}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
          />
          <img
            src={right}
            alt="rgiht"
            style={{ cursor: "pointer" }}
            onMouseDown={moveSrollNext}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
          />
        </div>
        <div className="custom-container">
          <div className="mt-5 width-company-feed">
            <h1 className="porps-about-company-des">
              {t('fav_title_1')}{" "}
              <span className="porps-about-company-des color_main">
                {t('fav_title_2')}
              </span>
            </h1>
          </div>

          <div className="box-feedback-user d-none d-md-flex " ref={cardFeedReffd}>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={jamila} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    J’ai bien reçu mon contrat de bail depuis la Tunisie dans une résidence universitaire privée,vraiment un très bon travail
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Jamila Lahbib </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={laila} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    c'est un travail sérieux sont toujours à l'écoute et a l'aide et surtout un grand remerciement à madame ANISSA
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Laila Bmiled</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={fourah} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Faites confiance à ce service rapide et sérieux
                    Je suis témoin du service
                    Je vous recommande fortement success STUDY
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Fourah Foura Jôýçě</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={saada} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Je recommande forte a toutes les étudiants  qui veulent poursuivre leurs études en France  c'est très efficace et elle facilite bien les démarches de campus France 100%.

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- BaHa Saada </p>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={skye} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    C 100/100 efficace merci beaucoup success study de m’avoir facilité les démarches vraiment merci beaucoup pour tout  je suis trop contente

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Ndeye Sokhna Ngom</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={moaataz} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Très bon service vraiment👏
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Maaoui Moetez</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={eya} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Je vous félicite pour votre professionnalisme.
                    Bravo et bonne continuation
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Aya Merai</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={israa} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">

                    Gentille ,attentive et surtout à l’écoute merci pour tes efforts madame anissa 😍
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Miladi Israa</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={straw} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    je recommende vivement, ils sont à l'écoute et toujours prêts à aider

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Straw Hat</p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-feedback-user d-md-none d-flex" ref={cardFeedRef}>

            <div className="col-12">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={jamila} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    J’ai bien reçu mon contrat de bail depuis la Tunisie dans une résidence universitaire privée,vraiment un très bon travail
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Jamila Lahbib </p>
                </div>
              </div>
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={fourah} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Faites confiance à ce service rapide et sérieux
                    Je suis témoin du service
                    Je vous recommande fortement success STUDY
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Fourah Foura Jôýçě</p>
                </div>
              </div>
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={saada} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Je recommande forte a toutes les étudiants  qui veulent poursuivre leurs études en France  c'est très efficace et elle facilite bien les démarches de campus France 100%.

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- BaHa Saada</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={skye} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    C 100/100 efficace merci beaucoup success study de m’avoir facilité les démarches vraiment merci beaucoup pour tout  je suis trop contente

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Ndeye Sokhna Ngom</p>
                </div>
              </div>
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={moaataz} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Très bon service vraiment👏

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Maaoui Moetez</p>
                </div>
              </div>
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={eya} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    Je vous félicite pour votre professionnalisme. Bravo et bonne continuation
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Aya Merai</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={israa} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">

                    Gentille ,attentive et surtout à l’écoute merci pour tes efforts madame anissa 😍
                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Miladi Israa</p>
                </div>
              </div>
              <div className="user-feed-card">
                <div className="card-feed-header" >
                  <img src={straw} alt="" />
                </div>
                <div className="card-feed-body">
                  <p className="feed-user-text">
                    je recommende vivement, ils sont à l'écoute et toujours prêts à aider

                  </p>
                </div>
                <div className="">
                  <p className="feed-user-name">- Straw Hat</p>
                </div>
              </div>
            </div>



          </div>
          <div className="my-5">
            <div className="card-feed-heade-cr" >
              <img src={nav} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: isMobile ? "5rem" : "13rem", position: "relative" }}>
        <div className="footer-bar-section-landing-page">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div className="mt-5" style={{ width: "85%", position: "relative", top: "100px" }}>
              <h1 className="text-footerl-line-header">
                {t('dream_1')}
                {t('dream_2')}
                <span className="text-footerl-line-header color_second">
                  Success Study:
                </span>{" "}
              </h1>
              <div className="my-5 d-flex justify-content-center">
                <p className="texta-underline-footer">
                  {t('sub_dream')}
                </p>
              </div>
              <div className="my-5 d-flex justify-content-center">
                <a href="" className="btn-footer-special-ed">
                  <div className="">
                    <img src={plays} alt="dsd" className="me-3" />
                  </div>
                  {t('howworks')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default LanddingPage;

/**                    <div className="my-4" style={{position:"relative"}}>
                        <div className="text-about-dis-box">
                            <p style={{  fontFamily: 'White Dream PERSONAL USE ONLY'}}>Espagne</p>
                        </div>
                        <img src={espagne} alt="image" style={{width:"100%",height:"304px"}} />
                    </div>
                     */
