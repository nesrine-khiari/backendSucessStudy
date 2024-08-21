import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  GetOneUniv,
  GetFormasByIdUniv,
  GetDemandsByIdUniv,
} from "../redux/university/university.actions";
import { isUser } from "../custom/roles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// ** ==>
function ViewUniversity() {

  const user = useSelector((state) => state.UserReducer.user);
  const univ = useSelector((state) => state.UniversityReducer.selected_univ);
  const formas = useSelector((state) => state.UniversityReducer.formations);
  
  const dispatch = useDispatch();

  const { _id, city } = useParams();
  const [isSub,setisSub] = useState(null)
  const [motif,setMotif] = useState(null)
  const [selected,setSelected]=useState(null)
  useEffect(() => {
    dispatch(GetOneUniv(_id));
    dispatch(GetFormasByIdUniv(_id));
    dispatch(GetDemandsByIdUniv(_id));  
  }, [_id]);


  const demands = useSelector((state) => state.UniversityReducer.demands);
  useEffect(()=>{
    window.scrollTo(0, 0);
},[])
const isMobile = useMediaQuery({ maxWidth: 992 });

  useEffect(()=>{
    let res = demands.find(x=> x.User?.email === user?.email)
    if(!res)
      setisSub("no")
    else if(res && res?.statut =="verfie" )
      setisSub("succ")
    else if( res && res?.statut =="attente")
      setisSub("pen")
    else if( res && res?.statut =="refuse"){
      setisSub("ref")
      setMotif(res.motif)
    }
    
  },[demands])

const {t} = useTranslation()

  return (
    <>
      <AuthNavBar />
      <section className="position-relative header_container image1234">
        <div className="shadow-image"></div>
        <img
          src={univ.cover}
          className="img-thumbnail w-100"
          alt="university library"
          style={{ height: "65vh", objectFit: "contain" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle title_container">
          <h1 className="header_title">{univ.nom}</h1>
        </div>
        <div className="breadcrumb_container position-absolute bottom-0">
          <Breadcrumb listClassName="breadcrumb-chevron">
            <BreadcrumbItem>
              <Link to="/" className="text-white" style={{fontSize:"18px!important",textTransform:"capitalize",fontWeight:"700"}}>
                {t('city.destination')}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/city/${selected}`} className="text-white" style={{fontSize:"18px!important",textTransform:"capitalize",fontWeight:"700"}}>
                {city}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={`/university/${selected}/${_id}`} className="text-white" style={{fontSize:"18px!important",textTransform:"capitalize",fontWeight:"700"}}>
                {univ.nom}
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>
      <section className="universities_list_container position-relative">
        <div className="list_title_container d-flex mt-5">
          <div className="yellow_box w-100"></div>
          <h3 className="color_second  city_title">{univ.fullname}</h3>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          {
            univ.logo ?
                <img src={univ.logo} alt="university logo" style={!isMobile ? {width:"300px",height:"auto"} :  {width:"150px",height:"auto",marginTop:"4rem"} }/>

            
                   :
                   <h1 className=" city_title text-center p-5">
                   {t('city.not_available_logo')}
                  </h1>
          }
        </div>
        <section className="presentation_container">
        
          <h3 className="color_main title_second presentation_title mb-5" >
          {t('university.bio')}
          </h3>
          
   
          <p
            
            className="presentation_p color_main title_second"
            style={{color:"#000!important"}}
          >{univ.description}</p>
        </section>
        <section className="presentation_container">
          <h3 className="color_main title_second presentation_title mb-5">
          {t('university.presentation')}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: univ.long_desc }}
            className="presentation_p color_main title_second"
          ></div>
        </section>
        <section className="presentation_container">
          {!isMobile &&    <img
            src={double_cercle}
            height="350"
            className="double-cercle-right"
          />}
        
          <h3 className="color_main title_second presentation_title mb-5">
          {t('university.formation')}
          </h3>
          <div className="row justify-content-center">
            {formas.length > 0 ?
              formas.map((item, key) => {
                return (
                  <div key={key} className="box_container formation_card_55 my-3 px-5">
                    <h4 className="color_second  mb-4 formation_title">
                      {item.nom}
                    </h4>
                    <div className="w-100 ">
                      <h5 className="title_second color_main  description_formation text-justify ">
                        {item.description}
                      </h5>
                    
                      <h5 className="title_second color_second description_formation" style={{ fontSize: "14px", maxWidth: "450px" }}>
                          <span>{t("uni_params.price")}: {item.price} {item.devise}</span>
                          <span style={{ margin: "0 10px" }}>|</span> 
                          <span>{t("uni_params.duration")}: {item.duree} {t("uni_params.week")}</span>
                          <span style={{ margin: "0 10px" }}>|</span>
                          <span>{item.avecBac ? t("user.with") : t("user.not_with")}</span>
                      </h5>
                    </div>
                  </div>
                );
              })
            : 
            <h1 className=" city_title text-center p-5">
            {t('city.not_available_formation')}
           </h1>
            }
          
          </div>

          {isUser(user) && isSub == "no" &&
            <div className="btn_container">
              <div className="d-flex align-items-center justify-content-center mx-5 mt-4">
                <Link to={`/send_demand/${_id}`} style={ isMobile ? {width:"100%",textAlign:"center"} :  {width:"50%",textAlign:"center"}}>
                  <button className="btn send_btn_style main_btn" style={{fontSize:"14px!important"}}>
                  {t('university.send')}
                  </button>
                </Link>
              </div>
            </div>
          }
          {isUser(user) && isSub == "pen" &&
            <div className="btn_container">
              <div className="d-flex align-items-center justify-content-center mx-5 mt-4">
                    <div className="alert alert-warning py-4 text-center" style={isMobile ?  {fontSize:"16px",width:"100%"} : {fontSize:"16px",width:"50%"}}>
                    {t('pen')}  
                    </div>
              </div>
            </div>
          }
          {isUser(user) && isSub == "succ" &&
            <div className="btn_container">
              <div className="d-flex align-items-center justify-content-center mx-5 mt-4">
                    <div className="alert alert-success py-4 text-center" style={isMobile ? {fontSize:"16px",width:"100%"} : {fontSize:"16px",width:"70%"}}>
                     {univ?.fullname} {t('accepted')}  
                    </div>
              </div>
            </div>
          }
          {isUser(user) && isSub == "ref" &&
            <div className="btn_container">
              <div className="d-flex align-items-center justify-content-center mx-5 mt-4">
                    <div className="text-center">
                      <div className="alert alert-danger py-4" style={{fontSize:"16px",width:"100%"}}>
                        <p>{univ?.fullname} {t('rejected')}   </p>
                        <p style={{fontWeight:"700"}}>{t('motif')}   </p>
                        <p>{motif}</p>
                      </div>
                      <Link to={`/send_demand/${_id}`} style={isMobile ? {width:"100%",textAlign:"center"}:{width:"50%",textAlign:"center"}}>
                        <button className="btn send_btn_style main_btn" style={{fontSize:"14px!important"}}>
                        {t('resend')} 
                        </button>
                      </Link>
                    </div>
              </div>
            </div>
          }
        </section>

      </section>
      <Footer />
    </>
  );
}

export default ViewUniversity;
