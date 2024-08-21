import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Getformations } from "../../../redux/university/university.actions";
import OpenDescription from "../../../layouts/OpenDescription";

import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";

import AddUniv from "./popups/AddUniv";
import UpdateUniv from "./popups/UpdateUniv";
import DelUniv from "./popups/DelUniv";
import ApproveUniv from "./popups/ApproveUniv";
import AddManager from "./popups/AddManager";
import ShowManager from "./popups/ShowManager";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";
const init_filter = {
    nom: "",
};
const initial = {
    nom: "",
    description: "",
    price: "",
    duree: 0,
    avecBac: false,
    universite: {
        nom: "",
        _id: "",
        fullname: "",
        logo: "",
        description: "",
        long_desc: "",
        pays: "",
        address: "",
        tel: "",
        OrganMere: "",
        approved: true,
        cover: ""
    },
}

const Formations = () => {
    let emptyItem = { ...initial };
    const formations = useSelector((state) => state.FormationReducer.formations);
    const dispatch = useDispatch();
    const histo = useHistory();

    const [Item, setItem] = useState(emptyItem);

    //-------------------------------- Pagin & Filter --------------------------------------------
    const [page, setPage] = useState({ p: 0, l: 10 });
    const max = 10;

    const [Filter, setFilter] = useState({ ...init_filter });
    //-------------------------------- Dialog States --------------------------------------------
    const [updDialogue, setUpdDialog] = useState(false);
    const openUpdDialogue = (row) => {
        setUpdDialog(true);
        setItem({ ...row });
    };
    const handleClose = () => {
        setUpdDialog(false);
        setItem({});
    };
    const dt = useRef(null);

    //-------------------------------- Get Data --------------------------------------------
    const reloadData = () => {
        dispatch(Getformations({ ...Filter, ...page }));
        console.log("--------------------------formationssss", formations);
    };


    useEffect(() => {
        reloadData();
    }, [Filter, page]);
    //-------------------------------- Handle Opens -------------------------------



    //-------------------------------- Handle Close -------------------------------


    //-------------------------------- Header of Page -------------------------------

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h5 className="m-0 mr-2">Formations</h5>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        icon="pi pi-refresh"
                        className="p-button-primary mr-2"
                        onClick={reloadData}
                    />
                </div>
            </React.Fragment>
        );
    };

    //------------------------------------------- COLUMNS VALUES ----------------------------------------------

    const ShowMain = (row) => {
        return (
            <div className=" flex ">
                <div className=" flex flex-column justify-content-center ml-2  ">
                    <span className=" font-semibold ">{`${row.nom}`}</span>
                    {/*    <span className=" text-600 ">
                        {row.fullname.length > 10
                            ? row.fullname.substr(0, 37) + "..."
                            : row.fullname}
                    </span> */}
                </div>
            </div>
        );
    };

    const PriceColumnValue = (row) => {
        return `${row?.price}`;
    };
    const PaysColumnValue = (row) => {
        return `${row?.Universite.pays}`;
    };
    const DeviseColumnValue = (row) => {
        return `${row?.devise}`;
    };
    const uni = (row) => {
        return row.Universite.nom ? row.Universite.nom.toUpperCase() : "Not available";
    };

    const AvecBac = (row) => {
        const color = row?.avecBac ? "green" : "red";
        const text = row.avecBac ? "oui" : "Non";
        return <Badge type={color}>{text}</Badge>;
    };
    const description = (row) => {
        return (<div className="d-flex align-items-center justify-content-center">
            <p style={{ fontSize: "14px" }}>{"Read Description"}</p>
            <button
                type="button"
                className="btn btn-outline-primary position-relative p-3 rounded-0 border-0"
                onClick={() => openUpdDialogue(row)}
                style={{ borderColor: '#4e86e4', color: '#4e86e4' }}
            >
                <i className="fas fa-edit fa-2x" style={{ color: '#4e86e4' }}></i>
            </button>
        </div>
        );
    };
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    />
                    <DataTable
                        ref={dt}
                        dataKey="_id"
                        value={[...formations]}
                        className="datatable-responsive"
                        emptyMessage="No university found."
                        header={
                            <FilterComp init_filter={init_filter} setFilter={setFilter} />
                        }
                        responsiveLayout="scroll"
                    >
                        <Column header="Name" body={ShowMain} />
                        <Column
                            field="price"
                            header="Price"
                            body={PriceColumnValue}
                        />
                        <Column
                            field="devise"
                            header="devise"
                            body={DeviseColumnValue}
                        />
                        <Column field="universite" header="universite" body={uni} />
                        <Column field="pays" header="Pays" body={PaysColumnValue} />
                        <Column field="avecBac" header="AvecBac" body={AvecBac} />

                        <Column field="Description" header="Description" body={description} />
                    </DataTable>
                    {updDialogue &&
                        < OpenDescription
                            open={updDialogue}
                            title={Item.nom}
                            value={Item}
                            handleClose={handleClose}
                            description={Item.description}
                        />
                    }
                    <Pagination max={max} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
};

export default Formations;
