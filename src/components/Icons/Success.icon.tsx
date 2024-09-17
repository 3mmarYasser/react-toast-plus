import  { FunctionComponent } from 'react';
import BaseIcon from "./Base.icon.tsx";


const SuccessIcon: FunctionComponent = () => {

  return (
      <BaseIcon type={"success"}>
          <polyline points="55 110 95 150 172.9 72.1"/>
      </BaseIcon>
    );
};

export default SuccessIcon;
