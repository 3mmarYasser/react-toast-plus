import {FunctionComponent, isValidElement} from 'react';
import {CloseButton, StyledProgressBar, StyledToaster, StyledToasterContent} from "../../styles";
import {ToastProps} from "../../types";
import CloseIcon from "../Icons/Close.icon.tsx";

const ToasterComponent: FunctionComponent<ToastProps> = (props) => {
    const {id  ,type,content ,onClose   ,options ={} ,isRunning  } = props;
    const {
        className ,
        style ,
        lifetime,
        autoClose,
        progressBar,
        closeButton
    } = options;


    const renderContent = () => {
        if (typeof content === 'string') {
            return content;
        } else if (isValidElement(content)) {
            return content;
        } else if (typeof content === 'function') {
            return content(props);
        }
        return null;
    };

  return (
      <StyledToaster className={className} style={style} >
          <StyledToasterContent>
              {renderContent()}
          </StyledToasterContent>
          {(closeButton?.visible) &&
              <CloseButton className={closeButton.className} style={closeButton.style} onClick={() => onClose(id)}>
                  <CloseIcon/>
              </CloseButton>
          }
          {(autoClose && progressBar?.visible) &&
              <StyledProgressBar
                  key={`${id}-progress-bar`}
                  type={type ||'empty'}
                  state={isRunning ? 'running' : 'paused'}
                  duration={lifetime ?? 0}
                  className={progressBar.className}
                  style={progressBar.style}/>}

      </StyledToaster>
  );
};

export default ToasterComponent;
