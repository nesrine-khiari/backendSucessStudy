import React, { useState, useEffect } from "react";
import FileInput from "../../components/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { UpdateImagesUniv } from "../../redux/university/university.actions";
import { useTranslation } from "react-i18next";
import { uploadProgress } from "../../redux/uploads/uplaodAction";
import { ProgressBar } from "react-bootstrap";

function Pictures({ univ }) {
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.upload);
  const [files, setFiles] = useState({
    logo: null,
    cover: null,
  });

  const reset = () => {
    setFiles({
      logo: null,
      cover: null,
    });
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

  const handleSubmit = () => {
    if (!files.logo) {
      toast.error("Please upload logo image ");
      return;
    }
    if (!files.cover) {
      toast.error("Please upload cover image");
      return;
    }
    dispatch(UpdateImagesUniv(files, univ.id, reset));
  };

  const { t } = useTranslation();

  return (
    <div>
      <p className="typo text-capitalize title_second my-5">
        {t("uni_params.add_logo")} <span className="color_second">*</span>
      </p>
      <FileInput value={files.logo} setFile={setFiles} name="logo" />
      <p className="typo text-capitalize title_second my-5">
        {t("uni_params.add_cover")} <span className="color_second">*</span>
      </p>
      <FileInput value={files.cover} setFile={setFiles} name="cover" />
      <button
        className="btn main_btn w-100 signup_btn title_second mb-1"
        onClick={handleSubmit}
        disabled={progBar}
      >
        {t("user.change_in")}
      </button>
      {progBar && <ProgressBar now={progress} />}
    </div>
  );
}

export default Pictures;
