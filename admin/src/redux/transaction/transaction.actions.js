import keys from "./transaction.keys";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";
const Gettransactions = (query = {}) => {
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

            const response = await axios.get('/api/v1/transaction',{params:query} );

            dispatch({
                type: keys.set_transactions,
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
    Gettransactions
};