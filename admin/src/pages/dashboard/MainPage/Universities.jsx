import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import default_img from "../../../assets/images/default.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUnivs } from "../../../redux/university/university.actions";
import moment from 'moment'


function Universities() {
  const univs = useSelector((state) => state.UniversityReducer.universitys);

  const dispatch = useDispatch()

  const reloadData = () => {
    dispatch(GetAllUnivs());
  };

  useEffect(() => {
    reloadData();
  }, []);
  useEffect(()=>{
    console.log(univs);

  },[univs])
  return (
    <>
      <div className="card">
        <h5>Recent Joined Universities</h5>
        <DataTable value={univs.reverse()} rows={3} paginator responsiveLayout="scroll">
          <Column
            header="Logo"
            body={(data) => (
              data?.logo ? 
              <img                
                src={data.logo}
                width="40"
              />:
              <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '3.5rem',height: "3.5rem"}}><i className="pi pi-building text-cyan-500 text-xl"></i></div>
            )}
          />
          <Column
            field="label"
            header="Label"
            sortable
            body={(data) => (
              <span

              >{data.nom}</span>
            )}
            style={{ width: "35%" }}
          />
          <Column
            field="location"
            header="Location"
            sortable
            body={(data) => (
              <span

              >{data.pays}</span>
            )}
            style={{ width: "25%" }}
          />
          <Column
            header="View"
            style={{ width: "25%" }}
            body={(data) => (
              <span

              >{moment(data.createdAt).format("MMM Do YY")}</span>
            )}
          />
        </DataTable>
      </div>
    </>
  );
}

const univs = [
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
];

export default Universities;
