import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import {
  UserImgComponent,
  DetailBoolItem,
  DetailItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import DelStudent from "./DelStudent";
import BlockStudent from "./BlockStudent";
import { init_student } from "../../../../redux/students/student.reducer";
import { Image } from "primereact/image";

function ShowStudent(props) {
  const { open, handleClose, title = "Showing Student", value } = props;
  const {
    email,
    pays,
    suspended,
    tel,
    verified,
    firstName,
    lastName,
    passeport,
    CV,
    diplome,
    releveDeNote,
  } = value || init_student;

  //-------------------------------- Dialog States --------------------------------------------
  const [suppDialogue, setSuppDialog] = useState(false);
  const [blokDialogue, setBlokDialog] = useState(false);
  const openSuppDialogue = () => {
    setSuppDialog(true);
  };
  const openBlockDialogue = () => {
    setBlokDialog(true);
  };
  const handleClose2 = () => {
    setBlokDialog(false);
    setSuppDialog(false);
    handleClose();
  };
  //-------------------------------- Dialog States -------------------------------

  return (
    <Dialog
      visible={open}
      style={{ width: "400px" }}
      header={title}
      modal
      className="p-fluid"
      onHide={handleClose}
    >
      {suppDialogue && (
        <DelStudent
          open={suppDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Delete the Student`}
          callBack={handleClose}
        />
      )}

      {blokDialogue && (
        <BlockStudent
          open={blokDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Block Student`}
        />
      )}

      <UserImgComponent
        firstName={firstName || "N"}
        lastName={lastName || "N"}
        avatar={null}
      />
      <h4 className=" text-800  text-center mt-0 ">
        {firstName && lastName ? `${firstName} ${lastName}` : "Not Available"}
      </h4>
      {/* <SupplierProdMonthNumbers color={color} nbProds={253} nbMonths={5} /> */}
      <h4 className=" text-800   mt-6 mb-0 ">Details</h4>
      <Divider className="mt-1 mb-1" />

      <DetailItem label="First Name : " value={firstName || "Not Available"} />
      <DetailItem label="Last Name : " value={lastName || "Not Available"} />
      <DetailItem label="Phone Number : " value={tel || "Not Available"} />
      <DetailItem label="Email : " value={email || "Not Available"} />
      <DetailItem label="Country : " value={pays || "Not Available"} />

      <DetailBoolItem
        label="Status : "
        value={!suspended}
        TrueTxt="Not Suspended"
        FalseTxt="Suspended"
      />

      <DetailBoolItem
        label="Verified : "
        value={verified}
        TrueTxt="Verified"
        FalseTxt="Not Verified"
      />

      <h4 className=" text-800   mt-4 mb-0 ">Student Files</h4>
      <Divider className="mt-1 mb-1" />

      <div className="grid">
        <div className="col-12">
          <p className="m-0">
            <strong>CV FILE</strong>
          </p>
          <a href={CV}
            alt="galleria"
            width={"100%"}
            preview
            tooltip="Enter your username"
          >{CV}</a>
        </div>
        <div className="col-12">
          <p className="m-0">
            <strong>DIPLOME</strong>
          </p>
          <a href={diplome}
            alt="galleria"
            width={"100%"}
            preview
            tooltip="Enter your username"
          >{diplome}</a>
        </div>
        <div className="col-12">
          <p className="m-0">
            <strong>PASSEPORT</strong>
          </p>
          <a href={passeport}
            alt="galleria"
            width={"100%"}
            preview
            tooltip="Enter your username"
          >{passeport}</a>
        </div>
        <div className="col-12">
          <p className="m-0">
            <strong>REL-NOTE</strong>
          </p>
          <a href={releveDeNote}
            alt="galleria"
            width={"100%"}
            preview
            tooltip="Enter your username"
          >{releveDeNote}</a>
        </div>
      </div>

      <h4 className=" text-800   mt-4 mb-0 ">Actions For Student</h4>
      <Divider className="mt-1 mb-1" />

      <div className=" flex align-items-center justify-content-evenly mt-4 ">
        <Button // Block Acount
          icon="pi pi-ban"
          label="Block Acount"
          className="p-button-warning mx-2"
          onClick={openBlockDialogue}
        />
        <Button // Delete Account
          icon="pi pi-trash"
          label="Delete Account"
          className="p-button-danger mx-2"
          onClick={openSuppDialogue}
        />
      </div>
    </Dialog>
  );
}

export default ShowStudent;
