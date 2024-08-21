import React, { useEffect, useState } from "react";
import FileInput from "../../../components/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { UpdateProfileImg } from "../../../redux/user/user.actions";
import { uploadProgress } from "../../../redux/uploads/uplaodAction";
import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ProfileImgUpdate() {
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.upload);

  const user = useSelector((state) => state.UserReducer.user);
  const [files, setFiles] = useState({
    picture: null,
  });

  const reset = () => {
    setFiles({
      picture: null,
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
    if (!files.picture) {
      toast.error(t("user.updateIm"));
      return;
    }
    dispatch(UpdateProfileImg(files, user.id, reset));
  };

  const { t } = useTranslation();

  return (
    <div>
      <p className="typo text-capitalize title_second my-5">
        {t("user.ajouter_img")} <span className="color_second">*</span>
      </p>
      <FileInput value={files.picture} setFile={setFiles} name="picture" />
      <button
        className="btn main_btn w-100 signup_btn title_second mb-1"
        disabled={progBar}
        onClick={handleSubmit}
      >
        {t("user.modif")}
      </button>
      {progBar && <ProgressBar now={progress} />}
    </div>
  );
}

export default ProfileImgUpdate;
