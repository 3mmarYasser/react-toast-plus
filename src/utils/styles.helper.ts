
import React from "react";
import {DefaultTransitionsMap, Placement, ToastTransitionType, TransitionsMap, TransitionState} from "../types";


export const getTransitionStyles = (state: TransitionState, type: ToastTransitionType ,duration:number ,placement:Placement): React.CSSProperties => {
    const right:number = placement.includes("right")? 1 : -1;
    const bottom:number = placement.includes("bottom")? 1 : -1;
    const center:boolean = placement.includes("center");

    const defaultTransitions:DefaultTransitionsMap = {
        fade:{
            transition: `all ${duration}ms  cubic-bezier(0.2, 0, 0, 1)`
        },
        slide:{},
        zoom:{},
        bounce:{
            transition: `all ${duration}ms cubic-bezier(0.68, -0.55, 0.25, 1.35)`,

        }
    };

    const transitions: TransitionsMap = {
        fade: {
            unmounted: {transform: `translate3d(0, ${bottom *120}%, 0) scale(0.4)`},
            entering: { transform: 'translate3d(0, 0, 0) scale(1)' },
            entered: { transform: 'translate3d(0, 0, 0) scale(1)' },
            exiting: { transform: `translate3d(0, ${bottom *60}%, 0) scale(0.4)` ,opacity: 0},
            exited: { transform: `translate3d(0, ${bottom *60}%, 0) scale(0.4)` ,opacity: 0},
        },
        zoom: {
            unmounted: { transform: 'scale(0)' },
            entering: { transform: 'scale(1)' },
            entered: { transform: 'scale(1)' },
            exiting: { transform: 'scale(0)' },
            exited: { transform: 'scale(0)' },
        },
        slide: {
            unmounted: { transform: `translateX(${right * (center?50:100)}%)`, opacity: center?0:1},
            entering: { transform: 'translateX(0)',opacity: 1},
            entered: { transform: 'translateX(0)',opacity: 1},
            exiting: { transform: `translateX(${right * (center?50:100)}%)`,opacity: center?0:1},
            exited: { transform: `translateX(${right * (center?50:100)}%)` ,opacity: center?0:1},
        },
        bounce:{
            unmounted: { transform: `translate3d(${center?`0 , ${bottom *50}%`:`${right * 100}% , 0`}, 0) scale(0.8)`, opacity: center?0:1},
            entering: { transform: 'translate3d(0, 0, 0) scale(1)' ,opacity: 1},
            entered: { transform: 'translate3d(0, 0, 0) scale(1)' ,opacity: 1},
            exiting: { transform: `translate3d(${center?`0 , ${bottom *50}%`:`${right * 100}% , 0`}, 0) scale(0.8)`,opacity: center?0:1},
            exited: {  transform: `translate3d(${center?`0 , ${bottom *50}%`:`${right * 100}% , 0`}, 0) scale(0.8)`,opacity: center?0:1},
        }

    };
    return Object.assign({transition:`all  ${duration}ms ease-in-out`},defaultTransitions[type],transitions[type]?.[state]) || {}

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
