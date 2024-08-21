import keys from "./bills.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";
const GetRibs = (query = {}) => {
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
      const response = await axios.get(`/api/v1/transaction/rib`,Mquery(query));
      dispatch({
        type: keys.set_bills,
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
const UpdateStatusByAdmin = (bill, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(
        `/api/v1/transaction/rib/${bill._id}`,
        {
          ...bill,
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Bill Updated successfully`);
      dispatch(GetRibs());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export {
  GetRibs,
  UpdateStatusByAdmin
};