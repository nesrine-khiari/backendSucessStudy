import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// ** icons
import { ChevronLeft, ChevronRight } from "react-feather";
// ** initialize swiper
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
// ** bqck ground image
import ARRAY_NUMBER from '../assets/CountriesN';
import countries_background from "../assets/images/countries.webp";
import france_background from "../assets/images/france_background.webp";
import belgique_background from "../assets/images/belgique_background.webp";
import canada_background from "../assets/images/canada_background.webp";
import espagne_background from "../assets/images/espagne_background.webp";
import tunisia from "../assets/images/tunisia.webp";
// ** swiped pictures
import countries_swiper from "../assets/images/countries_swiper.webp";
import france_swiper_1 from "../assets/images/france_swiper_1.webp";
import step from "../assets/images/step.webp";
import belgique_swiper from "../assets/images/belgique_swiper.webp";
import canada_swiper from "../assets/images/canada_swiper.webp";
import espagne_swiper from "../assets/images/espagne_swiper.webp";
import tunisia_swiper from "../assets/images/tunisia_swiper.webp";
import arrowright from "../assets/images/arrow-right.webp";
// ** styles
import "../assets/styles/Countries.css";
import NavBar from "../partials/header/AuthNavBar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";
import { useMediaQuery } from "react-responsive";
// ** Init Swiper Functions
SwiperCore.use([Navigation, Pagination]);
const params = {
  slidesPerView: 3,
  spaceBetween: 100,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
};
const staticCountries = [
  {
    name: "France",
    description: "",
    backgroundImage: france_background,
    swiper: france_swiper_1,
    desc: "La France, officiellement connue sous le nom de République française, est un pays diversifié et culturellement riche situé en Europe occidentale. Elle partage ses frontières avec plusieurs pays, dont la Belgique, le Luxembourg, l'Allemagne, la Suisse, l'Italie, l'Espagne et l'Andorre. De plus, elle possède des côtes le long de la mer Méditerranée, de l'océan Atlantique et de la Manche."
  },
  {
    name: "Tunisie",
    backgroundImage: tunisia,
    swiper: tunisia_swiper,
    desc: "La Tunisie, officiellement connue sous le nom de République tunisienne, est un pays situé en Afrique du Nord, sur la côte méditerranéenne. Elle partage ses frontières avec l'Algérie à l'ouest et la Libye à l'est. La Tunisie a une riche histoire qui remonte à l'époque des anciennes civilisations, telles que les Phéniciens, les Romains et les Arabes, qui ont laissé leur empreinte sur le pays."
  }
  ,
  {
    name: "Belgique",
    description: "",
    backgroundImage: belgique_background,
    swiper: belgique_swiper,
    desc: "La Belgique est un petit pays situé en Europe occidentale, partageant ses frontières avec la France, les Pays-Bas, l'Allemagne et le Luxembourg. Malgré sa taille modeste, la Belgique est connue pour sa riche histoire, sa culture diversifiée et sa renommée mondiale dans plusieurs domaines."
  },
  {
    name: "Canada",
    description: "",
    backgroundImage: canada_background,
    swiper: canada_swiper,
    desc: "Le Canada est un vaste pays situé en Amérique du Nord, s'étendant de l'océan Atlantique à l'est à l'océan Pacifique à l'ouest. Il partage également une frontière avec les États-Unis au sud et est bordé par l'océan Arctique au nord. Avec son immense territoire, le Canada est le deuxième pays le plus vaste du monde après la Russie."
  },
  {
    name: "Espagne",
    description: "",
    backgroundImage: espagne_background,
    swiper: espagne_swiper,
    desc: "L'Espagne, officiellement connue sous le nom de Royaume d'Espagne, est un pays situé dans le sud-ouest de l'Europe, sur la péninsule ibérique. Elle partage ses frontières avec la France, le Portugal, l'Andorre et l'Espagne britannique à Gibraltar. L'Espagne comprend également les îles Baléares dans la mer Méditerranée et les îles Canaries dans l'océan Atlantique."
  },
  {
    name: "Autres Pays",
    description: "",
    backgroundImage: countries_background,
    swiper: countries_swiper,
    desc: "Dans cette section, vous pouvez découvrir une sélection variée d'autres pays. Il vous suffit de choisir un pays et de parcourir les universités qui y sont répertoriées. Explorez les possibilités offertes par chaque destination et trouvez l'établissement qui correspond le mieux à vos besoins académiques et personnels."
  }
];
const staticCountries_en = [
  {
    name: "France",
    description: "",
    backgroundImage: france_background,
    swiper: france_swiper_1,
    desc: "France, officially known as the French Republic, is a diverse and culturally rich country located in Western Europe. It shares its borders with several countries, including Belgium, Luxembourg, Germany, Switzerland, Italy, Spain, and Andorra. Additionally, it has coastlines along the Mediterranean Sea, the Atlantic Ocean, and the English Channel."
  },
  {
    name: "Tunisia",
    backgroundImage: tunisia,
    swiper: tunisia_swiper,
    desc: "Tunisia, officially known as the Republic of Tunisia, is a country located in North Africa, on the Mediterranean coast. It shares its borders with Algeria to the west and Libya to the east. Tunisia has a rich history dating back to ancient civilizations such as the Phoenicians, Romans, and Arabs, who have left their mark on the country."
  },
  {
    name: "Belgium",
    description: "",
    backgroundImage: belgique_background,
    swiper: belgique_swiper,
    desc: "Belgium is a small country located in Western Europe, sharing its borders with France, the Netherlands, Germany, and Luxembourg. Despite its modest size, Belgium is known for its rich history, diverse culture, and worldwide reputation in several fields."
  },
  {
    name: "Canada",
    description: "",
    backgroundImage: canada_background,
    swiper: canada_swiper,
    desc: "Canada is a vast country located in North America, stretching from the Atlantic Ocean in the east to the Pacific Ocean in the west. It also shares a border with the United States to the south and is bordered by the Arctic Ocean to the north. With its immense territory, Canada is the second-largest country in the world after Russia."
  },
  {
    name: "Spain",
    description: "",
    backgroundImage: espagne_background,
    swiper: espagne_swiper,
    desc: "Spain, officially known as the Kingdom of Spain, is a country located in the southwest of Europe, on the Iberian Peninsula. It shares its borders with France, Portugal, Andorra, and the British territory of Gibraltar. Spain also includes the Balearic Islands in the Mediterranean Sea and the Canary Islands in the Atlantic Ocean."
  },
  {
    name: "Other Countries",
    description: "",
    backgroundImage: countries_background,
    swiper: countries_swiper,
    desc: "In this section, you can discover a diverse selection of other countries. Simply choose a country and browse through the universities listed there. Explore the possibilities offered by each destination and find the institution that best suits your academic and personal needs."
  }
];


