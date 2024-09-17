import {Placement, ToastOptions, ToastStylesProps, ToastTransitionType} from "../../types";

export const TOAST_LIFETIME:ToastOptions['lifetime'] = 5000;
export const TOAST_PLACEMENT:Placement = 'top-right';
export const TOAST_TRANSITION_DURATION = 300;
export const TOAST_TRANSITION:ToastTransitionType = 'bounce';
export const NEWEST_FIRST = true;
export const TOAST_DEFAULT_OPTIONS:ToastOptions = {
    lifetime: TOAST_LIFETIME,
    autoClose: true,
    progressBar: {
        visible: true,
    },
    closeButton:{
        visible: true,
    },
    iconProps: {
        visible: true,
    },
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: false,
    draggableClose: true,
    transitionDuration: TOAST_TRANSITION_DURATION,
    placement: TOAST_PLACEMENT,
    transition: TOAST_TRANSITION,
}
export const DEFAULT_TOAST_LOADING_OPTIONS:ToastOptions = {
    lifetime: 0,
    autoClose: false,
    progressBar: {
        visible: false,
    },
    closeButton:{
        visible: false,
    },

    pauseOnHover: false,
    pauseOnFocusLoss: false,
    closeOnClick: false,
    draggableClose: false,
}
export const Gutter = 6;

export const DEFAULT_TOAST_STYLES:ToastStylesProps = {
    toastMaxWidth: "320px",
    toastMinWidth: "150px",
    toastMinHeight: "48px",
    toastBgColor: "#FFF",
    toastTextColor: "#5C5C5C",
    toastEmptyColor: "#5C5C5C",
    toastSuccessColor: "#17c964",
    toastInfoColor: "#007bff",
    toastWarningColor: "#ffcc00",
    toastErrorColor: "#ff4d4f",
    toastLoaderColor: "gray",
    toastLoaderAreaColor: "rgba(0,0,0,0.1)",
    toastBoxShadow: "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
    toastPadding: "10px",
    toastRadius: "4px",
    toastFontFamily: "Verdana, sans-serif",
}