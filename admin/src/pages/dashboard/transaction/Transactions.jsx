import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Gettransactions } from "../../../redux/transaction/transaction.actions";
import OpenDescription from "../../../layouts/OpenDescription";
import FilterComp from "./Filter";

import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";



const Transactions = () => {
    const transactions = useSelector((state) => state.TransactionReducer.transactions);
    const dispatch = useDispatch();
    const histo = useHistory();

    const init_filter = {
        nom: ""
    };
    //-------------------------------- Pagin & Filter --------------------------------------------
    const [page, setPage] = useState({ p: 0, l: 10 });
    const max = 10;

    ;
    //-------------------------------- Dialog States --------------------------------------------
    const [updDialogue, setUpdDialog] = useState(false);

    const dt = useRef(null);
    const [Filter, setFilter] = useState({ ...init_filter });
    //-------------------------------- Get Data --------------------------------------------
    const query = { ...Filter, ...page }
    const reloadData = async () => {
        await dispatch(Gettransactions(query));
        console.log("--------------Transaction", transactions);
    };
    useEffect(() => {
        reloadData();
        console.log(query)
    }, [Filter]);
    //-------------------------------- Handle Opens -------------------------------



    //-------------------------------- Handle Close -------------------------------


    //-------------------------------- Header of Page -------------------------------

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h5 className="m-0 mr-2">Transaction</h5>
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

    const OrderColumnValue = (row) => {
        return `${row?.orderid}`;
    };
    const amountColumnValue = (row) => {
        return `${row?.amount}`;
    };
    const ClientColumnValue = (row) => {
        return `${row?.client.email}`;
    };
    const form = (row) => {
        return row.formation.nom;
    };

    const status = (row) => {
        const color = row?.status == "completed" ? "green" : "red";
        const text = row.status == "completed" ? "Completed" : "Failed";
        return <Badge type={color}>{text}</Badge>;
    };
    console.log("transactions", transactions);
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    />
                    {transactions.length > 0 ? (
                        <DataTable
                            ref={dt}
                            dataKey="_id"
                            value={[...transactions]}
                            className="datatable-responsive"
                            emptyMessage="No university found."
                            header={
                                <FilterComp init_filter={init_filter} setFilter={setFilter} />
                            }
                            responsiveLayout="scroll"
                        >
                            <Column
                                field="orderid"
                                header="orderid"
                                body={OrderColumnValue}
                            />
                            <Column
                                field="client"
                                header="client"
                                body={ClientColumnValue}
                            />
                            <Column field="formation" header="formation" body={form} />
                            <Column field="amount" header="amount" body={amountColumnValue} />
                            <Column field="status" header="status" body={status} />
                        </DataTable>

                    ) : (
                        <p>No transactions available.</p>
                    )}

                    <Pagination max={max} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
};

export default Transactions;
