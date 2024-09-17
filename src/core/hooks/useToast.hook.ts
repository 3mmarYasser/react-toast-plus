import {generateId} from "../../utils/generateId.helper.ts";
import {useToastStore} from "./useToastStore.hook.ts";
import {ActionTypes, ToastContextProps, ToastOptions, ToastType} from "../../types";

export const useToast = () => {
    const {dispatch , toasts} = useToastStore();

    const addToast = (content: ToastContextProps["content"], type: ToastType ,options?:ToastOptions):Pick<ToastContextProps, "id"> => {
        const id = generateId();
        dispatch({
            type: ActionTypes.ADD_TOAST,
            toast: {
                id,
                content,
                type,
                onClose: removeToast,
                options,
            },
        });
        return {
            id,
        };
    };

    const createToastMethod = (type: ToastType) => (message: ToastContextProps["content"], options?:ToastOptions) => addToast(message, type, options);
    addToast.success = createToastMethod('success');
    addToast.error = createToastMethod('error');
    addToast.warning = createToastMethod('warning');
    addToast.info = createToastMethod('info');
    addToast.empty = createToastMethod('empty');
    addToast.loading = createToastMethod('loading');

    addToast.promise = <T>(
        promiseOrFunction: Promise<T> | (() => Promise<T>),
        messages: {
            pending: string ,
            success: string | ((data: T) => string),
            error:  string | ((err: T) => string),
        },
        options?: Omit<ToastOptions, "autoClose" |"closeButton" |"draggableClose"> &{
            success?: ToastOptions,
            error?: ToastOptions
        }
    ) => {
        const {success ,error , ...rest} = options ||{};
        const id = addToast( messages.pending, 'loading' , rest).id;

        const promise = typeof promiseOrFunction === 'function' ? promiseOrFunction() : promiseOrFunction;
        promise
            .then((result) => {
                const successMessage = typeof messages.success === 'function' ? messages.success(result) : messages.success;
                updateToast({ id, content: successMessage, type: 'success', options:success });
            })
            .catch((err) => {
                const errorMessage = typeof messages.error === 'function' ? messages.error(err) : messages.error;
                updateToast({ id, content: errorMessage, type: 'error',options:error });
            });

        return {
            id,
        };
    };

    addToast.custom = (renderFunction:ToastContextProps["renderCustomToast"], options?: ToastOptions) => {
        const id = generateId();
        dispatch({
            type: ActionTypes.ADD_TOAST,
            toast: {
                id,
                content: "",
                onClose: removeToast,
                renderCustomToast: renderFunction,
                options
            },
        });

        return { id };
    };

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
