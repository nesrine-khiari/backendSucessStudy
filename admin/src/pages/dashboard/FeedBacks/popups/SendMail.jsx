import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { SendMailValidation } from "./validation";
import useWindowSize from "../../../../hooks/useWindowSize";
import { InputTextarea } from "primereact/inputtextarea";

import { useDispatch } from "react-redux";
import { SendOneMail } from "../../../../redux/user/user.actions";

const init_mail = {
  email: "",
  object: "",
  content: "",
};

function UpdateSousAdmin(props) {
  const { open, handleClose, title = "Send Mail", value } = props;
  // item values :  firstName, lastName, email, phoneNumber, country, password
  const [item, setItem] = useState({ ...init_mail });
  const size = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    setItem({ ...value });
  }, [value]);

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

  useEffect(() => {
    setItem({ ...item, email: value.email });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    if (SendMailValidation(item)) {
      dispatch(SendOneMail(item, handleClose));
    }
  };

  const DialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined"
        onClick={handleClose}
        // disabled={payload}
      />
      <Button
        label="Send"
        icon="pi pi-check"
        className=""
        onClick={handleSubmit}
        // disabled={payload}
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
          <InputText
            name="email"
            value={item.email}
            onChange={handleChange}
            required
            disabled={true}
          />
        </div>
        <div className="field col-12 md:col-12">
          <InputText
            placeholder="object"
            name="object"
            value={item.object}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field col-12 md:col-12">
          <InputTextarea
            placeholder="Mail Content"
            name="content"
            value={item.content}
            onChange={handleChange}
            autoResize={false}
            rows="5"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default UpdateSousAdmin;
