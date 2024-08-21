import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetAllSuppliers = async (page, Filter) => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/supplier/`, {
        params: {
            p: page?.p || 0,
            l: page?.l || 10,
            filterField: Filter?.filterField,
            filterValue: Filter?.filterValue,
        },
    });
    return response;
};

const AdminGetSupplier = async (id) => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/supplier/forAdmin/${id}`
    );
    return response;
};

const CreateSupplier = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/supplier/create`,
        {
            ...item,
        }
    );
    return response;
};

const UpdateSupplier = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/supplier/adminUpdate/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const BlockSupplier = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/supplier/block/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteSupplier = async (item) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/supplier/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const ResendVerifMail = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/supplier/send/verifyLink/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const ResendResetPassword = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/supplier/send/resetPassword/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const ResetSupplierPassword = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/supplier/resetPassword/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

export default {
    GetAllSuppliers,
    CreateSupplier,
    AdminGetSupplier,
    UpdateSupplier,
    BlockSupplier,
    ResendVerifMail,
    DeleteSupplier,
    ResendResetPassword,
    ResetSupplierPassword,
};
