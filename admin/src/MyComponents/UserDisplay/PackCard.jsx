import React from "react";

export const PackHead = ({ color }) => {
  return (
    <div className=" flex align-align-items-center justify-content-between ">
      <div>
        <span
          className="font-semibold border-round pt-1 pb-1 pl-2 pr-2"
          style={{
            backgroundColor: color.bg,
            color: color.txt,
          }}
        >
          Standard
        </span>
      </div>
      <div className=" flex align-items-start ">
        <span
          className=" font-semibold "
          style={{
            color: color.txt,
          }}
        >
          DT
        </span>
        <div>
          <span
            className=" font-semibold "
            style={{
              color: color.txt,
              fontSize: "3.5rem",
              lineHeight: 0.8,
            }}
          >
            99
          </span>
          <span>/month</span>
        </div>
      </div>
    </div>
  );
};

export const Offers = () => {
  return (
    <ul className=" mt-2 pl-4 ">
      <li className=" mt-3 text-700 " style={{ fontSize: "16px" }}>
        Up to 100 producs
      </li>
      <li className=" mt-3 text-700 " style={{ fontSize: "16px" }}>
        Manage your store
      </li>
      <li className=" mt-3 text-700 " style={{ fontSize: "16px" }}>
        Reach your clients
      </li>
    </ul>
  );
};

export const DaysLeft = ({ color, label, value, max }) => {
  return (
    <div className=" pt-0 pb-4 ">
      <div className=" flex align-items-center justify-content-between  ">
        <h5 className="font-semibold text-700 mt-0 mb-0 ">{label}</h5>
        <h5 className="font-semibold text-700 mt-0 mb-0 ">
          {value} of {max} {label}
        </h5>
      </div>

      <div
        className=" border-round mt-2 "
        style={{
          backgroundColor: color.bg,
          height: "10px",
          width: "100%",
        }}
      >
        <div
          className=" border-round "
          style={{
            backgroundColor: color.txt,
            width: `${(value / max) * 100}%`,
            height: "10px",
          }}
        />
        <span className=" text-600 block mt-1 ">
          {value} {label} Remaining
        </span>
      </div>
    </div>
  );
};
