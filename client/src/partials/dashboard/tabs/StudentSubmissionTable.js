import React, { useState, useEffect } from "react";
// ** bootstrap
import { Col, Table } from "reactstrap";
// ** styles
import "../../../assets/styles/StudentSubmission.css";
import "../../../assets/styles/TransactionsTable.css";

import { useDispatch, useSelector } from "react-redux";
import {
  GetDemandsByIdUniv,
  GetDemandsByIdUnivApproved,
  GetDemandsByIdUnivRefused,
} from "../../../redux/university/university.actions";
import { makeDate } from "../../../functions/dates.func";
import { useTranslation } from "react-i18next";
import i18n from "../../../functions/i18n";
import { useMediaQuery } from "react-responsive";

const StateOfDem = ({ dem, SetOneDemand, SetSubmittion }) => {
  const [res, setres] = useState({ text: "", color: "" });

  const open_certif = () => {
    if (dem?.final_certif?.length > 0) {
      SetOneDemand(dem);
      SetSubmittion(true);
    } else if (dem.statut === "verfie") {
      SetOneDemand(dem);
      SetSubmittion(false);
    }
  };

  useEffect(() => {
    if (i18n.language == "fr") {
      if (dem?.final_certif?.length > 0) {
        setres({ text: "Certificat Envoyé", color: " btn-outline-success " });
      } else {
        if (dem.statut == "verfie") {
          setres({
            text: "Certificat en Attente",
            color: " btn-outline-info ",
          });
        }
        if (dem.statut == "attente") {
          setres({ text: "Pas encore", color: " main_btn_outline " });
        }
        if (dem.statut == "refuse") {
          setres({ text: "Réfuser", color: " btn-outline-danger " });
        }
      }
    } else {
      if (dem?.final_certif?.length > 0) {
        setres({ text: "Certificat was sent", color: " btn-outline-success " });
      } else {
        if (dem.statut == "verfie") {
          setres({
            text: "Certificat is pending",
            color: " btn-outline-info ",
          });
        }
        if (dem.statut == "attente") {
          setres({ text: "Pending", color: " main_btn_outline " });
        }
        if (dem.statut == "refuse") {
          setres({ text: "Refused", color: " btn-outline-danger " });
        }
      }
    }
  }, [dem]);

  return (
    <div
      className={`text-center btn ${res.color} status_text title_second w-100 me-2`}
      onClick={open_certif}
      style={{ fontSize: "14px!important" }}
    >
      {res.text}
    </div>
  );
};

// ** ==>
function StudentSubmissionTable({ SetOneDemand, type, SetSubmittion }) {
  const manager = useSelector((state) => state.UserReducer.user);
  const demands = useSelector((state) => state.UniversityReducer.demands);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (type) {
      case "1":
        dispatch(GetDemandsByIdUniv(manager.Universite));
        break;
      case "3":
        dispatch(GetDemandsByIdUnivApproved(manager.Universite));
        break;
      case "4":
        dispatch(GetDemandsByIdUnivRefused(manager.Universite));
        break;
      default:
        dispatch(GetDemandsByIdUniv(manager.Universite));
        break;
    }
  }, [manager, type]);

  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 992 });

  return (
    <div className="submission_container borderless">
      <Col md={12} xs={12}>
        {isMobile ? (
          <Table responsive borderless>
            <thead>
              <tr className="mb-5">
                <th className="thead_style color_main title_forth">
                  {t("uniDash.user")}
                </th>
                <th className="thead_style color_main title_forth">
                  {t("uniDash.status")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {demands.map((dem, index) => {
                return (
                  dem.User && (
                    <tr key={index} classname="mb-2">
                      <td style={{ verticalAlign: "middle" }}>
                        <span className="tobody_td title_second">
                          {dem.User?.firstName} {dem.User?.lastName}
                        </span>
                      </td>

                      <td style={{ verticalAlign: "middle" }}>
                        <StateOfDem
                          dem={dem}
                          SetSubmittion={SetSubmittion}
                          SetOneDemand={SetOneDemand}
                        />
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <button
                          onClick={() => {
                            SetOneDemand(dem);
                            SetSubmittion(true);
                          }}
                          className={
                            isMobile
                              ? "btn main_btn_2 title_second w-100 status_text"
                              : "btn main_btn title_second w-100 status_text"
                          }
                          style={{
                            padding: isMobile
                              ? "8px 15px!important"
                              : "10px 20px!important",
                            fontSize: "14px!important",
                            height: isMobile ? "auto" : "38px",
                            borderRadius: "5px!important",
                          }}
                        >
                          {t("uniDash.details")}
                        </button>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Table responsive borderless>
            <thead>
              <tr className="mb-5">
                <th className="thead_style color_main title_forth">
                  {t("uniDash.user")}
                </th>

                <th className="thead_style color_main title_forth">
                  {t("uniDash.date")}
                </th>
                <th className="thead_style color_main title_forth">
                  {t("uniDash.email")}
                </th>
                <th className="thead_style color_main title_forth">
                  {t("uniDash.status")}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {demands.map((dem, index) => {
                return (
                  dem.User && (
                    <tr key={index} classname="mb-2">
                      <td style={{ verticalAlign: "middle" }}>
                        <span className="tobody_td title_second">
                          {dem.User?.firstName} {dem.User?.lastName}
                        </span>
                      </td>

                      <td style={{ verticalAlign: "middle" }}>
                        <span className="tobody_td title_second">
                          {makeDate(dem.createdAt)}
                        </span>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <span className="tobody_td title_second">
                          {dem.User.email}
                        </span>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <StateOfDem
                          dem={dem}
                          SetSubmittion={SetSubmittion}
                          SetOneDemand={SetOneDemand}
                        />
                      </td>
                      <td style={{ verticalAlign: "middle" }}>
                        <button
                          onClick={() => {
                            SetOneDemand(dem);
                            SetSubmittion(true);
                          }}
                          className="btn main_btn title_second w-100 status_text"
                          style={{
                            padding: "10px 20px!important",
                            fontSize: "14px!important",
                            height: "38px",
                            borderRadius: "5px!important",
                          }}
                        >
                          {t("uniDash.details")}
                        </button>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </div>
  );
}

export default StudentSubmissionTable;
