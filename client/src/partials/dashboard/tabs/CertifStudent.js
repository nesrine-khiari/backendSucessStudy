import React, { useState, useEffect } from "react";
import { Check, UploadCloud, File, FileText, Trash2, X } from "react-feather";
import { Col, Row } from "reactstrap";
// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
// ** styles
import "../../../assets/styles/StudentSubmission.css";
import "../../../assets/styles/TransactionsTable.css";
import { useDispatch, useSelector } from "react-redux";
import { SendCertif } from "../../../redux/university/university.actions";
import FileInput from "../../../components/FileInput";
import { notificationGet } from "../../../custom/instance";
import { useMutation } from "@tanstack/react-query";
import { socket } from "../../../functions/socket.io";
import { ProgressBar } from "react-bootstrap";
import { uploadProgress } from "../../../redux/uploads/uplaodAction";
import { useTranslation } from "react-i18next";
// import { GetDemandsByIdUniv } from "../../../redux/university/university.actions";
// ** ==>
function CertifStudent({ dem, SetOneDemand, SetSubmittion, univer }) {
  const dispatch = useDispatch();

  const [certif, setCertif] = useState({ certif: null });

  const backToDash = () => {
    SetOneDemand(null);
    SetSubmittion(true);
  };
  const notifMutation = useMutation(notificationGet);

  const Handle_SendCertif = () => {
    if (!certif.certif) {
      toast.error("upload a file please");
      return;
    }
    const data = {
      object: "Certification",
      file: certif.certif,
      email: dem.User.email,
      demand_id: dem._id,
    };
    dispatch(SendCertif(data, backToDash));
    let notification = {
      idOwnerUniv: univer.id,
      receiversUser: dem?.User._id,
      email: dem?.User.email,
      content:
        "Félicitation " +
        univer?.fullname +
        " vous a envoyé votre attestation d'inscrirption via votre Email",
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
    // dispatch(ChangeDemandeStatus(dem, "verfie", backToDash));
  };
  const { progress } = useSelector((state) => state.upload);

  const [progBar, setprogBar] = useState(false);

  useEffect(() => {
    if (progress == 100) {
      dispatch(uploadProgress(0));
    } else if (progress == 0) {
      setprogBar(false);
    } else {
      setprogBar(true);
    }
  }, [progress]);

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

      <p className="typo text-capitalize title_second">{t("certif.add")}</p>
      <FileInput value={certif.certif} setFile={setCertif} name="certif" />

      <Row>
        <Col md={6} xs={12} className="d-flex gap-3 align-items-center">
          <button
            disabled={progBar}
            className="btn btn-info w-100 title_second student_submit_btn"
            onClick={Handle_SendCertif}
          >
            {t("certif.env")}
          </button>
          <button
            className="btn btn-danger w-100 title_second student_submit_btn"
            onClick={backToDash}
          >
            {t("certif.ann")}
          </button>
        </Col>
      </Row>
      {progBar && <ProgressBar now={progress} />}
    </div>
  );
}

export default CertifStudent;
