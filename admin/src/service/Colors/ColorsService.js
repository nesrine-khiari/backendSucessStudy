import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const GetColors = async () => {
    const response = await axios.get(`${REACT_APP_API_HOST}/api/colors/all`);
    return response;
};

const CreateColor = async (item) => {
    const response = await axios.post(
        `${REACT_APP_API_HOST}/api/colors/create`,
        {
            ...item,
        }
    );
    return response;
};

const UpdateColor = async (item) => {
    const response = await axios.put(
        `${REACT_APP_API_HOST}/api/colors/update/${item._id}`,
        {
            ...item,
        }
    );
    return response;
};

const DeleteColor = async (id) => {
    const response = await axios.delete(
        `${REACT_APP_API_HOST}/api/colors/delete/${id}`
    );
    return response;
};

export default {
    GetColors,
    CreateColor,
    UpdateColor,
    DeleteColor,
};
