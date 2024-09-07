import  { FunctionComponent } from 'react';
import {ToastContainerProps} from "../../types/Toast.types.ts";
import {classNames} from "../../utils/classNames.helper.ts";



const ToastContainer: FunctionComponent<ToastContainerProps> = ({children , className , style}) => {

  return (
      <div className={classNames("react-toast-plus" , className)} style={{
          position: 'fixed',
          zIndex: 9999,
          inset: 5,
          pointerEvents: 'none',
          ...style
      }}>
          {children}
      </div>
  );
};

export default ToastContainer;
