import React from "react";
import { Chart } from "primereact/chart";

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Universitys",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "#2f4860",
      borderColor: "#2f4860",
      tension: 0.4,
    },
    {
      label: "Students",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: "#00bb7e",
      borderColor: "#00bb7e",
      tension: 0.4,
    },
  ],
};

const light = {
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
  },
};

const dark = {
  plugins: {
    legend: {
      labels: {
        color: "#ebedef",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ebedef",
      },
      grid: {
        color: "rgba(160, 167, 181, .3)",
      },
    },
    y: {
      ticks: {
        color: "#ebedef",
      },
      grid: {
        color: "rgba(160, 167, 181, .3)",
      },
    },
  },
};

function ChartsOverview() {
  return (
    <div className="card">
      <h5>Traffic Overview</h5>
      <Chart type="line" data={lineData} options={light} />
    </div>
  );
}

export default ChartsOverview;
