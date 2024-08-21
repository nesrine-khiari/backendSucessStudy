import React, { useState , useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./DelForm.css";
import { useTranslation } from "react-i18next";
import { UpdateFormation } from "../../../redux/university/university.actions";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";
import { toast } from "react-hot-toast";
import { Col, Input, InputGroup, Label, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useMediaQuery } from "react-responsive";

function UpdateForm(props) {
  const isMobile = useMediaQuery({ maxWidth: 992 });
  const PopupSize = () => {
    switch (size) {
      case "xl":
        return "800px";
      case "lg":
        return "800px";
      case "md":
        return "500px";
      case "sm":
        return "500px";
      case "xs":
        return "98%";
      default:
        return "80%";
    }
  };

  const PopupSizeMob = () => {
    switch (size) {
      case "xl":
        return "400px";
      case "lg":
        return "500px";
      case "md":
        return "500px";
      case "sm":
        return "500px";
      case "xs":
        return "90%";
      default:
        return "80%";
    }
  };
  const { t } = useTranslation();

  const { open, handleClose, title , value ,Arr_devises} = props;
  const payload = useSelector((state) => state.UniversityReducer.payload);

  const [item, setItem] = useState({ ...value });
  const dispatch = useDispatch();
  const size = useWindowSize();


  useEffect(() => {
    console.log(value);
    setItem({ ...value });
  }, [value]);

  const handle_change = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  
  const handleSubmit = () => {
    
    if (!item.nom) {
      toast.error(t("uni_params.nomOblig"));
      return false;
    }
    if (!item.duree) {
      toast.error(t("uni_params.dureeOblig"));
      return false;
    }

    if (!item.description) {
      toast.error(t("uni_params.descOblig"));
      return false;
    }
    if (!item.devise) {
      toast.error(t("uni_params.deviseOblig"));
      return false;
    }

    dispatch(UpdateFormation(item , handleClose));
  };












  const DialogFooter = (
    <div className="popup-footer">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined"
        onClick={handleClose}
        disabled={payload}
        style={{color : "#f4ba41ff" ,  backgroundColor: "#ffffff"}}
      />
      <Button
        label="Submit"
        icon="pi pi-check"
        onClick={handleSubmit}
        disabled={payload}
        style={{color : "#ffffff", backgroundColor :"#f4ba41ff" , border : "none"}}
      />
    </div>
  );

  const DialogHeader = (
    <div className="popup-header" style={{ overflowWrap: "break-word", wordWrap: "break-word", textAlign: "center",display: "flex", flexDirection: "column", alignItems: "center"  }}>
      <h1 style={{ maxWidth: "400px" }}>{t("uni_params.updateForm")}</h1> 
    </div>
  );
  
  
  return (
    <div className="overlay">
    <Dialog
      visible={open}
      style={{ width:isMobile? PopupSizeMob() : PopupSize() }}
      header={DialogHeader}
      modal
      className="p-fluid popup-container"
      footer={DialogFooter}
      onHide={handleClose}
    >
      <div className="flex align-items-center justify-content-start" style={{ overflow: "hidden" , padding: "10px" }}>
      
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
                        className="signup_input custom-input"
                        placeholder={t("uni_params.formation_name")}
                        name="nom"
                        value={item.nom}
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
                        className="signup_input custom-input"
                        placeholder={t("uni_params.formation_duration")}
                        name="duree"
                        type="number"
                        value={item.duree}
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
                        className="signup_input custom-input"
                        placeholder={t("uni_params.formation_price")}
                        name="price"
                        type="number"
                        value={item.price}
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
                className="signup_input custom-input"
                placeholder={t("register.devise")}
                name="devise"
                value={item.devise}
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
                        className="signup_input custom-input "
                        placeholder={t("uni_params.formation_description")}
                        name="description"
                        value={item.description}
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
                        className="signup_input custom-input"
                        placeholder={t("uni_params.formation_level")}
                        type="select"
                        name="avecBac"
                        value={item.avecBac}
                        onChange={handle_change}
                      >
                        <option value={true}>{t("user.with")}</option>
                        <option value={false}>{t("user.not_with")}</option>
                      </Input>
                    </InputGroup>
                  </div>
                </Col>
              </Row>

      </div>
    </Dialog>
    </div>
  );
}

export default UpdateForm;
