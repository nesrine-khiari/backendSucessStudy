import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";

import { UserReducer } from "./user/user.reducer";
import { UniversityReducer } from "./university/university.reducer";
import { ConvReducer } from "./conversation/conversation.reducer";
import uploadReducer from "./uploads/uploadReducer";
import { FormationReducer } from "./formation/formation.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  UserReducer,
  UniversityReducer,
  FormationReducer,
  ConvReducer,
  upload: uploadReducer,

});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
