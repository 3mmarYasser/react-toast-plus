import { FunctionComponent } from 'react';
import {ToastData} from "../../types/Toast.types.ts";

type Props = ToastData;

const ToasterComponent: FunctionComponent<Props> = ({id  ,message ,onClose ,type = 'info'}) => {

  return (
      <div className={`toast ${type}`}>
          <p>{message}</p>
          <button onClick={() => onClose(id)}>Close</button>
      </div>
  );
};

export default ToasterComponent;
