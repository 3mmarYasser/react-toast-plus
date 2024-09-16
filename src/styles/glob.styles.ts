import {DEFAULT_TOAST_STYLES} from "../core/config/config.ts";
import {glob} from "goober";
import {ToastStylesProps, ToastType} from "../types";

export const GlobalStyles = (toastStyle?:Partial<ToastStylesProps>)=>{
    const styles:ToastStylesProps = { ...DEFAULT_TOAST_STYLES, ...toastStyle };
    return glob`
        :root {
            --toast-max-width: ${styles.toastMaxWidth};
            --toast-min-width: ${styles.toastMinWidth};
            --toast-min-height: ${styles.toastMinHeight};
            --toast-font-family: ${styles.toastFontFamily};
            --toast-bg-color: ${styles.toastBgColor};
            --toast-text-color: ${styles.toastTextColor};
            --toast-empty-color: ${styles.toastEmptyColor};
            --toast-success-color: ${styles.toastSuccessColor};
            --toast-info-color: ${styles.toastInfoColor};
            --toast-warning-color: ${styles.toastWarningColor};
            --toast-error-color: ${styles.toastErrorColor};
            --toast-loading-color: ${styles.toastLoadingColor};
            --toast-radius: ${styles.toastRadius};
            --toast-padding: ${styles.toastPadding};
            --toast-shadow: ${styles.toastBoxShadow};
        }
    `;
}
export const colorByType:Record<ToastType,string> ={
    success: 'var(--toast-success-color)',
    info: 'var(--toast-info-color)',
    warning: 'var(--toast-warning-color)',
    error: 'var(--toast-error-color)',
    loading: 'var(--toast-loading-color)',
    empty: 'var(--toast-empty-color)',
}