import { UPLOAD_PROGRESS, UPLOAD_SUCCESS, UPLOAD_FAILURE } from './uplaodAction';

const initialState = {
  progress: 0,
  data: null,
  error: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default uploadReducer;
