import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetAllStudents } from "../../../redux/students/student.actions";

import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";

import BlockStudent from "./popups/BlockStudent";
import DelStudent from "./popups/DelStudent";
import ShowStudent from "./popups/ShowStudent";
import UpdateStudent from "./popups/UpdateStudent";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";

import { init_student } from "../../../redux/students/student.reducer";

const init_filter = {
  // email:"",
  pays: "",
  suspended: "",
  verified: "",
};

const GestStudents = () => {
  const students = useSelector((state) => state.StudentReducer.students);
  const dispatch = useDispatch();
  const histo = useHistory();

  const [Item, setItem] = useState({ ...init_student });

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
  const reloadData = () => {
    dispatch(GetAllStudents(Filter));
  };

  useEffect(() => {
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
    setItem({ ...init_student });
    setBlockDialog(false);
    setSuppDialog(false);
    setShoSDialog(false);
    setUpdtDialog(false);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage Students</h5>
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
          <span className=" font-semibold ">{`${row?.firstName || "N"} ${
            row?.lastName || "N"
          }`}</span>
          <span className=" text-600 ">{row.email}</span>
        </div>
      </div>
    );
  };

  const PhoneColumnValue = (row) => {
    return `${row?.tel}`;
  };

  const Pays = (row) => {
    return row?.pays ? row?.pays?.toUpperCase() : "Not Available";
  };

  const IsSuspended = (row) => {
    const color = row?.suspended ? "red" : "green";
    const text = row?.suspended ? "Susp" : "Not Susp";
    return <Badge type={color}>{text}</Badge>;
  };

  const isVerified = (row) => {
    const color = row?.verified ? "green" : "red";
    const text = row?.verified ? "Verif" : "Not Verif";
    return <Badge type={color}>{text}</Badge>;
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
          icon="pi pi-ban"
          tooltip="Block Unblock"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-warning mr-0"
          onClick={() => openBlockDialogue(row)}
        />
        <Button
          icon="pi pi-pencil"
          tooltip="Update Student"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-info mr-0"
          onClick={() => openUpdtDialogue(row)}
        />
        <Button
          icon="pi pi-user"
          tooltip="View Student"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-help mr-0"
          onClick={() => openShoSDialogue(row)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Delete Student"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-danger mr-0"
          onClick={() => openSuppDialogue(row)}
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

          {Item && blockDialog && (
            <BlockStudent
              open={blockDialog}
              handleClose={handleClose}
              value={Item}
              title={`Block/Unblock Student ${Item.firstName} ${Item.lastName}`}
            />
          )}

          {Item && updDialogue && (
            <UpdateStudent
              open={updDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Updating Student ${Item.firstName} ${Item.lastName}`}
            />
          )}

          {Item && suppDialogue && (
            <DelStudent
              open={suppDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Delete the student ${Item.firstName} ${Item.lastName}`}
            />
          )}

          {Item && shoSDialogue && (
            <ShowStudent
              open={shoSDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Student ${Item.firstName} ${Item.lastName}`}
            />
          )}

          <DataTable
            ref={dt}
            value={[...students]}
            dataKey="_id"
            className="datatable-responsive"
            emptyMessage="No Student found."
            header={
              <FilterComp init_filter={init_filter} setFilter={setFilter} />
            }
            responsiveLayout="scroll"
          >
            <Column header="Student" body={ShowMain} />
            <Column
              field="phoneNumber"
              header="Phone Number"
              body={PhoneColumnValue}
            />
            <Column field="pays" header="Pays" body={Pays} />
            <Column field="suspended" header="Status" body={IsSuspended} />
            <Column field="verified" header="Verified" body={isVerified} />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={max} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default GestStudents;
