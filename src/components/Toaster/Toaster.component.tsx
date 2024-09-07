import {FunctionComponent} from 'react';
import {ToastProps} from "../../types/Toast.types.ts";

type Props = ToastProps;

const ToasterComponent: FunctionComponent<Props> = ({id  ,message ,onClose ,type = 'info' ,options ={}}) => {
    const {
        className ,
        style ,
        // autoClose ,
        lifetime ,
    } = options;

    // useEffect(() => {
    //     if (autoClose) {
    //         const timer = setTimeout(() => {
    //             onClose(id);
    //         }, lifetime);
    //
    //         return () => clearTimeout(timer);
    //     }
    // }, [id, onClose, autoClose, lifetime]);

  return (
      <div className={className} style={{
          display: 'flex',
          background:"white",
          color:"black",
          willChange:"transform",
          boxShadow:"0 0 10px rgba(0,0,0,0.1)",
          maxWidth:"15rem",
          pointerEvents:"auto",
          padding:"10px 8px",
          borderRadius:"8px",
          ...style,
      }}>
          <p>{message} {type} life time : {lifetime}</p>
           <button onClick={() => onClose(id)}>X</button>
      </div>
  );
};

export default ToasterComponent;
