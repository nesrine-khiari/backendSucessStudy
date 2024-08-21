import keys from "./transaction.keys";
export const InitialtransactionState = {
    payload: false,
    transactions: [],
};
export const TransactionReducer = (state = { ...InitialtransactionState }, action) => {
    switch (action.type) {
        case keys.set_transactions:
            return { ...state, transactions: action.value, payload: false };
        case keys.payload:
            return { ...state, payload: action.value };
        default:
            return state;
    }
}