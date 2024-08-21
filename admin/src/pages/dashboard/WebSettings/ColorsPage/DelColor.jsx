import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch } from "react-redux";
import { DeleteColor } from "../../../../redux/actions/Colors.actions";

function DeleteColorDialogue(props) {
    const { open, handleClose, initItem, title = "Deleting Item" } = props;
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(DeleteColor(initItem, handleClose));
    };

    const deleteDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={handleClose}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={handleDelete}
            />
        </>
    );

    return (
        <Dialog
            visible={open}
            style={{ width: "450px" }}
            header="Confirm Deleting"
            modal
            footer={deleteDialogFooter}
            onHide={handleClose}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />

                <span>{title}</span>
            </div>
        </Dialog>
    );
}

export default DeleteColorDialogue;
