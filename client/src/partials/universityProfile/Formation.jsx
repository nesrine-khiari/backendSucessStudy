import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Input, InputGroup, Label, Row } from "reactstrap";
import { CreateFormation } from "../../redux/university/university.actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import { GetFormasByIdUniv } from "../../redux/university/university.actions";
import DelForm from "./popups/DelForm"; 
import UpdateForm from "./popups/UpdateForm"; 
import { InitialState } from "../../redux/university/university.reducer";
import { Button } from "primereact/button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Formation.css";
import { ReactComponent as Icon } from "../../assets/images/del.svg";
import { useMediaQuery } from "react-responsive";


function Formation(props) {
  const Arr_devises=[
    "DT",
    "USD", // Dollar américain
    "EUR", // Euro
    "GBP", // Livre sterling
    "JPY", // Yen japonais
    "CAD", // Dollar canadien
    "CHF", // Franc suisse
    "AUD", // Dollar australien
    "NZD", // Dollar néo-zélandais
    "CNY", // Yuan chinois
    "INR"  // Roupie indienne
  ];

  let emptyItem = { ...InitialState };
  const [Item, setItem] = useState(emptyItem);

  const formas = useSelector((state) => state.UniversityReducer.formations);
  const univId = props.univId;
  useEffect(() => {
    dispatch(GetFormasByIdUniv(univId));
  }, [univId]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer.user);
  const [Froma, setFroma] = useState({
    nom: "",
    description: "",
    avecBac: false,
    price:0,
    duree: 0,
    devise: "",
  });
  const [suppDialogue, setSuppDialog] = useState(false);
  const [updDialogue, setUpdDialog] = useState(false);

  const openUpdDialogue = (row) => {
    setUpdDialog(true);
    setItem({ ...row });
  };

  const openSuppDialogue = (row) => {
    setSuppDialog(true);
    setItem({ ...row });
  };

  const handleClose = () => {
    setItem({ ...emptyItem });
    setSuppDialog(false);
    setUpdDialog(false);
    dispatch(GetFormasByIdUniv(univId));
  };

  const handle_change = (event) => {
    const { name, value } = event.target;
    setFroma({ ...Froma, [name]: value });
  };

  const handleSubmit = () => {
    if (!Froma.nom) {
      toast.error(t("uni_params.nomOblig"));
      return false;
    }
    if (!Froma.duree) {
      toast.error(t("uni_params.dureeOblig"));
      return false;
    }
    if (!Froma.description) {
      toast.error(t("uni_params.descOblig"));
      return false;
    }
    if (!Froma.devise) {
      toast.error(t("uni_params.deviseOblig"));
      return false;
    }
    dispatch(CreateFormation(Froma, user.Universite));
  };
  const isMobile = useMediaQuery({ maxWidth: 992 });


  const { t } = useTranslation();

  return (
    <div>
      <br /> <br />
      <Row style={{maxWidth:isMobile ?"240px":"100%"}}>
        <Col md={8} xs={12} className="">
          <Tabs
            onSelect={console.log("hello")}
            style={{ width: "150%", border: "none", maxWidth: isMobile ? "400px": "800px"  }}
            className="d-flex justify-content-center "
          >
            <Tab
              eventKey="1"
              title={t("uni_params.createForm")}
              style={{ width: "150%", maxWidth: isMobile ? "400px": "800px"  }}
            >
              <Row className="mt-5">
                <Col md={12} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t("uni_params.formation_name")}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        className="signup_input"
                        placeholder={t("uni_params.formation_name")}
                        name="nom"
                        value={Froma.nom}
                        onChange={handle_change}
                      />
                    </InputGroup>
                  </div>
                </Col>
                <Col md={4} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t("uni_params.formation_duration")}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        className="signup_input"
                        placeholder={t("uni_params.formation_duration")}
                        name="duree"
                        type="number"
                        value={Froma.duree}
                        onChange={handle_change}
                      />
                    </InputGroup>
                  </div>
                </Col>
                <Col md={4} xs={12}>
                  <div className="mb-5">
                    <Label
                      className="ps-3 pb-2 form-label signup_label"
                      id="firstName"
                    >
                      {t("uni_params.formation_price")}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        className="signup_input"
                        placeholder={t("uni_params.formation_price")}
                        name="price"
                        type="number"
                        value={Froma.price}
                        onChange={handle_change}
                      />
                    </InputGroup>
                  </div>
                </Col>


                <Col md={4} xs={12}>
          <div className="mb-5">
            <Label className="ps-3 pb-2 form-label signup_label" >
              {t("register.devise")}
            </Label>
            <InputGroup>
              <Input
                type="select"
                id="select"
                className="signup_input"
                placeholder={t("register.devise")}
                name="devise"
                value={Froma.devise}
                onChange={handle_change}
              >
                <option value="">Choisir votre devise</option>

                {Arr_devises.map((x) => {
                  return <option value={x}>{x}</option>;
                })}
              </Input>
            </InputGroup>
          </div>
        </Col>


                <Col md={12} xs={12}>
                  <div className="">
                    <Label className="ps-3 pb-2 form-label signup_label">
                      {t("uni_params.formation_description")}
                    </Label>
                    <InputGroup className="border-0">
                      <Input
                        type="textarea"
                        rows="6"
                        className="signup_input "
                        placeholder={t("uni_params.formation_description")}
                        name="description"
                        value={Froma.description}
                        onChange={handle_change}
                      />
                    </InputGroup>
                  </div>
                </Col>

                <Col md={12} xs={12}>
                  <div className="mb-5 mt-5">
                    <Label
                      className="ps-3 pb-3 form-label signup_label"
                      id="password"
                    >
                      {t("uni_params.formation_level")}
                    </Label>
                    <InputGroup>
                      <Input
                        className="signup_input"
                        placeholder={t("uni_params.formation_level")}
                        type="select"
                        name="avecBac"
                        value={Froma.avecBac}
                        onChange={handle_change}
                      >
                        <option value={true}>{t("user.with")}</option>
                        <option value={false}>{t("user.not_with")}</option>
                      </Input>
                    </InputGroup>
                  </div>
                </Col>
              </Row>

              <div className="w-100">
  <div className="row" >
    <div className="align-items-center flex-lg-nowrap py-5 mt-2 d-flex justify-content-center">
      <button
        onClick={handleSubmit}
        className="btn main_btn_outline add_more_btn title_forth d-flex justify-content-center"
        style={{ 
          border: '2px solid #f4ba41ff', 
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 2px rgba(244, 186, 65, 0.5)' // Adding blur effect to the border
        }}
      >
        {t("uni_params.add_another_formation")}
      </button>
    </div>
  </div>
