import {FunctionComponent, useState ,ReactNode  ,createContext} from 'react';
import {ToastData} from "../../types/Toast.types.ts";
import ToastContainer from "../../components/ToastContainer/ToastContainer.component.tsx";
import {createPortal} from "react-dom";


export interface ToastContextProps {
  addToast: (data: Partial<ToastData> & Pick<ToastData, "message">) => void;
  removeToast: (id: string) => void;
  updateToast: (id: string, data: Omit<Partial<ToastData>, "id">) => void;
  toasts: ToastData[];
  removeAllToasts: () => void;
}
interface  ToastProviderProps{
  children: ReactNode;
}
type Props = ToastProviderProps;

export const ToastContext = createContext<ToastContextProps |undefined>(undefined);

const ToastProvider: FunctionComponent<Props> = ({children}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast:ToastContextProps['addToast'] = ({message , id,type }):void => {
     id = id ||String(new Date().getTime());
    setToasts([...toasts, { id, message, onClose: removeToast  , type}]);
  };

  const removeToast:ToastContextProps['removeToast'] = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  const updateToast:ToastContextProps['updateToast'] = (id, data) => {
    setToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, ...data } : toast))
    );
  };
  const removeAllToasts:ToastContextProps['removeAllToasts'] = () => {
    setToasts([]);
  };

  return (
      <ToastContext.Provider value={{addToast ,removeToast ,updateToast ,toasts ,removeAllToasts}}>
        {children}
        {createPortal(<ToastContainer toasts={toasts}/>, document.body)}
      </ToastContext.Provider>
  );
};

export default ToastProvider;
