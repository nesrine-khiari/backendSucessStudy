import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetAllUnivs } from "../../../redux/university/university.actions";

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

import { InitialState } from "../../../redux/university/university.reducer";

const init_filter = {
  pays: "",
  approved: "",
  nom: "",
};

const GestUnivs = () => {
  let emptyItem = { ...InitialState };

  const univs = useSelector((state) => state.UniversityReducer.universitys);
  const dispatch = useDispatch();
  const histo = useHistory();

  const [Item, setItem] = useState(emptyItem);

  //-------------------------------- Pagin & Filter --------------------------------------------
  const [page, setPage] = useState({ p: 0, l: 10 });
  const max = 10;

  const [Filter, setFilter] = useState({ ...init_filter });
  //-------------------------------- Dialog States --------------------------------------------
  const [addDialogue, setAddDialog] = useState(false);
  const [updDialogue, setUpdDialog] = useState(false);
  const [suppDialogue, setSuppDialog] = useState(false);
  const [appDialogue, setAppDialog] = useState(false);
  const [shoMDialogue, setShoMDialog] = useState(false);

  const [addMDialogue, setAddMDialog] = useState(false);

  const dt = useRef(null);

  //-------------------------------- Get Data --------------------------------------------
  const reloadData = () => {
    dispatch(GetAllUnivs(Filter));
  };

  useEffect(() => {
    reloadData();
  }, [Filter]);
  //-------------------------------- Handle Opens -------------------------------

  const openAddDialogue = () => {
    setAddDialog(true);
  };
  const openUpdDialogue = (row) => {
    setUpdDialog(true);
    setItem({ ...row });
  };
  const openSuppDialogue = (row) => {
    setSuppDialog(true);
    setItem({ ...row });
  };
  const openAppDialogue = (row) => {
    setAppDialog(true);
    setItem({ ...row });
  };
  const openAddMDialogue = (row) => {
    setAddMDialog(true);
    setItem({ ...row });
  };
  const openShoMDialogue = (row) => {
    setShoMDialog(true);
    setItem({ ...row });
  };

  //-------------------------------- Handle Close -------------------------------
  const handleClose = () => {
    setItem({ ...emptyItem });
    setAddDialog(false);
    setUpdDialog(false);
    setSuppDialog(false);
    setAddMDialog(false);
    setShoMDialog(false);
    setAppDialog(false);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage Universities</h5>
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

          <Button
            label="New"
            icon="pi pi-plus"
            tooltip="Reload Data"
            tooltipOptions={{ position: "bottom" }}
            className="p-button-primary mr-2"
            onClick={openAddDialogue}
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
          src={`${row.logo}`}
          name={row.nom[0]}
          lastname={row.nom[1]}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">{`${row.nom}`}</span>
          <span className=" text-600 ">
            {row.fullname.length > 10
              ? row.fullname.substr(0, 37) + "..."
              : row.fullname}
          </span>
        </div>
      </div>
    );
  };

  const PhoneColumnValue = (row) => {
    return `${row?.tel}`;
  };

  const Pays = (row) => {
    return row?.pays ? row?.pays?.toUpperCase() : "Not available";
  };

  const IsApproved = (row) => {
    const color = row?.approved ? "green" : "red";
    const text = row?.approved ? "Approved" : "Not Approved";
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
        {!row.approved && (
          <Button
            icon="pi pi-check-square"
            tooltip="Approve University"
            tooltipOptions={{ position: "bottom" }}
            className="p-button-rounded p-button-text p-button-success mr-0"
            onClick={() => openAppDialogue(row)}
          />
        )}
        {row.numOfManagers === 0 ? (
          <Button
            icon="pi pi-user-plus"
            tooltip="Add Manager"
            tooltipOptions={{ position: "bottom" }}
            className="p-button-rounded p-button-text p-button-success mr-0"
            onClick={() => openAddMDialogue(row)}
          />
        ) : (
          <Button
            icon="pi pi-user"
            tooltip="View Manager"
            tooltipOptions={{ position: "bottom" }}
            className="p-button-rounded p-button-text p-button-help mr-0"
            onClick={() => openShoMDialogue(row)}
          />
        )}

        <Button
          icon="pi pi-pencil"
          tooltip="Edit University"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-info mr-0"
          onClick={() => openUpdDialogue(row)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Delete University"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-warning mr-0"
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
          {Item && addDialogue && (
            <AddUniv
              open={addDialogue}
              handleClose={handleClose}
              title="Add New University"
            />
          )}

          {Item && updDialogue && (
            <UpdateUniv
              open={updDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Updating the university ${Item.nom}`}
            />
          )}

          {Item && suppDialogue && (
            <DelUniv
              open={suppDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Delete the university ${Item.nom}`}
            />
          )}

          {Item && appDialogue && (
            <ApproveUniv
              open={appDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Approve the university ${Item.nom}`}
            />
          )}

          {Item && addMDialogue && (
            <AddManager
              open={addMDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Add Manager of the university ${Item.nom}`}
            />
          )}

          {Item && shoMDialogue && (
            <ShowManager
              open={shoMDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Manager of the university ${Item.nom}`}
            />
          )}

          <DataTable
            ref={dt}
            value={[...univs]}
            dataKey="_id"
            className="datatable-responsive"
            emptyMessage="No university found."
            header={
              <FilterComp init_filter={init_filter} setFilter={setFilter} />
            }
            responsiveLayout="scroll"
          >
            <Column header="Logo" body={ShowMain} />
            <Column
              field="phoneNumber"
              header="Phone Number"
              body={PhoneColumnValue}
            />
            <Column field="pays" header="Pays" body={Pays} />
            <Column field="suspended" header="Status" body={IsApproved} />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={max} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default GestUnivs;
