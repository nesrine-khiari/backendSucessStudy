import React from "react";
import { useTranslation } from "react-i18next";
// ** bootstrap
import { Col, Table } from "reactstrap";
// ** styles
import "../../../assets/styles/StudentSubmission.css";
import "../../../assets/styles/TransactionsTable.css";
// ** ==>
function Transaction() {
  const { t } = useTranslation();

  return (
    <div className="submission_container">
      <Col md={8} xs={12}>
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
                {t("uniDash.commi")}
              </th>
              <th className="thead_style color_main title_forth">
                {t("uniDash.rev")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="tobody_td">200 étudiant</span>
              </td>
              <td>
                <span className="tobody_td">21/05/2022</span>
              </td>
              <td>
                <span className="tobody_td">20%</span>
              </td>
              <td>
                <span className="pricing_td">2700$</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </div>
  );
}

export default Transaction;
