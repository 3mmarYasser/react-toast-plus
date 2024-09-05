import { useContext } from 'react';
import {ToastContext} from "../context/ToastProvider/ToastProvider.context.tsx";
import {ActionTypes, ToastData} from "../../types/Toast.types.ts";

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    const { dispatch } = context;

    const addToast = (message: ToastData["message"], type: ToastData['type']) => {
        const id = String(Date.now());
        dispatch({
            type: ActionTypes.ADD_TOAST,
            toast: {
                id,
                message,
                type,
                onClose: removeToast,
            },
        });
    };
    const removeToast = (id: string) => {
        dispatch({ type: ActionTypes.REMOVE_TOAST, id });
    };

    const removeAllToasts = () => {
        dispatch({ type: ActionTypes.REMOVE_ALL_TOASTS });
    };
    const updateToast = (toast: Partial<ToastData> & Pick<ToastData, 'id'>) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast });
    };

    return {
        success: (message: string) => addToast(message, 'success'),
        error: (message: string) => addToast(message, 'error'),
        warning: (message: string) => addToast(message, 'warning'),
        info: (message: string) => addToast(message, 'info'),
        removeToast,
        removeAllToasts,
        updateToast,
    };
};
