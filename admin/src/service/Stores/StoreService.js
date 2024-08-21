import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetAllStores = async (page) => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/store/`, {
        params: {
            p: page?.p || 0,
            l: page?.l || 10,
        },
    });
    return response;
};

const AdminGetStore = async (id) => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/store/forAdmin/${id}`
    );
    return response;
};

const ActivateStore = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/store/activate/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const BlockStore = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/store/block/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteStore = async (item) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/store/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const UpdateStore = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/store/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

export default {
    GetAllStores,
    AdminGetStore,
    BlockStore,
    DeleteStore,
    UpdateStore,
    // CreateSupplier,
    // ResendVerifMail,
    // ResendResetPassword,
    // ResetSupplierPassword,
};
