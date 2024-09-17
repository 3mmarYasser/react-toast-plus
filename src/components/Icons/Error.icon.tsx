import  { FunctionComponent } from 'react';
import BaseIcon from "./Base.icon.tsx";


const ErrorIcon: FunctionComponent = () => {

  return (
      <BaseIcon type={"error"}>
          <line x1="70" y1="70" x2="144" y2="144" />
          <line x1="144" y1="70" x2="70" y2="144" />
      </BaseIcon>
  );
};

export default ErrorIcon;
