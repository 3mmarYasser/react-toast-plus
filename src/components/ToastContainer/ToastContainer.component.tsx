import  { FunctionComponent } from 'react';
import {ToastContainerProps} from "../../types/Toast.types.ts";
import {classNames} from "../../utils/classNames.helper.ts";
import {StyledToastContainer} from "../../styles";



const ToastContainer: FunctionComponent<ToastContainerProps> = ({children , className , style}) => {
  return (
      <StyledToastContainer className={classNames("react-toast-plus" , className)} style={{...style
      }}>
          {children}
      </StyledToastContainer>
  );
};

export default ToastContainer;
