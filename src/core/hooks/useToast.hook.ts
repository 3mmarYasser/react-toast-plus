import { useContext } from 'react';
import {ToastContext} from "../context/ToastProvider/ToastProvider.context.tsx";
import {ActionTypes, ToastOptions, ToastProps, ToastType} from "../../types/Toast.types.ts";
import {generateId} from "../../utils/generateId.helper.ts";

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    const { dispatch } = context;

    const addToast = (message: ToastProps["message"], type: ToastType ,options?:ToastOptions):Pick<ToastProps, "id"> => {
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
        return {id};
    };

    const createToastMethod = (type: ToastType) => (message: ToastProps["message"], options?: ToastOptions) => addToast(message, type, options);
    addToast.success = createToastMethod('success');
    addToast.error = createToastMethod('error');
    addToast.warning = createToastMethod('warning');
    addToast.info = createToastMethod('info');
    addToast.empty = createToastMethod('empty');

    const removeToast = (id: ToastProps['id']) => {
        dispatch({ type: ActionTypes.REMOVE_TOAST, id });
    };
    removeToast.byIndex = (index: number) => {
        const id = context.state.toasts[index]?.id;
        if (id) {
            removeToast(id);
        }else {
            console.error('Invalid index');
        }
    }
    const removeAllToasts = () => {
        dispatch({ type: ActionTypes.REMOVE_ALL_TOASTS });
    };
    const updateToast = (toast: Partial<ToastProps> & Pick<ToastProps, 'id'>) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast });
    };

    return {
        addToast,
        removeToast,
        removeAllToasts,
        updateToast,
        toasts: context.state.toasts
    };
};
