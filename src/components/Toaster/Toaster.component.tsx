import React, {FunctionComponent, isValidElement} from 'react';
import {
    StyledCloseButton,
    StyledIcon,
    StyledLoadingIcon,
    StyledProgressBar,
    StyledToaster,
    StyledToasterContent,
} from "../../styles";
import {ToastProps, ToastType} from "../../types";
import {CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon} from "../Icons";


const typedIcons:Record<ToastType, React.ReactElement |null> = {
    success: <SuccessIcon/>,
    error: <ErrorIcon/>,
    warning:<WarningIcon/>,
    info: <InfoIcon/>,
    loading: <StyledLoadingIcon/>,
    empty: null
};

const ToasterComponent: FunctionComponent<ToastProps> = (props) => {
    const {id, type = 'empty', content, onClose, options = {}, isRunning} = props;
    const {
        className ,
        style ,
        lifetime,
        autoClose,
        progressBar,
        closeButton,
        icon,
        iconProps
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
          {(iconProps?.visible && ( typedIcons[type] || icon )) &&
              <StyledIcon className={iconProps?.className} style={iconProps?.style}>
                  {icon ?? typedIcons[type]}
              </StyledIcon>
          }
          <StyledToasterContent>
              {renderContent()}
          </StyledToasterContent>
          {(closeButton?.visible) &&
              <StyledCloseButton className={closeButton.className} style={closeButton.style} onClick={() => onClose(id)}>
                  <CloseIcon/>
              </StyledCloseButton>
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
