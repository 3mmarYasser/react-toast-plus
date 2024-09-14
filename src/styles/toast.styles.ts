// noinspection CssUnresolvedCustomProperty

import {css, styled} from "goober";

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
`;

export const StyledToaster = styled('div')`
    display: flex;
    background: var(--toast-bg-color);
    color: var(--toast-text-color);
    will-change: transform;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    width: var(--toast-width);
    pointer-events: auto;
    padding: 10px 8px;
    border-radius: 8px;
`;