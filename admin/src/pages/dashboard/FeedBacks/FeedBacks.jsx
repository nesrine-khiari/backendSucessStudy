import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { GetAllFeedbacks } from "../../../redux/feedbacks/feedbacks.actions";
import { init_feedbacks } from "../../../redux/feedbacks/feedbacks.reducer";

import Pagination from "../../../MyComponents/Pagination/Pagination";

import DelFeedback from "./popups/DelFeedback";
import ShowUser from "./popups/ShowUser";
import SendMail from "./popups/SendMail";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";

const init_filter = {
  // email:"",
  pays: "",
  suspended: "",
  verified: "",
};

const FeedBacks = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.feedbacksReducer.feedbacks);

  const [Item, setItem] = useState({ ...init_feedbacks });

  //-------------------------------- Pagin & Filter --------------------------------------------
  const [page, setPage] = useState({ p: 0, l: 10 });
  const max = 10;

  const [Filter, setFilter] = useState({ ...init_filter });
  //-------------------------------- Dialog States --------------------------------------------
  const [suppDialogue, setSuppDialog] = useState(false);
  const [shoSDialogue, setShoSDialog] = useState(false);
  const [updDialogue, setUpdtDialog] = useState(false);

  //-------------------------------- Get Data --------------------------------------------
  const reloadData = () => {
    dispatch(GetAllFeedbacks());
  };

  useEffect(() => {
    reloadData();
  }, [Filter]);

  useEffect(() => {
    console.log(feedbacks);
  }, [feedbacks]);
  //-------------------------------- Handle Opens -------------------------------

  const openUpdtDialogue = (row) => {
    setUpdtDialog(true);
    setItem({ ...row });
  };
  const openSuppDialogue = (row) => {
    setSuppDialog(true);
    setItem({ ...row });
  };

  const openShoSDialogue = (row) => {
    setShoSDialog(true);
    setItem({ ...row });
  };

  //-------------------------------- Handle Close -------------------------------
  const handleClose = () => {
    setItem({ ...init_feedbacks });
    setSuppDialog(false);
    setShoSDialog(false);
    setUpdtDialog(false);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage Feedbaks</h5>
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

  const ShowMain = ({ row }) => {
    return (
      <div className=" flex ">
        <AvatarComponent
          src={null}
          circle={true}
          name={row?.User?.firstName || "N"}
          lastname={row?.User?.lastName || "N"}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">{`${row?.User?.firstName || "N"} ${
            row?.User?.lastName || "N"
          }`}</span>
          <span className=" text-600 ">{row?.User?.email}</span>
        </div>
      </div>
    );
  };

  const ActionBodyTemplate = ({ row }) => {
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
          icon="pi pi-envelope"
          tooltip="Send Mail To User"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-info mr-0"
          onClick={() => openUpdtDialogue(row)}
        />
        <Button
          icon="pi pi-user"
          tooltip="View User"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-help mr-0"
          onClick={() => openShoSDialogue(row)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Delete Feedback"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-danger mr-0"
          onClick={() => openSuppDialogue(row)}
        />
      </div>
    );
  };

  const ShowFeedBack = ({ row }) => {
    return (
      <div className="col-12 xl:col-4 lg:col-4 md:col-6 sm:col-12 xs:col-12">
        <div
          className="card flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <div>
            <ShowMain row={row} />
            <p className="pt-2 mb-0 text-justify">
              <strong>“</strong>
              {row.comment}
              <strong>”</strong>
            </p>
          </div>
          <ActionBodyTemplate row={row} />
        </div>
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
          <FilterComp init_filter={init_filter} setFilter={setFilter} />

          {Item && updDialogue && (
            <SendMail
              open={updDialogue}
              handleClose={handleClose}
              value={Item.User}
              title={`Send Mail To ${Item.firstName} ${Item.lastName}`}
            />
          )}

          {Item && suppDialogue && (
            <DelFeedback
              open={suppDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Delete Feedback `}
            />
          )}

          {Item && shoSDialogue && (
            <ShowUser
              open={shoSDialogue}
              handleClose={handleClose}
              value={Item.User}
              title={`User ${Item.User.firstName} ${Item.User.lastName}`}
            />
          )}
        </div>
        <div className="grid pb-2">
          {feedbacks.map((row, index) => {
            return <ShowFeedBack key={index} row={row} />;
          })}
        </div>

        <Pagination max={max} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default FeedBacks;
