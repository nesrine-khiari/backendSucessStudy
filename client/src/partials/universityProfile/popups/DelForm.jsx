import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./DelForm.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";
import { DeleteFormation } from "../../../redux/university/university.actions";
import { toast } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

function DelForm(props) {
  const { open, handleClose, title , value } = props;
  const payload = useSelector((state) => state.UniversityReducer.payload);
  const [nom, setNom] = useState("");
  const dispatch = useDispatch();
  const size = useWindowSize();

  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 992 });

  const PopupSize = () => {
    switch (size) {
      case "xl":
        return "500px";
      case "lg":
        return "500px";
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
        return "80%";
      default:
        return "80%";
    }
  };

  const handleSubmit = () => {

    if (value.nom !== nom) {
      toast.error(t("uni_params.verifDel"));
      return false;
    }
    dispatch(DeleteFormation(value, handleClose));
  };

  const DialogFooter = (
    <div className="popup-footer">
      <Button
        label={t("uni_params.cancel")}
        icon="pi pi-times"
        className="p-button-outlined"
        onClick={handleClose}
        disabled={payload}
        style={{color : "#f4ba41ff" ,  backgroundColor: "#ffffff"}}
      />
      <Button
        label={t("uni_params.delete")}
        icon="pi pi-check"
        className="p-button-danger"
        onClick={handleSubmit}
        disabled={payload}
        style={{color : "#ffffff"}}
      />
    </div>
  );

  const DialogHeader = (
    <div className="popup-header" style={{ textAlign: "center" }}>
      <h1 style={{ maxWidth: "400px", overflowWrap: "break-word", wordWrap: "break-word" }}>{t("uni_params.deleteForm")}</h1>
      
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
      <div className="flex align-items-center justify-content-start">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span style={{fontFamily : "inherit" , fontSize : "15px", color:"#023047"}}>
        {t("uni_params.deleteQuestion")}   </span>
        <span style={{fontWeight : "bold" , fontSize : "15px" , color:"#023047", overflowWrap: "break-word"}}>
  {value.nom}
</span>

         <span style={{fontFamily : "inherit" , fontSize : "15px" , color:"#023047"}}>?</span>
           <br />
        <span style={{fontFamily : "inherit" , fontSize : "15px" , color:"#023047"}}>{t("uni_params.deleteRewrite")}</span>
        <br />
      </div>

      <div className="grid w-100 mt-2" >
        <div className="field col-12 md:col-12">
          <label style={{fontFamily : "inherit" , fontSize : "15px", color:"#023047"}}>{t("uni_params.deleteShortName")}</label>
          <InputText
  value={nom}
  onChange={(e) => {
    setNom(e.target.value);
  }}
  required
  autoFocus
  className="Input"
  style={{ fontSize: "16px", paddingLeft: "8px" }} // Adjust font size and left padding as needed
/>
        </div>
      </div>
    </Dialog>
    </div>
  );
}

export default DelForm;
