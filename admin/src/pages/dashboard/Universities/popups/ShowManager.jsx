import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import { useDispatch, useSelector } from "react-redux";
import { GetManagerByUniv } from "../../../../redux/university/university.actions";
import {
  UserImgComponent,
  DetailBoolItem,
  DetailItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import DelManager from "./sous_popups/DelManager";
import BlockManager from "./sous_popups/BlockManager";
import { init_manager } from "../../../../redux/university/university.reducer";

function ShowManager(props) {
  const { open, handleClose, title = "Showing Manager", value } = props;
  const manager = useSelector((state) => state.UniversityReducer.manager);
  const dispatch = useDispatch();
  const { email, pays, suspended, tel, verified, firstName, lastName } =
    manager || init_manager;

  const GetManagerData = () => {
    dispatch(GetManagerByUniv(value));
  };

  useEffect(() => {
    GetManagerData();
  }, [value]);

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
    GetManagerData();
  };
  //-------------------------------- Dialog States -------------------------------

  useEffect(() => {
    console.log(manager);
  }, [manager]);

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
        <DelManager
          open={suppDialogue}
          handleClose={handleClose2}
          value={manager}
          title={`Delete the Manager`}
          callBack={handleClose}
        />
      )}

      {blokDialogue && (
        <BlockManager
          open={blokDialogue}
          handleClose={handleClose2}
          value={manager}
          title={`Block Manager`}
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

      <h4 className=" text-800   mt-4 mb-0 ">Actions For Manager</h4>
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

export default ShowManager;
