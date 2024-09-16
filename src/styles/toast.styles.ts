// noinspection CssUnresolvedCustomProperty

import {css, keyframes, styled} from "goober";
import {ToastType} from "react-toast-plus";
import {colorByType} from "./glob.styles.ts";

export const StyledToastContainer = styled('div')`
    position: fixed;
    z-index: 9999;
    inset: 5px;
    pointer-events: none;
`;

export const toastControllerClass = css`
    display: flex;
    position: absolute;
    box-sizing: border-box;
     > * {
        pointer-events: auto;
    }
`;

export const StyledToaster = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: var(--toast-bg-color);
    color: var(--toast-text-color);
    will-change: transform;
    box-shadow: var(--toast-shadow);
    max-width: var(--toast-max-width);
    min-width: var(--toast-min-width);
    max-height: var(--toast-max-height);
    border-radius: var(--toast-radius);
    font-family: var(--toast-font-family);
    overflow: hidden;
    padding: var(--toast-padding);
    gap: 1rem;
`;
export const StyledToasterContent = styled('div')`
    white-space: pre-line;
    flex: 1 1 auto;

`;
export const progressBarAnimation = keyframes`
    0% {
       transform: scaleX(1);
    }
    100% {
        transform: scaleX(0);
    }
`
export const StyledProgressBar = styled('div')<{type:ToastType ,duration:number , state:'running' | 'paused'}>`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    transform-origin: left;
    background-color:${props => colorByType[props.type]};
    animation: ${progressBarAnimation} linear 1 forwards;
    animation-duration: ${props => props.duration}ms;
    animation-play-state: ${props => props.state};
`;
export const CloseButton = styled('button')`
    border: none;
    background: none;
    cursor: pointer;
    color: inherit;
    text-transform: none;
    padding: 0;
    margin: 0;
    align-self: center;
    transition: opacity 0.3s;
    opacity: 0.5;
    flex: 0 0 auto;
    :hover{
        opacity: 1;
        color:var(--toast-error-color);
    }
    height: 1rem;
    width: 1rem;
    >svg{
        transition: color 0.3s;
        fill:currentColor;
    
    }
`;
