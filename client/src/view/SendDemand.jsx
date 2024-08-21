import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfileDocs } from "../redux/user/user.actions";
import {
  GetDemandsByIdUniv,
  GetFormasByIdUniv,
  GetOneUniv,
  SendDemand,
} from "../redux/university/university.actions";
import { GetFormationById } from "../redux/formation/formation.actions"
import { Check, DownloadCloud, File, Trash } from "react-feather";
import { Row } from "reactstrap";
// ** Third Party Imports
import { useDropzone } from "react-dropzone";
// ** Parts
import AuthNavBar from "../partials/header/AuthNavBar";
// ** assets
import student_in_france from "../assets/images/student_in_france.webp";
// ** styles
import "../assets/styles/StudentSubmission.css";
import "../assets/styles/DropZone.css";
import Footer from "./../partials/footer/Footer";
import FileInput from "../components/FileInput";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdmin, notificationGet } from "../custom/instance";
import { socket } from "../functions/socket.io";
import { ProgressBar } from "react-bootstrap";
import { uploadProgress } from "../redux/uploads/uplaodAction";
import { useTranslation } from "react-i18next";
// ** ==>
const translations = {
  fr: {
    select_formation: "Sélectionner une formation",
    add_cv: "Ajouter votre CV",
    add_passport: "Ajouter votre passeport",
    add_diploma: "Ajouter votre diplôme",
    add_motivation: "Ajouter votre lettre de motivation",
    add_transcript: "Ajouter votre relevé de notes"
  },
  en: {
    select_formation: "Select a formation",
    add_cv: "Add your CV",
    add_passport: "Add your passport",
    add_diploma: "Add your diploma",
    add_motivation: "Add your motivation letter",
    add_transcript: "Add your transcript"
  }
};

function StudyInFranceAsStudent(props) {
  // ** states
  console.log(props);
  const user = useSelector((state) => state.UserReducer.user);
  const univ = useSelector((state) => state.UniversityReducer.selected_univ);
  const formas = useSelector((state) => state.FormationReducer.formations);
  const dispatch = useDispatch();
  const { iduniv, idforma } = useParams();

  const [formation, setformation] = useState(null);
  const [email, setemail] = useState(null);

  const [files, setFiles] = useState({
    CV: null,
    passeport: null,
    diplome: null,
    releveDeNote: null,
    motivation: null
  });

  useEffect(() => {
setformation(formas);
  }, [formas]);


  useEffect(() => {
    dispatch(GetOneUniv(iduniv));
    dispatch(GetFormationById(iduniv, idforma));
  }, [iduniv]);


  useEffect(() => {
    console.log("user is updated");
    if (user) {
      setFiles(prevFiles => ({
        ...prevFiles,
        CV: user.CV || prevFiles.CV,
        passeport: user.passeport || prevFiles.passeport,
        diplome: user.diplome || prevFiles.diplome,
        releveDeNote: user.releveDeNote || prevFiles.releveDeNote,
        motivation: user.motivation || prevFiles.motivation
      }));
    }
  }, [user]);
  



  const reset = () => {
    setFiles(prevFiles => ({
      ...prevFiles,
      CV: user.CV || prevFiles.CV,
      passeport: user.passeport || prevFiles.passeport,
      diplome: user.diplome || prevFiles.diplome,
      releveDeNote: user.releveDeNote || prevFiles.releveDeNote,
      motivation: user.motivation || prevFiles.motivation
    }));
  };
  const notifMutation = useMutation(notificationGet);

  useEffect(() => {
    if (iduniv)
      refetch()

  }, [iduniv])



  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    queryKey: ["getAdmin"],
    queryFn: async () => {
      const userIO = await getAdmin(iduniv);
      setemail(userIO)
      console.log(userIO);
      return userIO;

    },
    refetchOnWindowFocus: false, enabled: false
  });

  const SendDemandSubmittion = () => {
    
   if (!formation) {
      toast.error("Selectionner une formation");
      return;
    }

    if (!files.CV) {
      toast.error("Ajouter votre cv");
      return;
    }
    if (!files.passeport) {
      toast.error("Ajouter votre passeport");
      return;
    }
    if (!files.diplome) {
      toast.error("Ajouter votre diplome");
      return;
    }
    if (!files.motivation) {
      toast.error("Ajouter votre motivation");
      return;
    }
    if (!files.releveDeNote) {
      toast.error("Ajouter votre releve De Note");
      return;

    }

  
    dispatch(
      SendDemand({ univId: univ?.id, formId: formas._id }, files, reset)
    );
    console.log(email);

    let notification = {

      idOwnerUser: user?.id,
      receiversUniv: email?.data[0]?._id,
      email: email?.data[0].email,
      content: user?.firstName + " " + user?.lastName + " vous a envoyé une demande d'inscription.",
      type: "soumission",
      send_date: Date.now(),
      status: true

    }

    socket.emit('newnotif', {
      notification
    })
    notifMutation.mutate(notification, {
      onSuccess: async (dataUser) => {
        //       window.location.href="/"+univ.pays+"/"+iduniv
      },
      onError: (err) => {
      },
    });


  };


  const { progress } = useSelector((state) => state.upload);

  const [progBar, setprogBar] = useState(false)

  useEffect(() => {
    console.log(progress);
    if (progress == 100) {
      dispatch(uploadProgress(0))
    } else if (progress == 0) {

      setprogBar(false)
    } else {
      setprogBar(true)
    }
  }, [progress])

  const {t} = useTranslation()

  function getLastPart(inputString) {
  // Split the input string using either "/" or "\" as the delimiter
  const parts = inputString.split(/[\/\\]/);

  // Get the last part of the array
  const lastPart = parts.pop();

  return lastPart;
}

