import {useCallback} from "react";
import {useToastStore} from "./useToastStore.hook.ts";
import {ActionTypes, ToastContextProps} from "../../types/Toast.types.ts";

export const useToastHandlers = () => {
    const {toasts ,dispatch} = useToastStore();

    const updateToastElement = (id: ToastContextProps['id'], element: ToastContextProps['element'] ) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast: { id, element } });
    }

    const calcToastOffset = useCallback((toast:ToastContextProps ,opts:{gutter:number,newestFirst:boolean}):number=>{
        const filledToasts = toasts.filter(t=>t.options?.placement === toast.options?.placement);
        const index = filledToasts.findIndex(t=>t.id === toast.id);
        return filledToasts.slice(...(opts.newestFirst ?[0,index]:[index+1])).reduce((acc, t) => {
            const height = t.element?.height ?? 0;
            return acc +opts.gutter + height;
        }, 0);
    },[toasts]);

    return {
        updateToastElement,
        calcToastOffset,
    };
}