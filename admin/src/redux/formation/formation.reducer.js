import keys from "./formation.keys";
export const InitialFormationState = {
    payload: false,
    formations: [],
};
export const FormationReducer = (state = { ...InitialFormationState }, action) => {
    switch (action.type) {
        case keys.set_formations:
            return { ...state, formations: action.value, payload: false };
        case keys.payload:
            return { ...state, payload: action.value };
        default:
            return state;
    }
}