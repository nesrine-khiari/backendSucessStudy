import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import {
  UserImgComponent,
  DetailBoolItem,
  DetailItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import DelSousAdmin from "./DelSousAdmin";
import BlockSousAdmin from "./BlockSousAdmin";
import { init_sousadmin } from "../../../../redux/sousadmins/sousadmins.reducer";

function ShowSousAdmin(props) {
  const { open, handleClose, title = "Showing Sous Admin", value } = props;
  const { email, pays, suspended, tel, verified, firstName, lastName } =
    value || init_sousadmin;

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
        <DelSousAdmin
          open={suppDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Delete the Sous Admin`}
          callBack={handleClose}
        />
      )}

      {blokDialogue && (
        <BlockSousAdmin
          open={blokDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Block Sous Admin`}
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

      <h4 className=" text-800   mt-4 mb-0 ">Actions For Sous Admin</h4>
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

export default ShowSousAdmin;
