import keys from "./university.keys";

export const init_univ = {
  OrganMere: "",
  address: "",
  cover: "",
  createdAt: "",
  description: "",
  long_desc: "",
  id: "",
  logo: "",
  nom: "",
  fullName: "",
  pays: "",
  qrCode: "",
  tel: "",
};

export const InitialState = {
  payload: false,
  universitys: [],
  formations: [],
  demands: [],
  selected_univ: { ...init_univ },
};

export const UniversityReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.setUnivs:
      return { ...state, universitys: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.setFormas:
      return { ...state, formations: action.value, payload: false };
    case keys.setDemands:
      return { ...state, demands: action.value, payload: false };
    case keys.setSelUniv:
      return { ...state, selected_univ: action.value, payload: false };
    default:
      return state;
  }
};
