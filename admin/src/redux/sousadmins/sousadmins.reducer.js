import keys from "./sousadmins.keys";

export const init_sousadmin = {
  id: "",
  role: "",
  email: "",
  firstName: "",
  lastName: "",
  tel: "",
  pays: "",
  verified: false,
  suspended: false,
  requestDelete: false,
  createdAt: new Date(),
};

export const InitialState = {
  payload: false,
  sousadmins: [],
  sousadmin: { ...init_sousadmin },
};

export const SousAdminsReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.set_sousadmin:
      return { ...state, sousadmin: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.set_sousadmins:
      return { ...state, sousadmins: action.value, payload: false };
    default:
      return state;
  }
};