return (
  <>
      <AuthNavBar />
      <section className="h-auto position-relative">
        <img
          src={student_in_france}
          alt="discover our services"
          className="img-fluid"
        />
        <div className="page_title_containerss">
          <h3 className="discover_title text-white text-center title_main mb-3">
            {t("demand.study_as_foreign_student")}
          </h3>
          <h6 className="discover_sub_title text-white title_second mb-5 text-center">
            {t("demand.access_in_demand_degree_programs")}
          </h6>
        </div>
      </section>
      <div className="container_2">
        <h1 className="color_second title_main main_title mb-5">
          {t("demand.study_in_tunisia")}  {univ.pays}
        </h1>
        <div className="width_70">

          <p className="sub_title color_second third_title title_second pt-5 mt-5">
            {t("demand.form")}
          </p>
          <p className="typo text-capitalize title_second my-4">{t("demand.name")}</p>

          <p className="type_name title_second my-4">
            {user.firstName} {user.lastName}
          </p>

          <p className="typo text-capitalize title_second my-4">{t("demand.email")}</p>

          <p className="type_name_3 my-4 color_main">{user.email}</p>

          <p className="typo text-capitalize title_second my-4">{t("demand.country")}</p>

          <p className="type_name_3 my-4 color_main">
            <Check size={25} className="color_second me-4" />
            {univ.pays?.toUpperCase()}
          </p>
          <div className="dropdown w-100">
          <div className="text-center" style={{marginTop:"50px",marginBottom:"50px"}}>
    <h4 className="color_second mb-4 formation_title">
        {formas.nom}
    </h4>
</div>
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuLink"
            >
              <li
                key={formas._id}
                onClick={() => {
                  setformation(formas);
                }}
                className="dropdown-item help_center_active_drop_down color_main title_second text-wrap"
              >
                <p>{formas.nom}</p>
              </li>

            </ul>
          </div>
     
          <p className="typo-sec text-capitalize title_second my-4 mt-5">
            { t("demand.add_cv")}<span className="color_second">*</span> <span> { files?.CV ?          
            <a
              href={user?.CV}
              style={{ color: "inherit", marginLeft:'30px'}}
              target="_blank"
            >
              {getLastPart(user?.CV)}{" "}
            </a> : <></>}</span>
          </p>
          
          <FileInput value={files.CV} setFile={setFiles} name="CV" />

          <p className="typo-sec text-capitalize title_second my-4">
          { t("demand.add_passport_copy")}
            <span className="color_second">*</span><span> { files?.passeport ?          
            <a
              href={user?.passeport}
              style={{ color: "inherit", marginLeft:'30px'}}
              target="_blank"
            >
              {getLastPart(user?.passeport)}{" "}
            </a> : <></>}</span>
          </p>
          <FileInput
            value={files.passeport}
            setFile={setFiles}
            name="passeport"
          />
          <p className="typo-sec text-capitalize title_second my-4">
          { t("demand.add_diploma")} <span className="color_second">*</span><span> { files?.diplome ?          
            <a
              href={user?.diplome}
              style={{ color: "inherit", marginLeft:'30px'}}
              target="_blank"
            >
              {getLastPart(user?.diplome)}{" "}
            </a> : <></>}</span>
          </p>
          <FileInput value={files.diplome} setFile={setFiles} name="diplome" />
          <p className="typo-sec text-capitalize title_second my-4">
          { t("demand.add_transcript_copy")}
            <span className="color_second">*</span><span> { files?.releveDeNote ?          
            <a
              href={user?.releveDeNote}
              style={{ color: "inherit", marginLeft:'30px'}}
              target="_blank"
            >
              {getLastPart(user?.releveDeNote)}{" "}
            </a> : <></>}</span>
          </p>
          <FileInput
            value={files.releveDeNote}
            setFile={setFiles}
            name="releveDeNote"
          />
                    <p className="typo-sec text-capitalize title_second my-4">
                    { t("demand.add_motivation_letter_copy")}
            <span className="color_second">*</span><span> { files?.motivation ?          
            <a
              href={user?.motivation}
              style={{ color: "inherit", marginLeft:'30px'}}
              target="_blank"
            >
              {getLastPart(user?.motivation)}{" "}
            </a> : <></>}</span>
          </p>
          <FileInput
            value={files.motivation}
            setFile={setFiles}
            name="motivation"
          />
        </div>
        <div>
          <div className="w-100 m-0 p-0 mt-3 me-5 pe-5">
            <div className="row">
              <div className="actions-right d-flex align-items-center justify-lg-center justify-content-lg-end flex-lg-nowrap py-5 mt-2">
                <button
                  disabled={progBar}
                  className="btn main_btn forth_title forth_btn_styling m-2 "
                  onClick={SendDemandSubmittion}
                >
                  {t("demand.send_request_btn")}
                </button>

              </div>
            </div>
          </div>
          {progBar && <ProgressBar now={progress} />}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default StudyInFranceAsStudent;
