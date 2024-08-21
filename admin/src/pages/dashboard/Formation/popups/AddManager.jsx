import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import { CreateManagerValidation } from "./validation";
import useWindowSize from "../../../../hooks/useWindowSize";
import { CreateManagerForUniv } from "../../../../redux/university/university.actions";

const init_create = {
  firstName: "",
  lastName: "",
  email: "",
  tel: "",
};

function AddManager(props) {
  const { open, handleClose, title = "Adding Manager", value } = props;
  const payload = useSelector((state) => state.UniversityReducer.payload);
  // item values :  firstName, lastName, email, phoneNumber, country, password
  const [item, setItem] = useState({ ...init_create });
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    if (CreateManagerValidation(item)) {
      dispatch(CreateManagerForUniv(item, value, handleClose));
    }
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
        label="Save"
        icon="pi pi-check"
        className=""
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
      <div className="grid w-100 mt-2">
        <div className="field col-12 md:col-12">
          <label>First Name*</label>
          <InputText
            name="firstName"
            value={item.firstName}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="field col-12 md:col-12">
          <label>Last Name*</label>
          <InputText
            name="lastName"
            value={item.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field col-12 md:col-12">
          <label>Manager Email*</label>
          <InputText
            name="email"
            value={item.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field col-12 md:col-12">
          <label>Phone Number*</label>
          <InputText
            name="tel"
            value={item.tel}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </Dialog>
  );
}

export default AddManager;
