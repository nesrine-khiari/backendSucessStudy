import keys from "./feedbacks.keys";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";

const GetAllFeedbacks = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/feedBack/list`, Mquery(query));
      dispatch({
        type: keys.set_feedbacks,
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

const DeleteFeedback = (feedback, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.delete(
        `/api/v1/feedBack/deleteFeedBack/${feedback._id}`
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Feedback Deleted Successfully`);
      dispatch(GetAllFeedbacks());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetOneFeedback = (id, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/feedBack/getOneFeedBack/${id}`);
      console.log(response);
      dispatch({
        type: keys.set_feedback,
        value: response.data.data,
      });
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export { GetAllFeedbacks, DeleteFeedback, GetOneFeedback };
