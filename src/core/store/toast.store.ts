import {Action, ActionTypes, State} from "../../types";

export const toastReducer = (state:State , action:Action) :State=>{
    switch (action.type) {
        case ActionTypes.ADD_TOAST:
            return {
                ...state,
                toasts: [action.toast, ...state.toasts],
            };
        case ActionTypes.REMOVE_TOAST:
            if (state.toasts.some((t) => t.id === action.id)) {
                return {
                    ...state,
                    toasts: state.toasts.filter((toast) => toast.id !== action.id),
                };
            } return state;

        case ActionTypes.UPDATE_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.toast.id ? { ...toast,
                        ...action.toast,
                        options: {
                            ...toast.options,
                            ...action.toast.options,
                            closeButton:{
                                ...toast.options?.closeButton,
                                ...action.toast.options?.closeButton,
                            },
                            progressBar:{
                                ...toast.options?.progressBar,
                                ...action.toast.options?.progressBar,
                            },
                            iconProps: {
                                ...toast.options?.iconProps,
                                ...action.toast.options?.iconProps,}
                        }
                } : toast

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
