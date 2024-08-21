import keys from "./conversation.key";

export const conversation = {
  user: "",
  superadmin: "",
  sousadmin: "",
  _id: "",
};

export const InitialState = {
  payload: false,
  conversation: { ...conversation },
  messages: [],
};

export const ConvReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.set_conversation:
      return { ...state, conversation: action.value, payload: false };
    case keys.set_messages:
      return { ...state, messages: action.value, payload: false };
    default:
      return state;
  }
};
