import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";

import Badge from "../../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../../MyComponents/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { GetAllSuppliers } from "../../../../redux/actions/Suppliers.actions";

const Transactions = (props) => {
  const { title } = props;
  let emptyItem = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
  };
  const dispatch = useDispatch();

  const suppliers = useSelector((state) => state.Suppliers.data.items);
  const count = useSelector((state) => state.Suppliers.data.count);

  const [Item, setItem] = useState(emptyItem);
  const [page, setPage] = useState({ p: 0, l: 5 });
  //-------------------------------- Dialog States --------------------------------------------
  const [addDialogue, setAddDialog] = useState(false);

  const [selectedItems, setSelectedItems] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const dt = useRef(null);

  //-------------------------------- Get Data --------------------------------------------
  useEffect(() => {
    dispatch(GetAllSuppliers(page));
  }, [page]);

  //-------------------------------- Handle Opens -------------------------------

  const openAddDialogue = () => {
    setAddDialog(true);
  };

  //-------------------------------- Handle Close -------------------------------
  const handleClose = () => {
    setItem({ ...emptyItem });
    setAddDialog(false);
  };

  //------------------------------------------- COLUMNS VALUES ----------------------------------------------

  const Val1ColumnValue = (rowData) => {
    return "Value 1";
  };

  const Val2ColumValue = (rowData) => {
    return "Value 2";
  };

  const Val3ColumValue = (rowData) => {
    return "Value 3";
  };

  const StatusColumValue = (rowData) => {
    const color = false ? "red" : "green";
    const text = false ? "Suspended" : "Active";
    return <Badge type={color}>{text}</Badge>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div
        className="actions"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
        />
      </div>
    );
  };

  const header = (
    // here you can filter using NodeServerApi
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <h3 className=" mt-0 mb-4 ">{title}</h3>
          <DataTable
            ref={dt}
            value={suppliers}
            // selection={false}
            // onSelectionChange={(e) => setSelectedItems(e.value)}
            dataKey="_id"
            className="datatable-responsive"
            globalFilter={globalFilter}
            emptyMessage="No Suppliers found."
            responsiveLayout="scroll"
          >
            <Column field="phoneNumber" header="Val1" body={Val1ColumnValue} />
            <Column field="storePublicId" header="Val2" body={Val2ColumValue} />
            <Column field="storePublicId" header="Val2" body={Val3ColumValue} />
            <Column field="suspended" header="Status" body={StatusColumValue} />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={count} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
