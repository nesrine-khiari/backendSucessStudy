import keys from "./conversation.key";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";

const getAllConversations = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/message/getAllDiscussion`);
      dispatch({
        type: keys.set_conversations,
        value: response?.data,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const updateConv = (convID) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(
        `/api/v1/message/updateConv/${convID}`
      );
      dispatch({
        type: keys.set_conversation,
        value: response?.data,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetMessagesOfConv = (conv) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/message/messages/${conv._id}`);
      dispatch({
        type: keys.set_messages,
        value: response?.data,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const sendMessage = (message, conv, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/message/send/${conv._id}`, {
        text: message,
        user: 0,
      });
      console.log(response);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export { getAllConversations, sendMessage, GetMessagesOfConv, updateConv };
