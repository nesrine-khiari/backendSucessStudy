import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetSubCategorys = async (page) => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/subCategory/`, {
        params: { p: page?.p || 0, l: page?.l || 10 },
    });
    return response;
};

const GetPublishedSubCategorys = async () => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/subCategory/published`
    );
    return response;
};

const GetSubCategorysOfCategory = async (id) => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/category/subCategories/${id}`
    );
    return response;
};

const CreateSubCategory = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/subCategory/${item?.categoryId}`,
        {
            ...item,
        }
    );
    return response;
};

const UpdateSubCategory = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/subCategory/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteSubCategory = async (id) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/subCategory/${id}`
    );
    return response;
};

export default {
    GetSubCategorys,
    GetPublishedSubCategorys,
    GetSubCategorysOfCategory,
    CreateSubCategory,
    UpdateSubCategory,
    DeleteSubCategory,
};
