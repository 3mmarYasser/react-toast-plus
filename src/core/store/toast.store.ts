import {Action, ActionTypes,  State } from "../../types/Toast.types.ts";

export const toastReducer = (state:State , action:Action) :State=>{
    switch (action.type) {
        case ActionTypes.ADD_TOAST:
            return {
                ...state,
                toasts: [action.toast, ...state.toasts],
            };
        case ActionTypes.REMOVE_TOAST:
            return {
                ...state,
                toasts: state.toasts.filter((toast) => toast.id !== action.id),
            };

        case ActionTypes.UPDATE_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
                ),
            };
        case ActionTypes.REMOVE_ALL_TOASTS:
            return {
                ...state,
                toasts: [],
            };

        default:
            console.error(`Unhandled action type: ${(action as Action).type}`);
            return state;
    }
}