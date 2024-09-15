import  { FunctionComponent } from 'react';
import {classNames} from "../../utils/classNames.helper.ts";
import {StyledToastContainer} from "../../styles";
import {ToastContainerProps} from "../../types";



const ToastContainer: FunctionComponent<ToastContainerProps> = ({children , className , style}) => {
  return (
      <StyledToastContainer className={classNames("react-toast-plus" , className)} style={{...style
      }}>
          {children}
      </StyledToastContainer>
  );
};

export default ToastContainer;
