import {useCallback} from "react";
import {useToastStore} from "./useToastStore.hook.ts";
import {ActionTypes, ToastContextProps} from "../../types/Toast.types.ts";

export const useToastHandlers = () => {
    const {toasts ,dispatch} = useToastStore();

    const updateToastElement = (id: ToastContextProps['id'], element: ToastContextProps['element'] ) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast: { id, element } });
    }

        const calcToastOffset = useCallback((toast:ToastContextProps ,opts:{gutter:number,newestFirst:boolean}):number=>{
        const bottom = toast.options?.placement?.includes("bottom");
        const filledToasts = toasts.filter(t=>t.options?.placement === toast.options?.placement);
        const index = filledToasts.findIndex(t=>t.id === toast.id);

            const sliceRange = bottom
                ? opts.newestFirst
                    ? [index + 1]
                    : [0, index]
                : opts.newestFirst
                    ? [0, index]
                    : [index + 1];

        return filledToasts.slice(...(sliceRange)).reduce((acc, t) => {
            const height = t.element?.height ?? 0;
            return acc +opts.gutter + height;
        }, 0);
    },[toasts]);

    return {
        updateToastElement,
        calcToastOffset,
    };
}