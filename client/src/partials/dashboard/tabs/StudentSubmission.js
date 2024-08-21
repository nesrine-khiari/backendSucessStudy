import React, { useState, useEffect } from "react";
import { Check, DownloadCloud, File, FileText, Trash2, X } from "react-feather";
import { Col, Row } from "reactstrap";
// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
// ** styles

import "../../../assets/styles/StudentSubmission.css";
import "../../../assets/styles/TransactionsTable.css";
import back from "../../../assets/images/back.svg";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDemandeStatus } from "../../../redux/university/university.actions";
import { socket } from "../../../functions/socket.io";
import axios from "axios";
import customAxios from "../../../custom/axios";
import instance, { notificationGet } from "../../../custom/instance";
import { useMutation } from "@tanstack/react-query";
import { GetUserByToken } from "../../../redux/user/user.actions";
import { useTranslation } from "react-i18next";
// import { GetDemandsByIdUniv } from "../../../redux/university/university.actions";
// ** ==>
function StudentSubmission({ dem, SetOneDemand, SetSubmittion, univer }) {
  const dispatch = useDispatch();
  const [motif, setMotif] = useState("");
  const [refuser, setRefuser] = useState(false);

  const backToDash = () => {
    SetOneDemand(null);
    SetSubmittion(true);
  };
  const notifMutation = useMutation(notificationGet);

  const AcceptDemande = async () => {
    toast.success("L'attestation a été bien envoyer !");
    dispatch(ChangeDemandeStatus(dem, "verfie", "verfie", backToDash));
    let notification = {
      idOwnerUniv: univer.id,
      receiversUser: dem?.User._id,
      email: dem?.User.email,
      content:
        "" + univer?.fullname + " a accepter votre demande d'inscription",
      type: "soumission",
      send_date: Date.now(),
      status: true,
    };

    notifMutation.mutate(notification, {
      onSuccess: async (dataUser) => {},
      onError: (err) => {},
    });

    socket.emit("newnotif", {
      notification,
    });
  };

  const RefuseDemande = () => {
    toast.success("Demande a été bien refusée !");
    let notification = {
      idOwnerUniv: univer.id,
      receiversUser: dem?.User._id,
      email: dem?.User.email,
      content: "" + univer?.fullname + " a refuser votre demande d'inscription",
      type: "soumission",
      send_date: Date.now(),
      status: false,
    };
    dispatch(ChangeDemandeStatus(dem, motif, "refuse", backToDash));

    notifMutation.mutate(notification, {
      onSuccess: async (dataUser) => {},
      onError: (err) => {},
    });

    socket.emit("newnotif", {
      notification,
    });
  };

  const { t } = useTranslation();

  return (
    <div className="submission_container">
      <h5 className="color_second title_second student_id_title">
        Soumission ( ID : {dem._id} )
      </h5>
      <div className="pos-back-dash" onClick={backToDash}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={38}
          height={38}
        >
          <path
            fill="#ffb703"
            d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"
          />
        </svg>
      </div>

      <p className="section_title_style text-capitalize title_second pt-2 mt-5">
        {t("user.user")}
      </p>
      <p className="type_name_3 title_second mb-3 pt-2 color_main">
        {dem.User.firstName} {dem.User.lastName}
      </p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3 ">
        {t("user.email")}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">{dem.User.email}</p>

      <p className="section_title_style text-capitalize title_second pt-2 mb-3">
        {t("user.pays")}
      </p>

      <p className="type_name_3 pt-2 mb-3 color_main">
        <Check size={25} className="type_name color_second me-4 color_main" />
        {dem.User.pays}
      </p>

      <p className="typo text-capitalize title_second">{t("certif.rel")}</p>

      <div className="mt-3 mb-5">
        <div className="input_file py-2">
          <a target="_blank" href={dem.releveDeNote} download>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-2 ps-3">
                <FileText size={25} className="me-2 color_second" />
                <p className="file_name_text color_main title_second pt-2">
                  {t("certif.rel")}
                </p>
              </div>
              <div className="d-flex mt-1 ps-3 pe-4">
                <button className="btn">
                  <DownloadCloud size={25} className="color_main me-1" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>

      <p className="typo text-capitalize title_second">
        {t("certif.cv")} <span className="color_second">*</span>
      </p>

      <div className="mt-3 mb-5">
        <div className="input_file py-2">
          <a target="_blank" href={dem.CV} download>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-2 ps-3">
                <FileText size={25} className="me-2 color_second" />
                <p className="file_name_text color_main title_second pt-2">
                  {t("certif.cv")}
                </p>
              </div>
              <div className="d-flex mt-1 ps-3 pe-4">
                <button className="btn">
                  <DownloadCloud size={25} className="color_main me-1" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>

      <p className="typo text-capitalize title_second">{t("certif.dip")}</p>

      <div className="mt-3 mb-5">
        <div className="input_file py-2">
          <a target="_blank" href={dem.diplome} download>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-2 ps-3">
                <FileText size={25} className="me-2 color_second" />
                <p className="file_name_text color_main title_second pt-2">
                  {t("certif.dip")}
                </p>
              </div>
              <div className="d-flex mt-1 ps-3 pe-4">
                <button className="btn">
                  <DownloadCloud size={25} className="color_main me-1" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>

      <p className="typo text-capitalize title_second">{t("certif.lm")}</p>

      <div className="mt-3 mb-5">
        <div className="input_file py-2">
          <a target="_blank" href={dem.motivation} download>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-2 ps-3">
                <FileText size={25} className="me-2 color_second" />
                <p className="file_name_text color_main title_second pt-2">
                  {t("certif.lm")}
                </p>
              </div>
              <div className="d-flex mt-1 ps-3 pe-4">
                <button className="btn">
                  <DownloadCloud size={25} className="color_main me-1" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>

      <p className="typo text-capitalize title_second">{t("certif.pass")}</p>

      <div className="mt-3 mb-5">
        <div className="input_file py-2">
          <a target="_blank" href={dem.passeport} download>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-2 ps-3">
                <FileText size={25} className="me-2 color_second" />
                <p className="file_name_text color_main title_second pt-2">
                  {t("certif.pass")}
                </p>
              </div>
              <div className="d-flex mt-1 ps-3 pe-4">
                <button className="btn">
                  <DownloadCloud size={25} className="color_main me-1" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
      {dem?.final_certif?.length === 0 || dem?.statut != "verfie" ? (
        <>
          <Row>
            <Col md={6} xs={12} className="d-flex gap-3 align-items-center">
              <button
                className="btn btn-success w-100 title_second student_submit_btn"
                onClick={AcceptDemande}
              >
                {t("certif.app")}
              </button>
              <button
                className="btn btn-danger w-100 title_second student_submit_btn"
                onClick={(e) => setRefuser(true)}
              >
                {t("certif.ref")}
              </button>
            </Col>
          </Row>
          {refuser && (
            <>
              <Row>
                <Col md={6} xs={12} className=" mt-4">
                  <textarea
                    className="signup_input border_left form-control"
                    style={{ resize: "none", background: "" }}
                    rows={5}
                    onChange={(e) => setMotif(e.target.value)}
                    placeholder="Ecrire le motif de refus..."
                  ></textarea>
                </Col>
              </Row>
              <Row>
                <Col
                  md={6}
                  xs={12}
                  className="d-flex gap-3 align-items-center mt-4"
                >
                  <button
                    className="btn btn-success w-100 title_second student_submit_btn"
                    onClick={(e) => setRefuser(false)}
                  >
                    {t("certif.ann")}
                  </button>
                  <button
                    className="btn btn-danger w-100 title_second student_submit_btn"
                    onClick={RefuseDemande}
                  >
                    {t("certif.env")}
                  </button>
                </Col>
              </Row>
            </>
          )}
        </>
      ) : (
        <Row>
          <Col md={6} xs={12} className="d-flex gap-3 align-items-center">
            <div
              className="alert alert-warning"
              style={{ width: "100%", fontSize: "16px" }}
            >
              {dem.User.firstName + " " + dem.User.lastName} {t("certif.msg")}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default StudentSubmission;
