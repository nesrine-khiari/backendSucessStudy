import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";

import { useSelector, useDispatch } from "react-redux";
import { GetAllColors } from "../../../../redux/actions/Colors.actions";

import AddColor from "./AddColor";
import DelColor from "./DelColor";

const GestColors = () => {
    let emptyItem = {
        name: "",
        hexaCode: "",
    };

    const colors = useSelector((state) => state.Colors.data.items);
    const dispatch = useDispatch();

    const [Item, setItem] = useState(emptyItem);
    //-------------------------------- Dialog States --------------------------------------------
    const [addDialogue, setAddDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [globalFilter, setGlobalFilter] = useState(null);

    const dt = useRef(null);

    //-------------------------------- Get Data --------------------------------------------
    useEffect(() => {
        dispatch(GetAllColors());
    }, []);

    //-------------------------------- Handle Opens -------------------------------

    const openAddDialogue = () => {
        setAddDialog(true);
    };

    const openEditDialogue = (row) => {
        setItem({ ...row });
        setAddDialog(true);
    };

    const OpenDeleteDialogue = (row) => {
        setItem(row);
        setDeleteDialog(true);
    };

    //-------------------------------- Handle Close -------------------------------
    const handleClose = () => {
        setItem({ ...emptyItem });
        setAddDialog(false);
        setDeleteDialog(false);
    };

    //-------------------------------- Header of Page -------------------------------

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h5 className="m-0 mr-2">Manage Colors</h5>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        className="p-button-primary mr-2"
                        onClick={openAddDialogue}
                    />
                </div>
            </React.Fragment>
        );
    };

    //------------------------------------------- COLUMNS VALUES ----------------------------------------------

    const ColorColumnValue = (rowData) => {
        return (
            <div
                style={{
                    backgroundColor: rowData.hexaCode,
                    height: "40px",
                    width: "40px",
                }}
                className="shadow-2 border-rounded"
            />
        );
    };

    const NameColumnValue = (rowData) => {
        return rowData.name;
    };

    const HexaColumValue = (rowData) => {
        return rowData.hexaCode;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div
                className="actions"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => openEditDialogue(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning mr-2"
                    onClick={() => OpenDeleteDialogue(rowData)}
                />
            </div>
        );
    };

    const header = (
        // here you can filter using NodeServerApi
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    />
                    {Item && addDialogue && (
                        <AddColor
                            open={addDialogue}
                            handleClose={handleClose}
                            title="Add New Color"
                            initItem={Item}
                        />
                    )}
                    {Item && deleteDialog && (
                        <DelColor
                            open={deleteDialog}
                            handleClose={handleClose}
                            title={`Are you sure to delete the color "${Item.name}"`}
                            initItem={Item}
                        />
                    )}
                    <DataTable
                        ref={dt}
                        value={colors}
                        dataKey="_id"
                        className="datatable-responsive"
                        globalFilter={globalFilter}
                        emptyMessage="No Color found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column header="Color" body={ColorColumnValue} />
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            body={NameColumnValue}
                        />
                        <Column
                            field="description"
                            header="Hexa Code"
                            body={HexaColumValue}
                            sortable
                        />
                        <Column body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default GestColors;
