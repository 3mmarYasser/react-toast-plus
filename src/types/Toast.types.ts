import React, {ReactNode} from "react";

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'empty'| 'loading';

type ToastTransitionType =
    | 'fade'
    | 'zoom'
    | 'slide'
    | 'bounce';

type TransitionState = 'unmounted'|'entering' | 'entered' | 'exiting' | 'exited';

type Placement =
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right';

export enum ActionTypes {
    ADD_TOAST = 'ADD_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST',
    UPDATE_TOAST = 'UPDATE_TOAST',
    REMOVE_ALL_TOASTS = 'REMOVE_ALL_TOASTS',
}

interface ToastOptions {
    className?: string;//✔
    style?: React.CSSProperties//✔
    lifetime?: number;//✔
    autoClose?: boolean;//✔
    pauseOnHover?: boolean;//✔
    pauseOnFocusLoss?: boolean;//✔
    draggableClose?: boolean;//✔
    closeOnClick?: boolean;//✔

    closeButton?: {
        visible?: boolean;//
        className?: string;//
        style?: React.CSSProperties;//
    };
    progressBar?:{
        visible?: boolean;//
        className?: string;//
        style?: React.CSSProperties;//
    }
    transition?: ToastTransitionType;//✔
    transitionDuration?: number;//✔
    placement?: Placement;//✔
    icon?: ReactNode;//
    iconProps?: {
        className?: string;//
        style?: React.CSSProperties;//
    }
}

interface ToastContextProps{
    id: string;
    message: string;
    onClose: (id: string) => void;
    type?:ToastType;
    options?: ToastOptions;
    element?: {
        height?: number;
    }
    renderCustomToast?: ((props: ToastProps) => ReactNode);
}
interface AutoCloseHandler {
    start: (duration: number, onEnd: ToastContextProps["onClose"]) => void;
    pause: () => void;
    resume: () => void;
    clear: () => void;
    remainingTime: () => number;
    isRunning:boolean;
    isPaused:boolean;
}

interface ToastProps extends Omit<ToastContextProps, "renderCustomToast">, Partial<AutoCloseHandler>{
}
interface State {
    toasts: ToastContextProps[];
}


type Action =
    | { type: ActionTypes.ADD_TOAST; toast: ToastContextProps }
    | { type: ActionTypes.REMOVE_TOAST; id: ToastContextProps["id"] }
    | { type: ActionTypes.UPDATE_TOAST; toast: Partial<ToastContextProps> & Pick<ToastContextProps, "id"> }
    | { type: ActionTypes.REMOVE_ALL_TOASTS };

type Dispatch = React.Dispatch<Action>;


interface ToastContextType {
    state: State;
    dispatch: Dispatch;
}
interface ToastContainerProps {
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}
interface containerOptions extends Omit<ToastContainerProps, "children">{
    component?: React.ElementType<ToastContainerProps>;
    portalSelector?: Element | DocumentFragment;
}
interface MainToastOptions extends  ToastOptions{
    component?: React.ElementType<ToastProps>;
    successOptions?: ToastOptions;
    errorOptions?: ToastOptions;
    warningOptions?: ToastOptions;
    infoOptions?: ToastOptions;
    emptyOptions?: ToastOptions;
    loadingOptions?: ToastOptions;
}

interface ToastProviderProps{
    children: ReactNode;
    newestFirst?:boolean;
    containerOptions?:containerOptions;
    toastOptions?:MainToastOptions;
    gutter?:number;
    toastStyles?:Partial<ToastStylesProps>;
}


interface ToastControllerProps {
    children: React.ElementType<ToastProps>;
    toastContextProps:ToastContextProps;
    gutter:number;
    newestFirst?:boolean;
}

 type TransitionStyles = {
    [key in TransitionState]: React.CSSProperties;
};

 type TransitionsMap = {
    [key in ToastTransitionType]: TransitionStyles;
};
type DefaultTransitionsMap = {
    [key in ToastTransitionType]:React.CSSProperties;
}
interface ToastStylesProps {
    toastWidth: string;
    toastMinHeight: string;
    toastFontFamily: string;
    toastBgColor: string;
    toastTextColor: string;
    toastSuccessIconColor: string;
    toastInfoIconColor: string;
    toastWarningIconColor: string;
    toastErrorIconColor: string;
    toastLoadingIconColor: string;
    toastRadius: string;
    toastZIndex: string;
}
export type
{
    ToastContextProps ,ToastType,ToastOptions, ToastContextType  ,
    Action ,State , Dispatch , Placement ,ToastProviderProps ,
    ToastContainerProps ,containerOptions ,AutoCloseHandler ,ToastProps , ToastControllerProps,
    ToastTransitionType, TransitionState ,TransitionStyles,TransitionsMap,DefaultTransitionsMap,
    ToastStylesProps
} ;