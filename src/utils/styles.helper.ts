
import React from "react";
import {
    Placement,
    ToastTransitionType,
    TransitionCustomTransitionStyle, TransitionsMap,
    TransitionState
} from "../types/Toast.types.ts";

export const getTransitionStyles = (state: TransitionState, type: ToastTransitionType ,duration:number ,placement:Placement): React.CSSProperties => {
    const right:number = placement.includes("right")? 1 : -1;
    const center:boolean = placement.includes("center");
    const customTransitions:TransitionCustomTransitionStyle = {
        slide: `all ${duration}ms cubic-bezier(0.68, -0.55, 0.25, 1.35)`,
    };

    const transitions: TransitionsMap = {
        fade: {
            entering: { opacity: 0},
            entered: { opacity: 1},
            exiting: { opacity: 0},
            exited: { opacity: 0},
        },
        zoom: {
            entering: { transform: 'scale(0)' },
            entered: { transform: 'scale(1)' },
            exiting: { transform: 'scale(0)' },
            exited: { transform: 'scale(0)' },
        },
        slide: {
            entering: { transform: `translateX(${right * (center?50:100)}%)`, opacity: 0},
            entered: { transform: 'translateX(0)',opacity: 1},
            exiting: { transform: `translateX(${right * (center?50:100)}%)`,opacity: center?0:1},
            exited: { transform: `translateX(${right * (center?50:100)}%)` ,opacity: center?0:1},
        },
        bounce: {
            entering: { animation: 'bounceIn 0.5s' },
            entered: {animation: 'bounceIn 0.5s'},
            exiting: { animation: 'bounceOut 0.5s' },
            exited: {animation: 'bounceOut 0.5s'},
        },
        // Define other transitions similarly
        flip: {
            entering: { transform: 'rotateY(180deg)' },
            entered: { transform: 'rotateY(0deg)' },
            exiting: { transform: 'rotateY(180deg)' },
            exited: { transform: 'rotateY(180deg)' },
        },
        rotate: {
            entering: { transform: 'rotate(0deg)' },
            entered: { transform: 'rotate(360deg)' },
            exiting: { transform: 'rotate(0deg)' },
            exited: { transform: 'rotate(0deg)' },
        },
        scale: {
            entering: { transform: 'scale(0)' },
            entered: { transform: 'scale(1)' },
            exiting: { transform: 'scale(0)' },
            exited: { transform: 'scale(0)' },
        },
        swirl: {
            entering: { transform: 'rotate(0deg) scale(0)' },
            entered: { transform: 'rotate(360deg) scale(1)' },
            exiting: { transform: 'rotate(0deg) scale(0)' },
            exited: { transform: 'rotate(0deg) scale(0)'  },
        },
    };

    return Object.assign({transition: customTransitions[type] ?? `all  ${duration}ms ease-in-out`} ,transitions[type]?.[state]) || {};
};

export const getPositionStyles = (placement: Placement | undefined): React.CSSProperties => {
    switch (placement) {
        case 'top-left':
        case 'bottom-left':
            return {justifyContent: 'flex-start', left: 0};
        case 'top-center':
        case 'bottom-center':
            return {justifyContent: 'center', left: 0, right: 0};
        case 'top-right':
        case 'bottom-right':
            return {justifyContent: 'flex-end', right: 0};
        default:
            return {justifyContent: 'flex-end', right: 0};
    }
};