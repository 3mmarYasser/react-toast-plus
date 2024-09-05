import { useContext } from 'react';
import {ToastContext} from "../context/ToastProvider/ToastProvider.context.tsx";
import {ActionTypes, ToastData} from "../../types/Toast.types.ts";
import {generateId} from "../../utils/generateId.helper.ts";

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    const { dispatch } = context;

    const addToast = (message: ToastData["message"], type: ToastData['type']):Pick<ToastData, "id"> => {
        const id = generateId();
        dispatch({
            type: ActionTypes.ADD_TOAST,
            toast: {
                id,
                message,
                type,
                onClose: removeToast,
            },
        });
        return {id};
    };
    addToast.success = (message: string) => addToast(message, 'success');
    addToast.error = (message: string) => addToast(message, 'error');
    addToast.warning = (message: string) => addToast(message, 'warning');
    addToast.info = (message: string) => addToast(message, 'info');
    addToast.empty = (message: string) => addToast(message, 'empty');

    const removeToast = (id: ToastData['id']) => {
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
    const updateToast = (toast: Partial<ToastData> & Pick<ToastData, 'id'>) => {
        dispatch({ type: ActionTypes.UPDATE_TOAST, toast });
    };

    return {
        addToast,
        removeToast,
        removeAllToasts,
        updateToast,
    };
};
