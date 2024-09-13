import {Placement, ToastOptions, ToastTransitionType} from "../../types/Toast.types.ts";

export const TOAST_LIFETIME:ToastOptions['lifetime'] = 5000;
export const TOAST_PLACEMENT:Placement = 'top-right';
export const TOAST_TRANSITION_DURATION = 300;
export const TOAST_TRANSITION:ToastTransitionType = 'slide';
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
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: false,
    draggableClose: true,
    transitionDuration: TOAST_TRANSITION_DURATION,
    placement: TOAST_PLACEMENT,
    transition: TOAST_TRANSITION,
}
export const Gutter = 6;