import {FunctionComponent, isValidElement, useEffect, useState} from 'react';
import {StyledToaster} from "../../styles";
import {ToastProps} from "../../types";

const ToasterComponent: FunctionComponent<ToastProps> = (props) => {
    const {id  ,content ,onClose   ,options ={}  ,remainingTime } = props;
    const {
        className ,
        style ,
        lifetime,
        autoClose
    } = options;
    const [remaining, setRemaining] = useState<number>(remainingTime || lifetime ||0);
    // useEffect(() => {
    //     console.log(remaining);
    // }, [remaining]);
    useEffect(() => {
        if(remainingTime &&autoClose){
            const interval = setInterval(() => {
                const timeLeft = remainingTime();
                // console.log(remainingTime());
                setRemaining(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [id, onClose, remainingTime ,autoClose]);

    const progressPercentage = lifetime ? (remaining / lifetime) * 100 : 100;
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
          {renderContent()}
          <button style={{
              marginLeft: '100px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'red',
          }} onClick={() => {
              onClose(id);
          }}>X</button>
          <div
              style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '4px',
                  backgroundColor: '#00bfff',  // Customize color
                  width: `${progressPercentage}%`,
              }}
          />
      </StyledToaster>
  );
};

export default ToasterComponent;
