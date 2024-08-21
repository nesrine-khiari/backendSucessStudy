import keys from "./feedbacks.keys";

export const init_feedbacks = {
  id: "",
  starsNumber: 1,
  comment: "",
  seen: "",
  User: { firstName: "", lastName: "", email: "", tel: "", _id: "" },
  createdAt: new Date(),
};

export const InitialState = {
  payload: false,
  feedbacks: [],
  feedback: { ...init_feedbacks },
};

export const feedbacksReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.set_feedbacks:
      return { ...state, feedbacks: action.value, payload: false };
    case keys.set_feedback:
      return { ...state, feedback: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    default:
      return state;
  }
};
