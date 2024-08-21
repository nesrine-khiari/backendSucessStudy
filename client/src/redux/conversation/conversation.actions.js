import keys from "./conversation.key";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";

const CreateConv = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const exist_conv_resp = await axios.get(
        `/api/v1/message/getAllDiscussion`,
        Mquery({ user: user.id })
      );
      if (exist_conv_resp?.data?.length === 0) {
        // here create a new conversation
        const data = { userId: user.id };
        const create_conv_resp = await axios.post(
          `/api/v1/message/createDiscussion`,
          { ...data }
        );
        console.log(create_conv_resp);
        dispatch({
          type: keys.set_conversation,
          value: create_conv_resp?.data,
        });
      } else if (exist_conv_resp?.data?.length > 0) {
        dispatch({
          type: keys.set_conversation,
          value: exist_conv_resp?.data[0],
        });
        const mess_conv_resp = await axios.get(
          `/api/v1/message/messages/${exist_conv_resp?.data[0]?._id}`
        );
        dispatch({
          type: keys.set_messages,
          value: mess_conv_resp.data,
        });
      }
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const sendMessage = (message, callback) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const { conversation } = getState()?.ConvReducer;
      const response = await axios.post(
        `/api/v1/message/send/${conversation._id}`,
        { text: message, user: 1 }
      );
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

export { CreateConv, sendMessage };
