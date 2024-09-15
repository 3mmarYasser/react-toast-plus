import {ToastContextProps} from "../types";

export const generateId = ():ToastContextProps['id'] => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
