import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import {
  UserImgComponent,
  DetailBoolItem,
  DetailItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import { init_sousadmin } from "../../../../redux/sousadmins/sousadmins.reducer";

function ShowUser(props) {
  const { open, handleClose, title = "Showing User", value } = props;
  const { email, pays, suspended, tel, verified, firstName, lastName } =
    value || init_sousadmin;

  return (
    <Dialog
      visible={open}
      style={{ width: "400px" }}
      header={title}
      modal
      className="p-fluid"
      onHide={handleClose}
    >
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
    </Dialog>
  );
}

export default ShowUser;
