import React from "react";

 interface ToastData {
    id: string;
    message: string;
    onClose: (id: string) => void;
    type?: 'success' | 'error' | 'warning' | 'info';
}
interface State {
    toasts: ToastData[];
}
export enum ActionTypes {
    ADD_TOAST = 'ADD_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST',
    UPDATE_TOAST = 'UPDATE_TOAST',
    REMOVE_ALL_TOASTS = 'REMOVE_ALL_TOASTS',
}

type Action =
    | { type: ActionTypes.ADD_TOAST; toast: ToastData }
    | { type: ActionTypes.REMOVE_TOAST; id: ToastData["id"] }
    | { type: ActionTypes.UPDATE_TOAST; toast: Partial<ToastData> & Pick<ToastData, "id"> }
    | { type: ActionTypes.REMOVE_ALL_TOASTS };

 type Dispatch = React.Dispatch<Action>;

interface ToastContextType {
    state: State;
    dispatch: Dispatch;
}

export type { ToastData, ToastContextType  ,Action ,State , Dispatch};