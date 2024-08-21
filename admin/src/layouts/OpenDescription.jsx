import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./DelForm.css";

import { useSelector } from "react-redux";
import useWindowSize from "../hooks/useWindowSize";

import { Col,Row } from "reactstrap";





function OpenDescription(props) {

    const PopupSize = () => {
        switch (size) {
            case "xl":
                return "800px";
            case "lg":
                return "800px";
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


    const { open, handleClose, description, value, title } = props;
    const payload = useSelector((state) => state.UniversityReducer.payload);

    const [item, setItem] = useState({ ...value });
    const size = useWindowSize();


    useEffect(() => {
        console.log(value);
        setItem({ ...value });
    }, [value]);

    const DialogFooter = (
        <div className="popup-footer">
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-outlined"
                onClick={handleClose}
                disabled={payload}
                style={{ color: "#f4ba41ff", backgroundColor: "#ffffff" }}
            />
        </div>
    );

    const DialogHeader = (
        <div className="popup-header" style={{ overflowWrap: "break-word", wordWrap: "break-word", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ maxWidth: "400px" }}>{item.nom}</h1> <h2>Description</h2>
        </div>
    );


    return (
        <div className="overlay">
            <Dialog
                visible={open}
                style={{ width: PopupSize() }}
                header={DialogHeader}
                modal
                className="p-fluid popup-container"
                footer={DialogFooter}
                onHide={handleClose}
            >
                <div className="flex align-items-center justify-content-start" style={{ overflow: "hidden", padding: "10px" }}>

                    <Row className="mt-5">
                        <Col md={12} xs={12}>
                            <p style={{ fontSize: "14px" }}>{item.description}</p>
                        </Col>
                    </Row>

                </div>
            </Dialog>
        </div>
    );
}

export default OpenDescription;