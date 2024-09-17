// noinspection CssUnresolvedCustomProperty

import {keyframes, styled} from "goober";
import {ToastType} from "../types";
import {colorByType} from "./glob.styles.ts";

export const StyledIcon = styled('div')`
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
`;

export const rotationAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const drawStroke  = keyframes`
    0% {
        stroke-dashoffset: 100%;
    }

    100% {
        stroke-dashoffset: 0;
    }
`;
export const growCircle = keyframes`
    0% {
        r: 0;
    }
`;
export const growCircleBigger = keyframes`
    50% {
        opacity: 0.11;
    }
    100% {
        r: 100;
        opacity: 0;
    }
`;



export const StyledLoadingIcon = styled('span')`
    width: 100%;
    height: 100%;
    border: 2px solid var(--toast-loader-area-color);
    border-bottom-color: var(--toast-loader-color);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotationAnimation} 1s linear infinite;`
;

export const StyledBaseIcon = styled('svg')<{type:ToastType}>`
    display: block;
    width: 100%;
    height: 100%;
    color: ${props => colorByType[props.type]};

    & circle:nth-of-type(1) {
                fill: currentColor;
                opacity: 0.15;
                animation: ${growCircle} 0.45s cubic-bezier(0.66, 0.23, 0.51, 1.23) backwards,
                ${growCircleBigger} 0.9s linear 1.1s forwards;
        }

        & circle:nth-of-type(2) {
                fill: currentColor;
                opacity: 0.8;
                animation: ${growCircle} 0.5s cubic-bezier(0.66, 0.23, 0.51, 1.23) 0.25s backwards;
        }
    & polyline , & line ,& path ,& path {
        stroke: var(--toast-bg-color);
        stroke-width: 20;
        stroke-dasharray: 100%, 100%;
        stroke-dashoffset: 0;
        animation: ${drawStroke} 0.5s cubic-bezier(0.55, 0.2, 0.71, -0.04) 0.7s backwards;
    }
`;
