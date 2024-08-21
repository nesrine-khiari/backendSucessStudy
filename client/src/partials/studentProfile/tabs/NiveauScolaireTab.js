import React, { useState } from "react";
import { Link } from "react-router-dom";
// ** icons
import { Check, DownloadCloud, File, Trash } from "react-feather";
// ** bootsteap
import { Row } from "reactstrap";
// ** Third Party Imports
import { useDropzone } from "react-dropzone";
// ** ==>

import trash from '../../../assets/images/trash.svg';

function NiveauScolaireTab() {
  // ** State
  const [files, setFiles] = useState([]);
  const [releveNote, setReleveNote] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      console.log("file: ", acceptedFiles);
      /* setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]); */
      setReleveNote(acceptedFiles[0]);
    },
  });
  return (
    <div>
      <p className="drop_down_title color_main title_second mt-5 mb-3">
        Ajouter le relevé de note <span className="color_second">*</span>
      </p>
      <div className="my-5">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            <DownloadCloud size={64} className="color_main" />
            <h5 className="drop_zone_title color_main title_second pt-5">
              Parcourir les fichiers à télécharger
            </h5>
          </div>
        </div>
        <div className=" file_input my-4 d-flex justify-content-between align-items-start ">
          <File size={28} className="color_second" />
          <div className="d-flex gap-2 h-100 drop_down_background">
            <div className="h-100 mt-3">
              {releveNote === null ? (
                <p className="file_input_text color_main title_second">
                  Aucun fichier sélectionné -
                </p>
              ) : (
                releveNote.name
              )}
            </div>
            <img src={trash} alt="trash" style={{width:"20px",height:"26px"}} />
          </div>
        </div>
      </div>

      <p className="drop_down_title color_main title_second mt-5 mb-3">
        Ajouter le niveau ( bac ou sans bac ){" "}
        <span className="color_second">*</span>
      </p>
      <div className="dropdown  signup_input border_left w-25">
        <button
          className="btn dropdown-toggle  d-flex align-items-center border-0 justify-content-between w-100 title_second"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="button-text nav_link_style drop_down_title title_second">
            Niveau
          </span>
          <i className="fa fa-angle-down"></i>
        </button>
        <ul className="dropdown-menu nav_link_ul w-100">
          <li>
            <Link
              className="dropdown-item nav_link_style_active title_second color_main discover_service_dropdown w-100"
              to="#"
            >
              Avec Bac
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item nav_link_style_active title_second color_main discover_service_dropdown w-100"
              to="#"
            >
              Sans Bac
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NiveauScolaireTab;
