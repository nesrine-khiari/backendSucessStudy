import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import { UpdateStatusValidation } from "./validation";
import useWindowSize from "../../../../hooks/useWindowSize";
import { UpdateStudentByAdmin } from "../../../../redux/students/student.actions";
import { UpdateStatusByAdmin } from "../../../../redux/bills/bills.actions";
import { Dropdown } from "primereact/dropdown";

const init_create = {
  status: "",
  id: ""
};

function UpdateBill(props) {
  const { open, handleClose, title = "Updating Bill", value } = props;
  const payload = useSelector((state) => state.BillsReducer.payload);
  // item values :  firstName, lastName, email, phoneNumber, country, password
  const [item, setItem] = useState({ ...init_create });
  const dispatch = useDispatch();
  const size = useWindowSize();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, status: value });
  };

  const handleSubmit = () => {
    if (UpdateStatusValidation(item)) {
      console.log(UpdateStatusValidation(item))
      dispatch(UpdateStatusByAdmin(item, handleClose));
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
          <label htmlFor="description">Select Status*</label>
          <Dropdown
            value={item.status}
            name="status"
            onChange={handleChange}
            options={[
              { value: "complete", name: "completed" },
              { value: "not_complete", name: "pending" },
              { value: "fail", name: "failed" }
            ]}
            optionLabel="name"
            optionValue="value"
            placeholder="Select Status"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default UpdateBill;
