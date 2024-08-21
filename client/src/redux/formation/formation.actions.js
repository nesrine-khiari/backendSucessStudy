import keys from "./formation.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";
const Getformations = (query = {}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: keys.payload,
                value: true,
            });
            const paginationQuery = {
                ...query,
                page: query.p,  // Assuming your pagination parameter is named 'p'
                limit: query.l, // Assuming your pagination parameter is named 'l'
            };
            const response = await axios.get(`/api/v1/university/getFormations`, Mquery(paginationQuery));
            dispatch({
                type: keys.set_formations,
                value: response.data,
            });
        } catch (error) {
            dispatch({
                type: keys.payload,
                value: false,
            });
        }
    };
};
const GetDemands = (_id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: keys.payload,
                value: true,
            });
            const response = await axios.get(`/api/v1/demande/getAll`);
            console.log(response);
            dispatch({
                type: keys.setDemands,
                value: response.data.data,
            });
        } catch (error) {
            dispatch({
                type: keys.payload,
                value: false,
            });
        }
    };
};
const GetFormationByCountry = (city) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: keys.payload,
                value: true,
            });

            const response = await axios.get(`/api/v1/university/getFormation/${city}`);
            console.log(response.data.data)
            dispatch({
                type: keys.get_formations_country,
                value: response.data.data,
            });
        } catch (error) {
            dispatch({
                type: keys.payload,
                value: false,
            });
        }
    };
};
const GetFormationById = (Univid, formaId) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: keys.payload,
                value: true,
            });

            const response = await axios.get(`/api/v1/university/getFormation/${Univid}/${formaId}`);
            console.log(response.data.data)
            dispatch({
                type: keys.get_formation_id,
                value: response.data.data,
            });
        } catch (error) {
            dispatch({
                type: keys.payload,
                value: false,
            });
        }
    };
};

export {
    Getformations,
    GetFormationByCountry,
    GetFormationById,
    GetDemands
};