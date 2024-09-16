import {FunctionComponent, createContext, useReducer, useEffect} from 'react';
import ToastContainer from "../../../components/ToastContainer/ToastContainer.component.tsx";
import {createPortal} from "react-dom";
import {toastReducer} from "../../store/toast.store.ts";
import Toaster from "../../../components/Toaster/Toaster.component.tsx";
import {DEFAULT_TOAST_LOADING_OPTIONS, Gutter, TOAST_DEFAULT_OPTIONS} from "../../config/config.ts";
import {mergeOptions} from "../../../utils/mergeOptions.helper.ts";
import ToastController from "../../controller/Toast.controller.tsx";
import {GlobalStyles} from "../../../styles";
import {ToastContextType, ToastOptions, ToastProviderProps, ToastType} from "../../../types";

export const ToastContext = createContext<ToastContextType |undefined>(undefined);


const ToastProvider: FunctionComponent<ToastProviderProps> = ({children ,containerOptions ={} ,toastOptions={} ,gutter = Gutter ,newestFirst ,toastStyles}) => {
  const [state, dispatch] = useReducer(toastReducer,{
    toasts: []
  })
  const { portalSelector = document.body , component :ContainerComponent = ToastContainer , ...containerOpts } = containerOptions;
  const { component: ToastComponent = Toaster ,
    successOptions={} ,
    errorOptions={},
    warningOptions={},
    infoOptions={},
    emptyOptions={},
    loadingOptions=DEFAULT_TOAST_LOADING_OPTIONS,
    ...defaultOpts } = toastOptions;

  const typeOptionsMap:Record<ToastType, object> = {
    success: successOptions,
    error: errorOptions,
    warning: warningOptions,
    info: infoOptions,
    empty: emptyOptions,
    loading:loadingOptions
  };

  useEffect(() => {
    GlobalStyles(toastStyles);
  }, [toastStyles]);
  return (
      <ToastContext.Provider value={{state, dispatch}}>
        {children}
        {createPortal(
            <ContainerComponent {...containerOpts}>
                {state.toasts.map((toast) => {
                  const {options , renderCustomToast, ...rest} = toast;
                  const typeSpecificOptions:ToastOptions = typeOptionsMap[toast.type as ToastType] || {};
                  const mergedOptions = mergeOptions(
                      TOAST_DEFAULT_OPTIONS,            // Default toast options
                      defaultOpts,                       // Provider-level default options
                      typeSpecificOptions,               // Type-specific options (success, error, etc.)
                      options                            // Toast-specific options
                  );
                  const CustomComponent = renderCustomToast ;

                  return (<ToastController gutter={gutter}  key={`Controller_${toast.id}`}  toastContextProps={{...rest , options:mergedOptions}} newestFirst={newestFirst}>
                    {(CustomComponent) ? CustomComponent : ToastComponent}
                  </ToastController>)
                })}
            </ContainerComponent>
            ,portalSelector  )}
      </ToastContext.Provider>
  );
};

export default ToastProvider;
