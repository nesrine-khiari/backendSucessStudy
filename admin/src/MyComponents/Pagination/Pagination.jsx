import React, { useState } from "react";
import { Paginator } from "primereact/paginator";

const Pagination = (props) => {
    const { max, onPageChange } = props;
    const [basicFirst, setBasicFirst] = useState(0);
    const [basicRows, setBasicRows] = useState(10);

    const onBasicPageChange = (event) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
        onPageChange({ p: event.page, l: event.rows });
    };

    return (
        <Paginator
            first={basicFirst}
            rows={basicRows}
            totalRecords={max}
            rowsPerPageOptions={[5, 10, 20, 30, 50]}
            onPageChange={onBasicPageChange}
        ></Paginator>
    );
};

export default Pagination;
