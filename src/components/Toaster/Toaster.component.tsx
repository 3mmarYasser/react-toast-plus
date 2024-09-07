import {FunctionComponent, useEffect, useState} from 'react';
import {ToastProps} from "../../types/Toast.types.ts";

const ToasterComponent: FunctionComponent<ToastProps> = ({id  ,message ,onClose ,type = 'info' ,options ={} ,remainingTime}) => {
    const {
        className ,
        style ,
        lifetime

    } = options;
    const [remaining, setRemaining] = useState<number>(remainingTime || lifetime ||0);

    useEffect(() => {
        if(remainingTime){
            const interval = setInterval(() => {
                const timeLeft = remainingTime();
                setRemaining(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    onClose(id);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [id, onClose, remainingTime]);

    const progressPercentage = lifetime ? (remaining / lifetime) * 100 : 100;
  return (
      <div className={className} style={{
          display: 'flex',
          background: "white",
          color: "black",
          willChange: "transform",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          maxWidth: "15rem",
          pointerEvents: "auto",
          padding: "10px 8px",
          borderRadius: "8px",
          ...style,
      }}>
          <p>{message} {type} life time : {remaining}</p>
          <button onClick={() => onClose(id)}>X</button>
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
      </div>
  );
};

export default ToasterComponent;
