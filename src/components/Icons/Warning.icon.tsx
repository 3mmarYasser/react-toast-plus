import { FunctionComponent } from 'react';
import BaseIcon from "./Base.icon.tsx";


const WarningIcon: FunctionComponent = () => {

    return (
        <BaseIcon type={"warning"}>
            <path d="M107 50 L107 130"/>
            <path d="M 107 165.37 L 107 166.42"/>
        </BaseIcon>
    );
};

export default WarningIcon;
