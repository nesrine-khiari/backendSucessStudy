import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetGroups = async (page) => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/group/`, {
        params: { p: page?.p || 0, l: page?.l || 10 },
    });
    return response;
};

const GetPublishedGroups = async () => {
    const response = await axios.get(
        `${REACT_APP_API_HOST}/api/group/published`
    );
    return response;
};

const CreateGroup = async (item) => {
    const response = await axios.post(`${REACT_APP_API_HOST}/api/group/`, {
        ...item,
    });
    return response;
};

const UpdateGroup = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/group/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteGroup = async (id) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/group/${id}`
    );
    return response;
};

export default {
    GetGroups,
    GetPublishedGroups,
    CreateGroup,
    UpdateGroup,
    DeleteGroup,
};
