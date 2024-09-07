import {FunctionComponent, useEffect} from 'react';
import {ToastControllerProps} from "react-toast-plus";
import {useAutoClose} from "../hooks/useAutoClose.hook.ts";


const ToastController: FunctionComponent<ToastControllerProps>= ({children:Children , toastContextProps}) => {
  const autoClose = useAutoClose(toastContextProps.id);
  useEffect(() => {
    if (toastContextProps.options?.autoClose && toastContextProps.options?.lifetime) {
      autoClose.start(toastContextProps.options.lifetime, toastContextProps.onClose);
    }
  }, [autoClose.start, toastContextProps.onClose, toastContextProps.options?.autoClose, toastContextProps.options?.lifetime]);

  return (<Children {...toastContextProps} {...autoClose} />);
};

export default ToastController;
