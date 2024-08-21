import keys from "./bills.keys";
export const InitialBillsState = {
    payload: false,
    bills: [],
};
export const BillsReducer = (state = { ...InitialBillsState }, action) => {
    switch (action.type) {
        case keys.set_bills:
            return { ...state, bills: action.value, payload: false };
        case keys.payload:
            return { ...state, payload: action.value };
        default:
            return state;
    }
}