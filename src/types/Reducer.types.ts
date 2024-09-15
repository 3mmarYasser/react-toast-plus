import React from "react";
import {ToastContextProps} from "./Toast.types.ts";

export enum ActionTypes {
    ADD_TOAST = 'ADD_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST',
    UPDATE_TOAST = 'UPDATE_TOAST',
    REMOVE_ALL_TOASTS = 'REMOVE_ALL_TOASTS',
}



type Action =
    | { type: ActionTypes.ADD_TOAST; toast: ToastContextProps }
    | { type: ActionTypes.REMOVE_TOAST; id: ToastContextProps["id"] }
    | { type: ActionTypes.UPDATE_TOAST; toast: Partial<ToastContextProps> & Pick<ToastContextProps, "id"> }
    | { type: ActionTypes.REMOVE_ALL_TOASTS };

type Dispatch = React.Dispatch<Action>;

interface State {
    toasts: ToastContextProps[];
}

interface ToastContextType {
    state: State;
    dispatch: Dispatch;
}
export type {Action, State, ToastContextType};