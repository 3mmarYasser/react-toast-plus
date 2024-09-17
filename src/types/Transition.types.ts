import React from "react";

type ToastTransitionType =
    | 'fade'
    | 'zoom'
    | 'slide'
    | 'bounce';


type TransitionState = 'unmounted' | 'entering' | 'entered' | 'exiting' | 'exited';

type TransitionStyles = {
    [key in TransitionState]: React.CSSProperties;
};

type TransitionsMap = {
    [key in ToastTransitionType]: TransitionStyles;
};
type DefaultTransitionsMap = {
    [key in ToastTransitionType]:React.CSSProperties;
}
export type {ToastTransitionType, TransitionState, TransitionStyles, TransitionsMap, DefaultTransitionsMap};