// ** ==>
function Countries() {
  // ** states
  const [count, setCount] = useState(0);
  const swiperRef = React.useRef(null);
  const [selected, setSelected] = useState("France");
  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
      if (count - 1 >= 0) {
        setCount((prev) => prev - 1);
      }
    }
  };
  const { t } = useTranslation();
  function changeCountry(item, i) {
    setSelected(item.name);

    const arrayCard = document.querySelectorAll(".card-countries-check-bg");
    Array.from(arrayCard).map((x, index) => {
      if (index === i) {
        setCount(i);
        x.style.transform = "scale(1.2)";
        x.style.transition = "transform 0.5s ease";
      } else {
        x.style.transform = "scale(1)";
        x.style.transition = "transform 0.5s ease";
      }
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
      if (count + 1 < staticCountries.length) {
        setCount((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {
    swiperRef.current?.classList?.add("fade-in");
    setTimeout(() => {
      swiperRef.current?.classList?.remove("fade-in");
    }, 1000);
  }, [count]);

  function handlePlus() {
    if (count < 5) {

      setCount(old => old + 1);
    }
  }

  function handleMince() {
    if (count > 0) {

      setCount(old => old - 1);
    }
  }

  useEffect(() => {
    console.log(count);
  }, [count])

  const isMobile = useMediaQuery({ maxWidth: 992 });
  // ** ==>

  const mobileScreen = (
    <>
      <NavBar def_shrink={true} />
      <div
        className={"main_section d-flex align-items-center"}
        style={{
          backgroundImage: `url(${staticCountries[count].backgroundImage})`,
          position: "relative",
          backgroundPositionX: "30%"
        }}

      >
        <div style={{
          width: "100%",
          padding: "0 5%"
        }}>
          <h1 className="countries_main_title flex-1 big_margin">
            {staticCountries[count].name}
          </h1>
          <p className="p_content mb-4">
            {staticCountries[count].desc}
          </p>
          <div>{(staticCountries[count].name === "Other Countries" || staticCountries[count].name === "Autres Pays") ? (
            <div>


              <Link
                to={"/city/" + selected.toLowerCase()}
                className="btn c_explore_btn countries_btn d-flex align-items-center justify-content-center"
                style={{ width: "40%" }}
              >
                Explorer{" "}
                <div className="ms-4">
                  <img src={arrowright} alt="text" />
                </div>
              </Link>

              <select className="btn countries_btn countries_btn d-flex align-items-center justify-content-center"
                style={{ width: "40%" }}
                onChange={(e) => { setSelected(e.target.value) }}>
                <option value="" >Choisir votre pays</option>

                {ARRAY_NUMBER.map(x => {
                  return <option key={x.country} value={x.country}>{x.country}</option>
                })}
              </select>



            </div>) : (
            <Link
              to={"/city/" + selected.toLowerCase()}
              className="btn main_btn countries_btn d-flex align-items-center justify-content-center"
              style={{ width: "40%" }}
            >
              Explorer{" "}
              <div className="ms-4">
                <img src={arrowright} alt="text" />
              </div>
            </Link>
          )}</div>


          <div
            className="card-countries-check-bg"
            style={{ transform: "scale(1)" }}
          >
            <div id={"swiperRef"}>
              <img
                src={staticCountries[count].swiper}
                alt="swiper 1"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center underlin mt-5">
            <div className="box-tick-ng me-5" onClick={handleMince}><i className="fa-solid fa-2x fa-angle-left" style={{ color: "white!important" }}></i></div>
            <div className="box-tick-ng ms-5" onClick={handlePlus}><i className="fa-solid fa-2x fa-angle-right"></i></div>
          </div>
        </div>

      </div>
    </>
  )



  const deskScreen = (
    <>
      <NavBar def_shrink={true} />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      ></Swiper>
      <main
        className={"main_section"}
        ref={swiperRef}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${staticCountries[count].backgroundImage})`,
          position: "relative",
          height: "100vh",
          width: "100%"
        }}
      >
        <div className="pos-right-stepr">
          <img
            src={step}
            alt="steper"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {i18next.language == "fr" ?
          <div className="d-flex" style={{ height: "100%" }}>
            <div
              className="pt-lg-5 pe-5 d-flex justify-content-end align-items-center"
              style={{ width: "50%" }}
            >

              <div style={{ width: "85%" }}>
                <h1 className="countries_main_title flex-1 big_margin">
                  {selected}
                </h1>
                <p className="p_content mb-4">
                  {staticCountries[count].desc}
                </p>
                <div>{(staticCountries[count].name === "Other Countries" || staticCountries[count].name === "Autres Pays") ? (
                  <div>


                    <Link
                      to={"/city/" + selected.toLowerCase()}
                      className="btn c_explore_btn countries_btn d-flex align-items-center justify-content-center"
                      style={{ width: "40%" }}
                    >
                      Explorer{" "}
                      <div className="ms-4">
                        <img src={arrowright} alt="text" />
                      </div>
                    </Link>

                    <select className="btn countries_btn countries_btn d-flex align-items-center justify-content-center"
                      style={{ width: "40%" }}
                      onChange={(e) => { setSelected(e.target.value) }}>
                      <option value="" >Choisir votre pays</option>

                      {ARRAY_NUMBER.map(x => {
                        return <option key={x.country} value={x.country}>{x.country}</option>
                      })}
                    </select>



                  </div>) : (
                  <Link
                    to={"/city/" + selected.toLowerCase()}
                    className="btn main_btn countries_btn d-flex align-items-center justify-content-center"
                    style={{ width: "40%" }}
                  >
                    Explorer{" "}
                    <div className="ms-4">
                      <img src={arrowright} alt="text" />
                    </div>
                  </Link>
                )}</div>


              </div>
            </div>
            <div className="pos-countries-box" style={{ position: "absolute" }}>
              <div className="container-box-countries">
                {
                  staticCountries.map((item, index) => {
                    return index == 0 ? (
                      <div
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeCountry(item, index)}
                      >
                        <div
                          className="card-countries-check-bg"
                          style={{ transform: "scale(1.2)" }}
                        >
                          <h1 className="country_title">{item.name}</h1>
                          <div id={"swiperRef"}>
                            <SwiperSlide>
                              <img
                                src={item.swiper}
                                alt="swiper 1"
                                style={{ width: "100%", height: "100%" }}
                              />
                            </SwiperSlide>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeCountry(item, index)}
                      >
                        <div
                          className="card-countries-check-bg"
                          style={{ transform: "scale(1)" }}
                        >
                          <h1 className="country_title">{item.name}</h1>
                          <div id={"swiperRef"}>
                            <img
                              src={item.swiper}
                              alt="swiper 1"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div
                  className="mx-3"
                  style={{ width: "250px" }}

                >

                </div>
              </div>
              <div className="d-flex justify-content-start align-items-center ">
                <div className="box-tick-ng me-5" onClick={handlePrevClick}><i className="fa-solid fa-2x fa-angle-left" style={{ color: "white!important" }}></i></div>
                <div className="box-tick-ng ms-5" onClick={handleNextClick}><i className="fa-solid fa-2x fa-angle-right"></i></div>
              </div>
            </div>

          </div>
          :
          <div className="d-flex" style={{ height: "100%" }}>
            <div
              className="pt-lg-5 pe-5 d-flex justify-content-end align-items-center"
              style={{ width: "50%" }}
            >

              <div style={{ width: "85%" }}>
                <h1 className="countries_main_title flex-1 big_margin">
                  {staticCountries_en[count].name}
                </h1>
                <p className="p_content mb-4">
                  {staticCountries_en[count].desc}
                </p>
                <div>
                  <div>{(staticCountries[count].name === "Other Countries" || staticCountries[count].name === "Autres Pays") ? (
                    <div>


                      <Link
                        to={"/city/" + selected.toLowerCase()}
                        className="btn c_explore_btn countries_btn d-flex align-items-center justify-content-center"
                        style={{ width: "40%" }}
                      >
                        Explore{" "}
                        <div className="ms-4">
                          <img src={arrowright} alt="text" />
                        </div>
                      </Link>

                      <select className="btn countries_btn countries_btn d-flex align-items-center justify-content-center"
                        style={{ width: "40%" }}
                        onChange={(e) => { setSelected(e.target.value) }}>
                        <option value="" >Choisir votre pays</option>

                        {ARRAY_NUMBER.map(x => {
                          return <option key={x.country} value={x.country}>{x.country}</option>
                        })}
                      </select>



                    </div>) : (
                    <Link
                      to={"/city/" + selected.toLowerCase()}
                      className="btn main_btn countries_btn d-flex align-items-center justify-content-center"
                      style={{ width: "40%" }}
                    >
                      Explore{" "}
                      <div className="ms-4">
                        <img src={arrowright} alt="text" />
                      </div>
                    </Link>
                  )}</div>
                </div>
                <div>

                </div>
              </div>
            </div>
            {i18next.language == "fr" ?
              <div className="pos-countries-box" style={{ position: "absolute" }}>
                <div className="container-box-countries">
                  {staticCountries.map((item, index) => {
                    return index == 0 ? (
                      <div
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeCountry(item, index)}
                      >
                        <div
                          className="card-countries-check-bg"
                          style={{ transform: "scale(1.2)" }}
                        >
                          <h1 className="country_title">{item.name}</h1>
                          <div id={"swiperRef"}>
                            <img
                              src={item.swiper}
                              alt="swiper 1"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeCountry(item, index)}
                      >
                        <div
                          className="card-countries-check-bg"
                          style={{ transform: "scale(1)" }}
                        >
                          <h1 className="country_title">{item.name}</h1>
                          <div id={"swiperRef"}>
                            <img
                              src={item.swiper}
                              alt="swiper 1"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="mx-3"
                    style={{ width: "290px" }}

                  >

                  </div>
                </div>
              </div>
              :
              <div className="pos-countries-box" style={{ position: "absolute" }}>
                <div className="container-box-countries">
                  {staticCountries_en.map((item, index) => {
                    return index == 0 ? (
                      <div
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeCountry(item, index)}
                      >
                        <div
                          className="card-countries-check-bg"
                          style={{ transform: "scale(1.2)" }}
                        >
                          <h1 className="country_title">{item.name}</h1>
                          <div id={"swiperRef"}>
                            <img
                              src={item.swiper}
                              alt="swiper 1"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => changeCountry(item, index)}
                      >
                        <div
                          className="card-countries-check-bg"
                          style={{ transform: "scale(1)" }}
                        >
                          <h1 className="country_title">{item.name}</h1>
                          <div id={"swiperRef"}>
                            <img
                              src={item.swiper}
                              alt="swiper 1"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="mx-3"
                    style={{ width: "290px" }}

                  >

                  </div>
                </div>
              </div>
            }

          </div>
        }

      </main>
    </>
  )
  return (
    isMobile ? mobileScreen : deskScreen
  );
}

export default Countries;

/** <Swiper ref={swiperRef} navigation {...params}>
              {staticCountries.map((item, index) => {
                return (
                  <SwiperSlide
                    key={`swiper-${index}`}
                    className={`${index == count && ""}`}
                  >
                    <h1 className="country_title">{item.name}</h1>
                    <img
                      src={item.swiper}
                      alt="swiper 1"
                      className="img-fluid"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper> */
