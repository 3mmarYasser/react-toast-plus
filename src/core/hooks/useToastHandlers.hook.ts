import {useCallback} from "react";
import {ActionTypes, ToastContextProps} from "react-toast-plus";
import {useToastStore} from "./useToastStore.hook.ts";

export const useToastHandlers = () => {
    const {toasts ,dispatch} = useToastStore();

    const updateToastElement = (id: ToastContextProps['id'], element: ToastContextProps['element']) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast: { id, element } });
    }

    const calcToastOffset = useCallback(()=>{

    },[toasts]);

    return {
        updateToastElement,
        calcToastOffset,
    };
}