</div>

            </Tab>
            <Tab
              eventKey="2"
              title={t("uni_params.listForm")}
              style={{
                display: "inline-block",
                textAlign: "center",
                width:isMobile? "164%":"190%",
                marginTop: "20px",
              }}
            >
              {formas.length > 0 ? (
                formas.map((item, key) => {
                  return (<div
                    key={key}
                    className="box_container formation_card_56 my-3 px-5"
                    style={{ maxWidth: isMobile ? "400px": "800px" }} // Limit the maximum width of the container
                  >
                    <h1 className=" mb-4 formation_title1" style={{ overflowWrap: "break-word", wordWrap: "break-word" ,color :"#023047" }}>
                      {item.nom}
                    </h1>
                    <div className="w-100">
                      <h5 className="title_second color_main description_formation text-justify" style={{ wordWrap: 'break-word' }}>
                        {item.description}
                      </h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="title_second color_second description_formation" style={{ fontSize: "14px", maxWidth: "450px" }}>
                          {isMobile?(
<>
<span>{t("uni_params.price")}: {item.price} {item.devise}</span>
                         <br />
                          <span>{t("uni_params.duration")}: {item.duree} {t("uni_params.week")}</span>
                        <br />
                          <span>{item.avecBac ? t("user.with") : t("user.not_with")}</span>
</>
                          ):
                          (
<>
<span>{t("uni_params.price")}: {item.price} {item.devise}</span>
                          <span style={{ margin: "0 10px" }}>|</span> 
                          <span>{t("uni_params.duration")}: {item.duree} {t("uni_params.week")}</span>
                          <span style={{ margin: "0 10px" }}>|</span>
                          <span>{item.avecBac ? t("user.with") : t("user.not_with")}</span></>
                          )

                          }
                        </h5>
                        <div className="d-flex align-items-end">
                          <button
                            type="button"
                            className="btn btn-outline-primary position-relative p-3 rounded-0 border-0"
                            onClick={() => openUpdDialogue(item)}
                            style={{ borderColor: '#4e86e4', color: '#4e86e4' }}
                           
                          >
                            <i className="fas fa-edit fa-2x" style={{ color: '#4e86e4' }}></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger position-relative p-3 rounded-0 border-0 ml-2"
                            onClick={() => openSuppDialogue(item)}
                            style={{ borderColor: '#dc3545', color: '#dc3545' }}
                          >
                            <i className="fas fa-trash fa-2x text-danger"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
                  );
                })
              ) : (
                <h1
                  className="city_title text-center d-inline"
                  style={{
                    fontSize: "30px",
                    display: "inline-block",
                  }}
                >
                  {t("city.not_available_formation")}
                </h1>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
      {Item && updDialogue && (
            <UpdateForm
              open={updDialogue}
              handleClose={handleClose}
              value={Item}
              user={user}
              title={`${Item.nom}`}
              Arr_devises={Arr_devises}
            />
          )}
      {Item && suppDialogue && (
        <DelForm
          open={suppDialogue}
          handleClose={handleClose}
          value={Item}
          title={`${Item.nom}`}
        />
       
      )}
    </div>
  );
}

export default Formation;
