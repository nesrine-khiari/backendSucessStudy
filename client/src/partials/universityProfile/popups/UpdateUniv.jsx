import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import { Update_univ_valid } from "./validation";
import useWindowSize from "../../../../hooks/useWindowSize";
import TextEditor from "../../../../MyComponents/Inputs/TextEditorQuill/TextEditorQuill";
// import InputFile from "../../../../MyComponents/Inputs/FileInput/InputFile";
import { UpdateUnivAction } from "../../../../redux/university/university.actions";

function UpdateUniv(props) {
  const { open, handleClose, title = "Updating Item", value } = props;
  const payload = useSelector((state) => state.UniversityReducer.payload);

  const [item, setItem] = useState({ ...value });
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

  useEffect(() => {
    setItem({ ...value });
  }, [value]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  
  const handleSubmit = () => {
    if (Update_univ_valid(item)) {
      dispatch(UpdateUnivAction(item, handleClose));
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
  const { t } = useTranslation();
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
          <label>University Short Name*</label>
          <InputText
            name="nom"
            value={item.nom}
            onChange={handleChange}
            required
            autoFocus
            // className={classNames({
            //   "p-invalid": false,
            // })}
          />
          {/* {submitted && !item.name && (
          <small className="p-invalid">Name is required.</small>
        )} */}
        </div>
        <div className="field col-12 md:col-12">
          <label>University Full Name*</label>
          <InputText
            name="fullname"
            value={item.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field col-12 md:col-12">
          <label>Organisation Mére*</label>
          <InputText
            name="OrganMere"
            value={item.OrganMere}
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

        <div className="field col-12 md:col-12">
          <label htmlFor="description">Select Country*</label>
          <Dropdown
            value={item.pays}
            name="pays"
            onChange={handleChange}
            options={[
              { value: "tunisie", name: "Tunisie" },
              { value: "france", name: "France" },
              { value: "espagne", name: "Espagne" },
              { value: "canada", name: "Canada" }
            ]}
            optionLabel="name"
            optionValue="value"
            placeholder="Select You Country"
          />
        </div>

        <div className="field col-12 md:col-12">
          <label>Adress*</label>
          <InputText
            name="address"
            value={item.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className="field col-12 md:col-12">
          <label>Logo Image*</label>
          <InputFile
            placeholder="Upload Logo Image"
            onChange={handleChange}
            name="logo"
          />
          {item.logo && <small className="p-invalid">{item.logo?.name}</small>}
        </div>

        <div className="field col-12 md:col-12">
          <label>Cover Image*</label>
          <InputFile
            placeholder="Upload Cover Image"
            onChange={handleChange}
            name="cover"
          />
          {item.cover && (
            <small className="p-invalid">{item.cover?.name}</small>
          )}
        </div> */}

        <div className="field col-12 md:col-12">
          <label>Description*</label>
          <InputTextarea
            placeholder="University Description"
            name="description"
            value={item.description}
            onChange={handleChange}
            autoResize={false}
            rows="3"
            cols="30"
          />
        </div>

        <div className="field col-12 md:col-12">
          <label>Long Description*</label>
          <TextEditor
            name="long_desc"
            value={item.long_desc}
            onChange={handleChange}
            placeholder="long description"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default UpdateUniv;
