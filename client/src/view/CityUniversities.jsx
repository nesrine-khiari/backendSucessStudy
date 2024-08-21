import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col } from "reactstrap";
// ** Parts
import AuthNavBar from "./../partials/header/AuthNavBar";
import Footer from "./../partials/footer/Footer";
// ** assets
import libraby from "../assets/images/library.webp";
import university_paris_logo from "../assets/images/university_paris_logo.webp";
import double_cercle from "../assets/images/double-cercle.webp";
import { useParams } from "react-router-dom";
// ** styles
import "../assets/styles/CityUniversities.css";

import { useSelector, useDispatch } from "react-redux";
// ** assets
import paris_universities from "../assets/images/paris_univserties.webp";

import { GetFormationByCountry, GetDemands } from "../redux/formation/formation.actions";
import "../assets/styles/CityUniversities.css";

import countries_background from "../assets/images/countries.webp";
import france_background from "../assets/images/france_background.webp";
import belgique_background from "../assets/images/belgique_background.webp";
import canada_background from "../assets/images/canada_background.webp";
import espagne_background from "../assets/images/espagne_background.webp";
import tunis_background from "../assets/images/tunis_background.webp";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { isUser } from "../custom/roles";
import { use } from "i18next";


// ** ==>
function CityUniversities() {
  const { city } = useParams();
  const dispatch = useDispatch();
  const formations = useSelector((state) => state.FormationReducer.formations);
  const user = useSelector((state) => state.UserReducer.user);
  let demands = useSelector((state) => state.FormationReducer.demands);
  const [motif, setMotif] = useState(null)
  const [isSub, setisSub] = useState(null)
  const backgrounds = {
    france: france_background,
    belgium: belgique_background,
    canada: canada_background,
    spain: espagne_background,
    tunisia: tunis_background,
    countries: countries_background,
  };
  if (!(city.toLowerCase() in backgrounds)){
    backgrounds[city]=countries_background;
  }

  const [selected,setSelected] = useState("")
  
  useEffect(() => {
    
    if (selected !== "")
    dispatch(GetFormationByCountry(selected));
 

  }, [selected]);
  useEffect(() => {
    dispatch(GetDemands());
  }, [])
  const SearchSub = (user, formaId) => {
    let result = "no"; // Default value

    demands.forEach((x) => {
      if (x.User?.email == user?.email && x.formation == formaId) {
        if (x.statut == "verfie") {
          result = "succ";
        } else if (x.statut == "attente") {
          result = "pen";
        } else if (x.statut == "refuse") {
          result = "ref";
        }
      }
    });

    return result;
  };
  useEffect(() => {
    if (city == "tunisia" || city == "tunisie")
      setSelected("tunisia");
    else
      if (city == "france" || city == "france")
        setSelected("france");
      else
        if (city == "belgique" || city == "belgium")
          setSelected("belgium");
        else
          if (city == "canada" || city == "canada")
            setSelected("canada");
          else
            if (city == "spain" || city == "espagne")
              setSelected("espagne");
              else 
              if(city == "other countries" ||city== "autres pays")
              setSelected("countries");
            else setSelected(city);
  }, [city])
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])



  const { t } = useTranslation()
  const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <>
      <AuthNavBar />
      <section className="position-relative header_container">
        <div className="shadow-image"></div>
       
        <img
          src={backgrounds[selected.toLowerCase()]}
          className=" city_img_55"
          alt="paris formations"
        />
        <div className="position-absolute top-50 start-50 translate-middle title_container" style={{ width: "85%", textAlign: "center" }}>
          <h1 className="header_title">{city.toUpperCase()}</h1>
        </div>
        <div className="breadcrumb_container position-absolute bottom-0">
          <Breadcrumb separator={<span> {">"} </span>}>
            <BreadcrumbItem>
              <Link to="/" className="text-white">
                {t('city.destination')}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/france" className="text-white" style={{ textTransform: "capitalize" }}>
                {city}
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>
      <section className="universities_list_container position-relative">
        <div className={isMobile ? "list_title_container d-flex  my-5" : "list_title_container d-flex mt-5"}>
          <div className="yellow_box w-100"></div>
          <h3 className="color_second title_main city_title" style={{ textTransform: "capitalize" }}>{city}</h3>
        </div>
        <div className="list_container d-flex flex-column justify-content-center align-items-center">
        {formations.length > 0 ?
              formations.map((item, key) => {
                let st = SearchSub(user, item._id);
                return (
                  <div key={key} className="box_container formation_card_55 my-3 px-5">
                    <div className="text-center">
    <h4 className="color_second mb-4 formation_title">
        {item.nom}
    </h4>
</div>

                    <div className="w-100 ">
                      <h5 className="title_second color_main  description_formation1 text-justify ">
                        {item.description}
                      </h5>
                    
                      <h5 className="title_second color_second description_formation" style={{ fontSize: "14px", maxWidth: "450px" }}>
                          <span>{t("uni_params.price")}: {item.price} {item.devise}</span>
                          <span style={{ margin: "0 10px" }}>|</span> 
                          <span>{t("uni_params.duration")}: {item.duree} {t("uni_params.week")}</span>
                          <span style={{ margin: "0 10px" }}>|</span>
                          <span>{item.avecBac ? t("user.with") : t("user.not_with")}</span>




                      </h5>
                      <div className="w-100 m-0 p-0">
    <div className="row">
        <div className="actions-right d-flex align-items-center justify-content-center">

            {isUser(user) && st == "no" &&
                <Link to={`/send_demand/${item.uni[0]._id}/${item._id}`} style={isMobile ? { width: "100%", textAlign: "center" } : { width: "50%", textAlign: "center" }}>
                    <button className="btn send_btn_style main_btn" style={{ fontSize: "14px!important" }}>
                        {t('university.send')}
                    </button>
                </Link>
            }

            {isUser(user) && st == "pen" &&
                <div className="alert alert-warning py-4 text-center" style={isMobile ? { fontSize: "16px", width: "100%" } : { fontSize: "16px", width: "50%" }}>
                    {t('university.pen')}
                </div>
            }

            {isUser(user) && st == "succ" &&
                <div className="alert alert-success py-4 text-center" style={isMobile ? { fontSize: "16px", width: "100%" } : { fontSize: "16px", width: "70%" }}>
                    {item.uni.fullname} {t('university.accepted')}
                </div>
            }

            {isUser(user) && st == "ref" &&
                <div className="w-100 text-center">
                    <div className="alert alert-danger py-4" style={{ fontSize: "16px", width: "100%" }}>
                        <p>{item.uni.fullname} {t('university.rejected')}   </p>
                        <p style={{ fontWeight: "700" }}>{t('university.motif')}   </p>
                        <p>{item.motif}</p>
                    </div>
                    <Link to={`/send_demand/${item.uni[0]._id}/${item._id}`} style={isMobile ? { width: "100%", textAlign: "center" } : { width: "50%", textAlign: "center" }}>
                        <button className="btn send_btn_style main_btn" style={{ fontSize: "14px!important" }}>
                            {t('university.resend')}
                        </button>
                    </Link>
                </div>
            }

        </div>
    </div>
</div>

                    </div>
                  </div>
                );
              })
            : 
            <h1 className=" city_title text-center p-5">
            {t('city.not_available_formation')}
           </h1>
            }
          
        </div >
        <div className={isMobile ? "img_container_mob" : "img_container"}>
          <img src={double_cercle} height="550" className="" />
        </div>
      </section >
      <Footer />
    </>
  );
}


export default CityUniversities;
