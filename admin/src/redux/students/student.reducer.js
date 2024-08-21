import keys from "./student.keys";

export const init_student = {
  id: "",
  role: "",
  email: "",
  firstName: "",
  lastName: "",
  tel: "",
  pays: "",
  verified: false,
  suspended: false,
  parcoursScolaire: [],
  requestDelete: false,
  experienceProfessionnelle: [],
  createdAt: new Date(),
};

export const InitialState = {
  payload: false,
  students: [],
  student: { ...init_student },
};

export const StudentReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.set_student:
      return { ...state, student: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.set_students:
      return { ...state, students: action.value, payload: false };
    default:
      return state;
  }
};
