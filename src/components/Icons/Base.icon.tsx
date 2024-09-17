import React, { FunctionComponent ,ReactNode ,ReactElement } from 'react';
import {StyledBaseIcon} from "../../styles";
import {ToastType} from "react-toast-plus";

interface OwnProps {
    children?: ReactNode |ReactElement;
    type:ToastType
    svgOptions?:React.SVGProps<SVGSVGElement>
    circleOptions?:React.SVGProps<SVGCircleElement>
    gOptions?:React.SVGProps<SVGGElement>
}

type Props = OwnProps;

const BaseIcon: FunctionComponent<Props> = ({children , type ,svgOptions ,circleOptions ,gOptions} ) => {

  return (
      <StyledBaseIcon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 214 214"
          preserveAspectRatio="xMidYMid meet"
          {...svgOptions}
          type={type}
      >
          <g fill="none" stroke="currentColor" strokeWidth="2" {...gOptions}>
              <circle cx="107" cy="107" r="107" {...circleOptions}></circle>
              <circle cx="107" cy="107" r="107" {...circleOptions}></circle>
              {children}
          </g>
      </StyledBaseIcon>
  );
};

export default BaseIcon;
