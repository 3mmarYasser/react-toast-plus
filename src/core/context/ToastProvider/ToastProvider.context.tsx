import {FunctionComponent, createContext, useReducer} from 'react';
import {ToastContextType, ToastOptions, ToastProviderProps, ToastType} from "../../../types/Toast.types.ts";
import ToastContainer from "../../../components/ToastContainer/ToastContainer.component.tsx";
import {createPortal} from "react-dom";
import {toastReducer} from "../../store/toast.store.ts";
import Toaster from "../../../components/Toaster/Toaster.component.tsx";
import {Gutter, TOAST_DEFAULT_OPTIONS} from "../../config/config.ts";
import {mergeOptions} from "../../../utils/mergeOptions.helper.ts";
import ToastController from "../../controller/Toast.controller.tsx";


export const ToastContext = createContext<ToastContextType |undefined>(undefined);

const ToastProvider: FunctionComponent<ToastProviderProps> = ({children ,containerOptions ={} ,toastOptions={} ,gutter = Gutter}) => {
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
    ...defaultOpts } = toastOptions;

  const typeOptionsMap:Record<ToastType, object> = {
    success: successOptions,
    error: errorOptions,
    warning: warningOptions,
    info: infoOptions,
    empty: emptyOptions,
  };

  return (
      <ToastContext.Provider value={{state, dispatch}}>
        {children}
        {createPortal(
            <ContainerComponent {...containerOpts}>
                {state.toasts.map((toast) => {
                  const {options , ...rest} = toast;
                  const typeSpecificOptions:ToastOptions = typeOptionsMap[toast.type as ToastType] || {};
                  const mergedOptions = mergeOptions(
                      TOAST_DEFAULT_OPTIONS,            // Default toast options
                      defaultOpts,                       // Provider-level default options
                      typeSpecificOptions,               // Type-specific options (success, error, etc.)
                      options                            // Toast-specific options
                  );

                  return (<ToastController gutter={gutter}  key={toast.id}  toastContextProps={{...rest , options:mergedOptions}}>
                    {ToastComponent}
                  </ToastController>)
                })}
            </ContainerComponent>
            ,portalSelector  )}
      </ToastContext.Provider>
  );
};

export default ToastProvider;
