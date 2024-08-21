import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

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
  };

  return (
    <Panel header="Filter Sous Admins" toggleable={true} collapsed={true}>
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

          {/* <span className="block m-1 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="Student Email"
              type="search"
              name="email"
              onChange={handleFilter}
              value={localFilter.email}
            />
          </span> */}

          <span className="block m-1 p-input-icon-left">
            <Dropdown
              value={localFilter.pays}
              options={[
                { value: "", name: "All Pays" },
                { value: "tunis", name: "Tunis" },
                { value: "France", name: "France" },
              ]}
              onChange={handleFilter}
              className=" w-full "
              name="pays"
              optionLabel="name"
              optionValue="value"
              placeholder="Student Pays..."
            />
          </span>

          <span className="block m-1 p-input-icon-left">
            <Dropdown
              value={localFilter.verified}
              options={[
                { value: "", name: "Verified & Not Verified" },
                { value: true, name: "Verified" },
                { value: false, name: "Not Verified" },
              ]}
              onChange={handleFilter}
              className=" w-full "
              name="verified"
              optionLabel="name"
              optionValue="value"
              placeholder="Verified Filter..."
            />
          </span>

          <span className="block m-1 p-input-icon-left">
            <Dropdown
              value={localFilter.suspended}
              options={[
                { value: "", name: "Suspended & Not Suspended" },
                { value: true, name: "Suspended" },
                { value: false, name: "Not Suspended" },
              ]}
              onChange={handleFilter}
              className=" w-full "
              name="suspended"
              optionLabel="name"
              optionValue="value"
              placeholder="Approved Filter..."
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
