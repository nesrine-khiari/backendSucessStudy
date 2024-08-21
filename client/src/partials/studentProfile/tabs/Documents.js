import React, { useEffect, useState } from "react";
import FileInput from "../../../components/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { UpdateProfileDocs } from "../../../redux/user/user.actions";
import { uploadProgress } from "../../../redux/uploads/uplaodAction";
import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Documents() {
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.upload);

  const user = useSelector((state) => state.UserReducer.user);
  const [files, setFiles] = useState({
    CV: null,
    passeport: null,
    diplome: null,
    releveDeNote: null,
    motivation: null,
  });

  const reset = () => {
    setFiles({
      CV: null,
      passeport: null,
      diplome: null,
      releveDeNote: null,
      motivation: null,
    });
  };

  useEffect(() => {
    if (user) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        CV: user.CV || prevFiles.CV,
        passeport: user.passeport || prevFiles.passeport,
        diplome: user.diplome || prevFiles.diplome,
        releveDeNote: user.releveDeNote || prevFiles.releveDeNote,
        motivation: user.motivation || prevFiles.motivation,
      }));
    }
  }, [user]);

  const handleSubmit = () => {
    if (!files.CV) {
      toast.error(t("uni_params.add_cv"));
      return;
    }
    if (!files.passeport) {
      toast.error(t("uni_params.add_passport"));
      return;
    }
    if (!files.diplome) {
      toast.error(t("uni_params.add_diploma"));
      return;
    }
    if (!files.motivation) {
      toast.error(t("uni_params.add_motivation_letter"));
      return;
    }
    if (!files.releveDeNote) {
      toast.error(t("uni_params.add_transcript"));
      return;
    }

    dispatch(UpdateProfileDocs(files, user.id, reset));
  };
  const [progBar, setprogBar] = useState(false);

  useEffect(() => {
    console.log(progress);
    if (progress == 100) {
      dispatch(uploadProgress(0));
    } else if (progress == 0) {
      setprogBar(false);
    } else {
      setprogBar(true);
    }
  }, [progress]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const { t } = useTranslation();

  function getLastPart(inputString) {
    // Split the input string using either "/" or "\" as the delimiter
    const parts = inputString.split(/[\/\\]/);

    // Get the last part of the array
    const lastPart = parts.pop();

    return lastPart;
  }

  return (
    <div>
      <p className="typo-sec text-capitalize title_second my-5">
        {t("demand.add_cv")}
        <span className="color_second">
          *{" "}
          {user?.CV?.length > 0 && (
            <a href={user?.CV} style={{ color: "inherit" }} target="_blank">
              {getLastPart(user?.CV)}{" "}
            </a>
          )}
        </span>
      </p>
      <FileInput value={files.CV} setFile={setFiles} name="CV" />
      <p className="typo-sec text-capitalize title_second my-5">
        {t("demand.add_passport_copy")}
        <span className="color_second">
          *{" "}
          {user?.passeport?.length > 0 && (
            <a
              href={user?.passeport}
              style={{ color: "inherit" }}
              target="_blank"
            >
              {getLastPart(user?.passeport)}{" "}
            </a>
          )}{" "}
        </span>
      </p>
      <FileInput value={files.passeport} setFile={setFiles} name="passeport" />
      <p className="typo-sec text-capitalize title_second my-5">
        {t("demand.add_diploma")}{" "}
        <span className="color_second">
          *{" "}
          {user?.diplome?.length > 0 && (
            <a
              href={user?.diplome}
              style={{ color: "inherit" }}
              target="_blank"
            >
              {getLastPart(user?.diplome)}{" "}
            </a>
          )}
        </span>
      </p>
      <FileInput value={files.diplome} setFile={setFiles} name="diplome" />
      <p className="typo-sec text-capitalize title_second my-5">
        {t("demand.add_transcript_copy")}
        <span className="color_second">
          *{" "}
          {user?.releveDeNote?.length > 0 && (
            <a
              href={user?.releveDeNote}
              style={{ color: "inherit" }}
              target="_blank"
            >
              {getLastPart(user?.releveDeNote)}{" "}
            </a>
          )}
        </span>
      </p>

      <FileInput
        value={files.releveDeNote}
        setFile={setFiles}
        name="releveDeNote"
      />
      <p className="typo-sec text-capitalize title_second my-5">
        {t("demand.add_motivation_letter_copy")}{" "}
        <span className="color_second">
          *{" "}
          {user?.motivation?.length > 0 && (
            <a
              href={user?.motivation}
              style={{ color: "inherit" }}
              target="_blank"
            >
              {getLastPart(user?.motivation)}{" "}
            </a>
          )}
        </span>
      </p>
      <FileInput
        value={files.motivation}
        setFile={setFiles}
        name="motivation"
      />
      <button
        className="btn main_btn w-100 signup_btn title_second mb-1"
        onClick={handleSubmit}
        disabled={progBar}
      >
        {t("user.modif_img")}
      </button>
      {progBar && <ProgressBar now={progress} />}
    </div>
  );
}

export default Documents;
