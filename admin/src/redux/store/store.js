import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";

import { UserReducer } from "../user/user.reducer";
import { UniversityReducer } from "../university/university.reducer";
import { StudentReducer } from "../students/student.reducer";
import { SousAdminsReducer } from "../sousadmins/sousadmins.reducer";
import { feedbacksReducer } from "../feedbacks/feedbacks.reducer";
import { ConvReducer } from "../conversation/conversation.reducer";
import { FormationReducer } from "../formation/formation.reducer";
import { TransactionReducer } from "../transaction/transaction.reducer"
import { BillsReducer } from "../bills/bills.reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  UserReducer,
  UniversityReducer,
  StudentReducer,
  SousAdminsReducer,
  feedbacksReducer,
  ConvReducer,
  FormationReducer,
  TransactionReducer,
  BillsReducer
});

const store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export { store };
