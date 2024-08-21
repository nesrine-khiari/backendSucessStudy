import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetAllStudents } from "../../../redux/students/student.actions";
import { GetRibs } from "../../../redux/bills/bills.actions";
import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";

import UpdateBill from "./popups/UpdateBill";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";

import { init_student } from "../../../redux/students/student.reducer";

import { normalizeUnits } from "moment";

const init_filter = {
  status: ""
};
const init_bill = {
  montant: "",
  recu: "",
  user: {
    firstName: "",
    lastname: "",
    tel: ""
  },
  formation: {
    nom: ""
  }
}

const Bills = () => {
  const bills = useSelector((state) => state.BillsReducer.bills);
  const dispatch = useDispatch();
  const histo = useHistory();

  const [Item, setItem] = useState({ ...init_bill });

  //-------------------------------- Pagin & Filter --------------------------------------------
  const [page, setPage] = useState({ p: 0, l: 10 });
  const max = 10;

  const [Filter, setFilter] = useState({ ...init_filter });
  //-------------------------------- Dialog States --------------------------------------------
  const [blockDialog, setBlockDialog] = useState(false);
  const [suppDialogue, setSuppDialog] = useState(false);
  const [shoSDialogue, setShoSDialog] = useState(false);
  const [updDialogue, setUpdtDialog] = useState(false);
  const dt = useRef(null);

  //-------------------------------- Get Data --------------------------------------------
  const query = { ...Filter }
  const reloadData = () => {
    dispatch(GetRibs(query));
    console.log("--------------Bills", bills);
  };

  useEffect(() => {
    console.log("--------------filter", Filter);
    reloadData();
  }, [Filter]);
  //-------------------------------- Handle Opens -------------------------------

  const openBlockDialogue = (row) => {
    setBlockDialog(true);
    setItem({ ...row });
  };
  const openSuppDialogue = (row) => {
    setSuppDialog(true);
    setItem({ ...row });
  };
  const openUpdtDialogue = (row) => {
    setUpdtDialog(true);
    setItem({ ...row });
  };
  const openShoSDialogue = (row) => {
    setShoSDialog(true);
    setItem({ ...row });
  };

  //-------------------------------- Handle Close -------------------------------
  const handleClose = () => {
    setItem({ ...init_bill });
    setBlockDialog(false);
    setSuppDialog(false);
    setShoSDialog(false);
    setUpdtDialog(false);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage bills</h5>
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
        <AvatarComponent
          src={null}
          circle={true}
          name={row?.firstName || "N"}
          lastname={row?.lastName || "N"}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">{`${row?.firstName || "N"} ${row?.lastName || "N"
            }`}</span>
          <span className=" text-600 ">{row.email}</span>
        </div>
      </div>
    );
  };

  const username = (row) => {
    return `${row?.user[0].firstName + " " + row?.user[0].lastName}`;
  };

  const formationNom = (row) => {
    return row?.formation[0].nom;
  };
  const montant = (row) => {
    return row?.montant;
  }
  const IsCompleted = (row) => {
    let color = "";
    let text = "";
    if (row?.status === "complete") {
      color = "green"
      text = "Completed"
    }
    else if (row.status === "not_complete") {
      color = "orange"
      text = "Not Completed"
    }
    else if (row.status === "fail") {
      color = "red"
      text = "Failed"
    }

    return <Badge type={color}>{text}</Badge>;
  };

  const recu = (row) => {
    if (row?.recu) {
      return (<a href={row?.recu} target="_blank">Reçu</a>)
    }
    return "Reçu non encore envoyé";
  };

  const actionBodyTemplate = (row) => {
    return (
      <div
        className="actions"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          icon="pi pi-pencil"
          tooltip="Update Status"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-info mr-0"
          onClick={() => openUpdtDialogue(row)}
        />
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

          {Item && updDialogue && (
            <UpdateBill
              open={updDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Updating Bill status`}
            />
          )}





          <DataTable
            ref={dt}
            value={[...bills]}
            dataKey="_id"
            className="datatable-responsive"
            emptyMessage="No Bill found."
            header={
              <FilterComp init_filter={init_filter} setFilter={setFilter} />
            }
            responsiveLayout="scroll"
          >
            <Column
              field="username"
              header="User"
              body={username}
            />
            <Column field="formation" header="Formation" body={formationNom} />
            <Column field="completed" header="Status" body={IsCompleted} />
            <Column field="montant" header="Montant" body={montant} />
            <Column field="Recu" header="Recu" body={recu} />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={max} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Bills;
