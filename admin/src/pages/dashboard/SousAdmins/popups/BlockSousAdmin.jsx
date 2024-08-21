import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../../hooks/useWindowSize";
import { BlockSousAdminByAdmin } from "../../../../redux/sousadmins/sousadmins.actions";

function BlockSousAdmin(props) {
  const { open, handleClose, title = "Block/Unblock SousAdmin", value } = props;
  const payload = useSelector((state) => state.SousAdminsReducer.payload);
  const { suspended } = value;

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
    dispatch(BlockSousAdminByAdmin(value, handleClose));
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
        label={suspended ? "Unblock" : "Block"}
        icon="pi pi-check"
        className="p-button-danger"
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
          Are you sure you want to {suspended ? "Unblock" : "Block"}
          <b>
            {value.firstName} {value.lastName}
          </b>
        </span>
      </div>
    </Dialog>
  );
}

export default BlockSousAdmin;
