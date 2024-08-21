import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetCategorys = async (page) => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/category/`, {
        params: { p: page?.p || 0, l: page?.l || 10 },
    });
    return response;
};

const GetPublishedCategorys = async () => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/category/published`
    );
    return response;
};

const GetCategorysOfGroup = async (id) => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/group/categories/${id}`
    );
    return response;
};

const CreateCategory = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/category/${item?.groupId}`,
        {
            ...item,
        }
    );
    return response;
};

const UpdateCategory = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/category/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteCategory = async (id) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/category/${id}`
    );
    return response;
};

export default {
    GetCategorys,
    GetCategorysOfGroup,
    GetPublishedCategorys,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
};
