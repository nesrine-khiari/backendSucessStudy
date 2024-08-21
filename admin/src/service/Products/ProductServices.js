import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetProducts = async (page) => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/product/all`, {
        params: { p: page?.p || 0, l: page?.l || 10 },
    });
    return response;
};

const GetPublishedProducts = async () => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/product/published`
    );
    return response;
};

const CreateProduct = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/product/create`,
        {
            ...item,
        }
    );
    return response;
};

const UpdateProduct = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/product/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteProduct = async (id) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/product/delete/${id}`
    );
    return response;
};

export default {
    GetProducts,
    GetPublishedProducts,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
};
