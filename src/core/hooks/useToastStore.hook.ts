import {useContext} from "react";
import {ToastContext} from "../context/ToastProvider/ToastProvider.context.tsx";

export const useToastStore = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    const { dispatch ,state} = context;
    return{
        toasts: state.toasts,
        dispatch
    }
};