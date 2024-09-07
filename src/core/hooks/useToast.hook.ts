import {ActionTypes, ToastOptions, ToastContextProps, ToastType} from "../../types/Toast.types.ts";
import {generateId} from "../../utils/generateId.helper.ts";
import {useToastStore} from "./useToastStore.hook.ts";

export const useToast = () => {
    const {dispatch , toasts} = useToastStore();

    const addToast = (message: ToastContextProps["message"], type: ToastType ,options?:ToastOptions):Pick<ToastContextProps, "id"> => {
        const id = generateId();
        dispatch({
            type: ActionTypes.ADD_TOAST,
            toast: {
                id,
                message,
                type,
                onClose: removeToast,
                options,
            },
        });
        return {
            id,
        };
    };

    const createToastMethod = (type: ToastType) => (message: ToastContextProps["message"], options?: ToastOptions) => addToast(message, type, options);
    addToast.success = createToastMethod('success');
    addToast.error = createToastMethod('error');
    addToast.warning = createToastMethod('warning');
    addToast.info = createToastMethod('info');
    addToast.empty = createToastMethod('empty');

    const removeToast = (id: ToastContextProps['id']) => {
        dispatch({ type: ActionTypes.REMOVE_TOAST, id });
    };
    removeToast.byIndex = (index: number) => {
        const id = toasts[index]?.id;
        if (id) {
            removeToast(id);
        }else {
            console.error('Invalid index');
        }
    }
    const removeAllToasts = () => {
        dispatch({ type: ActionTypes.REMOVE_ALL_TOASTS });
    };
    const updateToast = (toast: Omit<Partial<ToastContextProps>, "onClose" |"element" |"id"> & Pick<ToastContextProps, 'id'>) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast });
    };


    return {
        addToast,
        removeToast,
        removeAllToasts,
        updateToast,
    };
};
