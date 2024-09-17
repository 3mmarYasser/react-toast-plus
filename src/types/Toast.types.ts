import React, {ReactNode} from "react";
import {AutoCloseHandler, ToastTransitionType} from "./index.ts";

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'empty'| 'loading';



type Placement =
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right';



interface ToastOptions {
    className?: string;
    style?: React.CSSProperties
    lifetime?: number;
    autoClose?: boolean;
    pauseOnHover?: boolean;
    pauseOnFocusLoss?: boolean;
    draggableClose?: boolean;
    closeOnClick?: boolean;

    closeButton?: {
        visible?: boolean;
        className?: string;
        style?: React.CSSProperties;
    };
    progressBar?:{
        visible?: boolean;
        className?: string;
        style?: React.CSSProperties;
    }
    transition?: ToastTransitionType;
    transitionDuration?: number;
    placement?: Placement;
    icon?: ReactNode;
    iconProps?: {
        visible?: boolean;
        className?: string;
        style?: React.CSSProperties;
    }
}

interface ToastContextProps{
    id: string;
    content: string | ReactNode | ((props: ToastProps) => ReactNode);
    onClose: (id: string) => void;
    type?:ToastType;
    options?: ToastOptions;
    element?: {
        height?: number;
    }
    renderCustomToast?: ((props: ToastProps) => ReactNode);
}


interface ToastProps extends Omit<ToastContextProps, "renderCustomToast">, Partial<AutoCloseHandler>{
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


interface ToastStylesProps {
    toastMaxWidth: string;
    toastMinWidth: string;
    toastMinHeight: string;
    toastFontFamily: string;
    toastBgColor: string;
    toastTextColor: string;
    toastEmptyColor: string;
    toastSuccessColor: string;
    toastInfoColor: string;
    toastWarningColor: string;
    toastErrorColor: string;
    toastLoaderColor: string;
    toastLoaderAreaColor: string;
    toastRadius: string;
    toastPadding: string;
    toastBoxShadow: string;
}
export type
{
    ToastContextProps ,ToastType,ToastOptions , Placement ,ToastProviderProps ,
    ToastContainerProps ,containerOptions  ,ToastProps , ToastControllerProps,
    ToastStylesProps
} ;