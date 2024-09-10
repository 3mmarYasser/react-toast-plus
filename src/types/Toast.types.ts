import React, {ReactNode} from "react";

interface ToastOptions {
    className?: string;
    style?: React.CSSProperties;
    lifetime?: number;
    autoClose?: boolean;
    hideProgressBar?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    progressClassName?: string;
    progressStyle?: React.CSSProperties;
    transition?: ToastTransitionType;
    transitionDuration?: number;
    placement?: Placement;
    icon?: ReactNode;
    iconProps?: {
        className?: string;
        style?: React.CSSProperties;
    }
}
type ToastType = 'success' | 'error' | 'warning' | 'info' |'empty';

interface ToastContextProps{
    id: string;
    message: string;
    onClose: (id: string) => void;
    type?:ToastType;
    options?: ToastOptions;
    element?: {
        height?: number;
    }
}
interface AutoCloseHandler {
    start: (duration: number, onEnd: ToastContextProps["onClose"]) => void;
    pause: () => void;
    resume: () => void;
    clear: () => void;
    remainingTime: () => number;
    isRunning: () => boolean;
}

interface ToastProps extends ToastContextProps, Partial<AutoCloseHandler>{
    toastRef: React.RefObject<HTMLDivElement>;
}
interface State {
    toasts: ToastContextProps[];
}
export enum ActionTypes {
    ADD_TOAST = 'ADD_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST',
    UPDATE_TOAST = 'UPDATE_TOAST',
    REMOVE_ALL_TOASTS = 'REMOVE_ALL_TOASTS',
}

type Action =
    | { type: ActionTypes.ADD_TOAST; toast: ToastContextProps }
    | { type: ActionTypes.REMOVE_TOAST; id: ToastContextProps["id"] }
    | { type: ActionTypes.UPDATE_TOAST; toast: Partial<ToastContextProps> & Pick<ToastContextProps, "id"> }
    | { type: ActionTypes.REMOVE_ALL_TOASTS };

type Dispatch = React.Dispatch<Action>;

type Placement =
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right';
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
}

interface ToastProviderProps{
    children: ReactNode;
    placement?:Placement;
    newestFirst?:boolean;
    containerOptions?:containerOptions;
    toastOptions?:MainToastOptions;
    gutter?:number;
}


interface ToastControllerProps {
    children: React.ElementType<ToastProps>;
    toastContextProps:ToastContextProps;
    gutter:number;
}
 type ToastTransitionType =
    | 'fade'
    | 'zoom'
    | 'slide'
    | 'bounce'
    | 'flip'
    | 'rotate'
    | 'scale'
    | 'swirl';

 type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';
 type TransitionStyles = {
    [key in TransitionState]: React.CSSProperties;
};

 type TransitionsMap = {
    [key in ToastTransitionType]: TransitionStyles;
};

type TransitionCustomTransitionStyle = Partial<Record<ToastTransitionType, React.CSSProperties["transition"]>>;

export type
{
    ToastContextProps ,ToastType,ToastOptions, ToastContextType  ,
    Action ,State , Dispatch , Placement ,ToastProviderProps ,
    ToastContainerProps ,containerOptions ,AutoCloseHandler ,ToastProps , ToastControllerProps,
    ToastTransitionType, TransitionState ,TransitionStyles,TransitionsMap,TransitionCustomTransitionStyle
} ;