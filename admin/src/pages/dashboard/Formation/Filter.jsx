import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import ARRAY_NUMBER from "../CountriesN";

function SupplierFilter({ init_filter, setFilter }) {
  const [localFilter, setLocalFilter] = useState({ ...init_filter });

  useEffect(() => {
    setFilter({ ...init_filter });
  }, []);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setLocalFilter({ ...localFilter, [name]: value });
  };

  const resetFilter = () => {
    setLocalFilter({ ...init_filter });
    setFilter({ ...init_filter });
  };

  const Research = () => {
    setFilter({ ...localFilter });
    console.log(localFilter)
  };

  return (
    <Panel header="Filter formation" toggleable={true} collapsed={true}>
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <div className="flex align-items-center flex-wrap ">
          {/* <span className="block m-1 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="FirstName..."
              type="search"
              name="firstName"
              onChange={handleFilter}
              value={
                localFilter?.filterField === "firstName"
                  ? localFilter.filterValue
                  : ""
              }
            />
          </span> */}

          {/* <span className="block m-1 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="LastName..."
              type="search"
              name="lastName"
              onChange={handleFilter}
              value={
                localFilter?.filterField === "lastName"
                  ? localFilter.filterValue
                  : ""
              }
            />
          </span> */}

          {/* <span className="block m-1 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="Email..."
              type="search"
              name="email"
              onChange={handleFilter}
              value={
                localFilter?.filterField === "email"
                  ? localFilter.filterValue
                  : ""
              }
            />
          </span> */}

          <span className="block m-1 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="nom de formation"
              type="search"
              name="nom"
              onChange={handleFilter}
              value={localFilter.nom}
            />
          </span>

          <span className="block m-1 p-input-icon-left">
          <Dropdown
  value={localFilter.pays}
  options={[
    { value: "", name: "All Countries" }, 
    ...ARRAY_NUMBER.map(x => ({ value: x.country.toLowerCase(), name: x.country }))
  ]}
  onChange={handleFilter}
  className="w-full"
  name="pays"
  optionLabel="name"
  optionValue="value"
  placeholder="University Pays..."
/>
          </span>
        </div>
        <div>
          <Button
            label="Reset"
            className="p-button-outlined p-button-warning mr-2"
            onClick={resetFilter}
          />
          <Button
            label="Search"
            className="p-button-warning mr-2"
            onClick={Research}
          />
        </div>
      </div>
    </Panel>
  );
}

export default SupplierFilter;
