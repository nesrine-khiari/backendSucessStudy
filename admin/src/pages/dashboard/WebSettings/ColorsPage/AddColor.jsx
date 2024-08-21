import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import {
    CreateColor,
    UpdateColor,
} from "../../../../redux/actions/Colors.actions";

function AddColor(props) {
    const { open, handleClose, initItem, title = "Adding Item" } = props;
    const payload = useSelector((state) => state?.Colors?.payload);
    const [item, setItem] = useState({ ...initItem });
    const dispatch = useDispatch();
    let submitted = false;

    useEffect(() => {
        setItem(initItem);
    }, [initItem]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = () => {
        if (item?._id) {
            dispatch(UpdateColor(item, handleClose));
        } else {
            dispatch(CreateColor(item, handleClose));
        }
    };

    const DialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={handleClose}
                disabled={payload}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={handleSubmit}
                disabled={payload}
            />
        </>
    );

    return (
        <Dialog
            visible={open}
            style={{ width: "450px" }}
            header={item._id ? `You are updating "${initItem.name}"` : title}
            modal
            className="p-fluid"
            footer={DialogFooter}
            onHide={handleClose}
        >
            <div className="field">
                <label htmlFor="name">Name</label>
                <InputText
                    id="name"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                    required
                    autoFocus
                />
            </div>
            <div className="field">
                <label htmlFor="description">HexaCode</label>
                <InputText
                    id="hexaCode"
                    name="hexaCode"
                    value={item.hexaCode}
                    onChange={handleChange}
                    required
                />
            </div>
        </Dialog>
    );
}

export default AddColor;
