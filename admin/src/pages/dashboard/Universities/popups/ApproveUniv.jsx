import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../../hooks/useWindowSize";
// import InputFile from "../../../../MyComponents/Inputs/FileInput/InputFile";
import { ApproveUniv } from "../../../../redux/university/university.actions";
import { toast } from "react-hot-toast";

function ApprovePopup(props) {
  const { open, handleClose, title = "Approve Item", value } = props;
  const payload = useSelector((state) => state.UniversityReducer.payload);

  const [nom, setNom] = useState("");
  const dispatch = useDispatch();
  const size = useWindowSize();

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

  const handleSubmit = () => {
    console.log(nom);
    console.log(value.nom);
    if (value.nom !== nom) {
      toast.error("Verify University Name");
      return false;
    }
    console.log(value._id);
    dispatch(ApproveUniv(value, handleClose));
  };

  const DialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined"
        onClick={handleClose}
        disabled={payload}
      />
      <Button
        label="Approve"
        icon="pi pi-check"
        className="p-button-warning"
        onClick={handleSubmit}
        disabled={payload}
      />
    </>
  );

  return (
    <Dialog
      visible={open}
      style={{ width: PopupSize() }}
      header={title}
      modal
      className="p-fluid"
      footer={DialogFooter}
      onHide={handleClose}
    >
      <div className="flex align-items-center justify-content-start">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span>
          Are you sure you want to approve <b>{value.nom} </b>? rewrite the
          university name to confirm the approve
        </span>
        <br />
      </div>

      <div className="grid w-100 mt-2">
        <div className="field col-12 md:col-12">
          <label>University Short Name*</label>
          <InputText
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
            }}
            required
            autoFocus
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ApprovePopup;
