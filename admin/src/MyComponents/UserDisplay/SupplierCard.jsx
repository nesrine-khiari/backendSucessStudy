import React from "react";
import Badge from "../DataDisplay/Badge";
import UserImg from "../DataDisplay/UserImg";
import { Avatar } from "primereact/avatar";

export const DetailItem = ({ label, value, link }) => {
  return (
    <div className=" mt-4 flex align-items-center ">
      <h6 className=" mt-0 mb-0 mr-1 " style={{ fontSize: "15px" }}>
        {label}
      </h6>
      <span style={{ fontSize: "15px" }}>
        {link ? (
          <a href={link} target="_blank">
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  );
};

export const DetailBoolItem = ({ label, value, TrueTxt, FalseTxt }) => {
  const color = value ? "green" : "red";
  const text = value ? TrueTxt : FalseTxt;
  return (
    <div className=" mt-4 flex align-items-center ">
      <h6 className=" mt-0 mb-0 mr-1" style={{ fontSize: "15px" }}>
        <span>{label}</span>
      </h6>
      <Badge type={color}>{text}</Badge>
    </div>
  );
};

export const UserImgComponent = (props) => {
  const {
    firstName = " ",
    lastName = " ",
    avatar = null,
    setColors = () => {},
  } = props;
  return (
    <div className=" h-9rem w-9rem m-auto mt-4 ">
      <UserImg
        src={avatar}
        name={firstName}
        lastname={lastName}
        setColors={setColors}
      />
    </div>
  );
};

export const SupplierProdMonthNumbers = (props) => {
  const { color, nbProds = 0, nbMonths = 0 } = props;
  return (
    <div className="flex align-items-center justify-content-around m-auto mt-6 ">
      <div className=" flex align-items-center justify-content-center ml-2 mr-2 ">
        <Avatar
          icon="pi pi-box"
          shape="square"
          size="large"
          className=" mr-2 "
          style={{
            color: color.txt,
            backgroundColor: color.bg,
          }}
        />
        <div className=" flex flex-column justify-content-start  ">
          <h5 className=" font-semibold mt-0 mb-0 ">{nbProds}</h5>
          <span className=" block ">Products</span>
        </div>
      </div>
      <div className=" flex align-items-center justify-content-center ml-2 mr-2 ">
        <Avatar
          icon="pi pi-calendar"
          shape="square"
          size="large"
          className=" mr-2 "
          style={{
            color: color.txt,
            backgroundColor: color.bg,
          }}
        />
        <div className=" flex flex-column justify-content-start  ">
          <h5 className=" font-semibold mt-0 mb-0 ">{nbMonths}</h5>
          <span className=" block ">Months</span>
        </div>
      </div>
    </div>
  );
};
