import React, { useTransition } from "react";
// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { Check, UploadCloud, File, Trash } from "react-feather";
import trash from "../assets/images/trash.svg";
import down from "../assets/images/down.svg";
import file from "../assets/images/file.svg";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
// ** ==>
function FileInput(props) {
  // ** props
  const { value, setFile, name } = props;
  // on changes

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile((prev) => ({ ...prev, [name]: acceptedFiles[0] }));
    },
  });

  const { t } = useTranslation();

  const isMobile = useMediaQuery({ maxWidth: 992 });
  // ** ==>
  return (
    <div className="my-5">
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          type="file"
          name="reportCard"
          accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx"
        />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <img
            src={down}
            className="color_main"
            height={isMobile ? 56 : 54}
            width={isMobile ? 40 : 56}
          />
          <h5
            className={
              isMobile
                ? "drop_zone_title color_main title_second pt-2"
                : "drop_zone_title color_main title_second pt-4"
            }
          >
            {t("demand.browse_files")}
          </h5>
        </div>
      </div>
      <div
        className="file_input my-4 d-flex justify-content-between align-items-start"
        style={{
          background:
            value == null ? "rgba(255, 183, 3, 0.17)" : "rgba(2, 48, 71, 0.08)",
        }}
      >
        <img src={file} className="color_second" height={32} width={32} />
        <div className="d-flex gap-2 h-100">
          <div className="h-100 mt-3">
            <p className="file_input_text color_main title_second">
              {value === null ? t("demand.no_file_selected") : value?.name}
            </p>
          </div>
          <img
            src={trash}
            alt="object"
            style={{ width: "26px", height: "20px" }}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default FileInput;
