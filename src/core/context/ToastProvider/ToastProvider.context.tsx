import  {FunctionComponent, ReactNode, createContext, useReducer} from 'react';
import {ToastContextType} from "../../../types/Toast.types.ts";
import ToastContainer from "../../../components/ToastContainer/ToastContainer.component.tsx";
import {createPortal} from "react-dom";
import {toastReducer} from "../../store/toast.store.ts";


interface  ToastProviderProps{
  children: ReactNode;
}
type Props = ToastProviderProps;

export const ToastContext = createContext<ToastContextType |undefined>(undefined);

const ToastProvider: FunctionComponent<Props> = ({children}) => {
  const [state, dispatch] = useReducer(toastReducer,{
    toasts: []
  })
  return (
      <ToastContext.Provider value={{state, dispatch}}>
        {children}
        {createPortal(<ToastContainer toasts={state.toasts}/>, document.body)}
      </ToastContext.Provider>
  );
};

export default ToastProvider;
