import keys from "./user.keys";

export const InitialState = {
  payload: false,
  is_connected: false,
  user: {
    id: "",
    role: "",
    email: "",
    verified: false,
    suspended: false,
    parcoursScolaire: [],
    requestDelete: false,
    experienceProfessionnelle: [],
    createdAt: new Date(),
  },
};

export const UserReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.update_user:
      return { ...state, user: action.value };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.connect:
      return { ...state, connect: action.value };
    default:
      return state;
  }
};
