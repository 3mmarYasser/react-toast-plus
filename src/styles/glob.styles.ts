import {ToastStylesProps} from "react-toast-plus";
import {DEFAULT_TOAST_STYLES} from "../core/config/config.ts";
import {glob} from "goober";

export const GlobalStyles = (toastStyle?:Partial<ToastStylesProps>)=>{
    const styles:ToastStylesProps = { ...DEFAULT_TOAST_STYLES, ...toastStyle };
    return glob`
        :root {
            --toast-width: ${styles.toastWidth};
            --toast-min-height: ${styles.toastMinHeight};
            --toast-font-family: ${styles.toastFontFamily};
            --toast-bg-color: ${styles.toastBgColor};
            --toast-text-color: ${styles.toastTextColor};
            --toast-success-icon-color: ${styles.toastSuccessIconColor};
            --toast-info-icon-color: ${styles.toastInfoIconColor};
            --toast-warning-icon-color: ${styles.toastWarningIconColor};
            --toast-error-icon-color: ${styles.toastErrorIconColor};
            --toast-loading-icon-color: ${styles.toastLoadingIconColor};
            --toast-radius: ${styles.toastRadius};
            --toast-z-index: ${styles.toastZIndex};
        }
    `;
}