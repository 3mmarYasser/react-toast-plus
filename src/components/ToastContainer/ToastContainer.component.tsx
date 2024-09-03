import  { FunctionComponent } from 'react';
import {ToastData} from "../../types/Toast.types.ts";
import Toaster from "../Toaster/Toaster.component.tsx";

export interface ToastContainerProps {
    toasts: ToastData[];
}

type Props = ToastContainerProps;

const ToastContainer: FunctionComponent<Props> = ({toasts}) => {

  return (
      <div className="toast-container">
          {toasts.map((toast) => (
              <Toaster key={toast.id} {...toast} />
          ))}
      </div>
  );
};

export default ToastContainer;
