import {FunctionComponent, useEffect, useState} from 'react';
import {ToastProps} from "../../types/Toast.types.ts";
import {StyledToaster} from "../../styles";

const ToasterComponent: FunctionComponent<ToastProps> = ({id  ,message ,onClose   ,options ={}  ,remainingTime }) => {
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

  return (
      <StyledToaster className={className} style={style} >
          <p>{message}</p>
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
