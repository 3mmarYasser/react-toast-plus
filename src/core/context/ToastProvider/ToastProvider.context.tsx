'use client';

import { FunctionComponent, createContext, useReducer, useEffect, createElement } from 'react';
import { createPortal } from "react-dom";
import ToastContainer from "../../../components/ToastContainer/ToastContainer.component";
import { toastReducer } from "../../store/toast.store";
import Toaster from "../../../components/Toaster/Toaster.component";
import { DEFAULT_TOAST_LOADING_OPTIONS, Gutter, TOAST_DEFAULT_OPTIONS } from "../../config/config";
import { mergeOptions } from "../../../utils/mergeOptions.helper";
import ToastController from "../../controller/Toast.controller";
import { GlobalStyles } from "../../../styles";
import { ToastContextType, ToastOptions, ToastProviderProps, ToastType } from "../../../types";
import { setup } from "goober";

setup(createElement);

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider: FunctionComponent<ToastProviderProps> = ({
                                                                  children,
                                                                  containerOptions = {},
                                                                  toastOptions = {},
                                                                  gutter = Gutter,
                                                                  newestFirst,
                                                                  toastStyles,
                                                                  portalActive
                                                              }) => {
    const [state, dispatch] = useReducer(toastReducer, {
        toasts: []
    });

    const {
        portalSelector = typeof document !== 'undefined' ? document.body : null,
        component: ContainerComponent = ToastContainer,
        ...containerOpts
    } = containerOptions;

    const {
        component: ToastComponent = Toaster,
        successOptions = {},
        errorOptions = {},
        warningOptions = {},
        infoOptions = {},
        emptyOptions = {},
        loadingOptions = DEFAULT_TOAST_LOADING_OPTIONS,
        ...defaultOpts
    } = toastOptions;

    const typeOptionsMap: Record<ToastType, object> = {
        success: successOptions,
        error: errorOptions,
        warning: warningOptions,
        info: infoOptions,
        empty: emptyOptions,
        loading: loadingOptions
    };

    useEffect(() => {
        GlobalStyles(toastStyles);
    }, [toastStyles]);

    // Determine if we're in a Next.js environment
    const isNextJs = typeof window !== 'undefined' && '__NEXT_DATA__' in window;

    // Set portalActive based on the environment if it's not explicitly provided
    const isPortalActive = portalActive ?? !isNextJs;

    const toastContent = (
        <ContainerComponent {...containerOpts}>
            {state.toasts.map((toast) => {
                const { options, renderCustomToast, ...rest } = toast;
                const typeSpecificOptions: ToastOptions = typeOptionsMap[toast.type as ToastType] || {};
                const mergedOptions = mergeOptions(
                    TOAST_DEFAULT_OPTIONS,
                    defaultOpts,
                    typeSpecificOptions,
                    options
                );

                return (
                    <ToastController
                        gutter={gutter}
                        key={`Controller_${toast.id}`}
                        toastContextProps={{ ...rest, options: mergedOptions }}
                        newestFirst={newestFirst}
                    >
                        {renderCustomToast || ToastComponent}
                    </ToastController>
                );
            })}
        </ContainerComponent>
    );

    return (
        <ToastContext.Provider value={{ state, dispatch }}>
            {children}
            {isPortalActive && portalSelector
                ? createPortal(toastContent, portalSelector)
                : toastContent}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
