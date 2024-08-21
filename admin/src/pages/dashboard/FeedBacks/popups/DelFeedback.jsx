import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../../hooks/useWindowSize";
import { DeleteFeedback } from "../../../../redux/feedbacks/feedbacks.actions";

function DelFeedback(props) {
  const {
    open,
    handleClose,
    title = "Delete Sous Admin",
    value,
    callBack = () => {},
  } = props;
  const payload = useSelector((state) => state.feedbacksReducer.payload);

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
    console.log(value);
  }, [value]);

  const handleSubmit = () => {
    const after = () => {
      callBack();
    };
    handleClose();
    dispatch(DeleteFeedback(value, after));
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
        label="Delete"
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
          Are you sure you want to delete <b>Feedback</b>
        </span>
      </div>
    </Dialog>
  );
}

export default DelFeedback;
