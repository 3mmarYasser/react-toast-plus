import {ToastContextProps} from "../types/Toast.types.ts";

export const generateId = ():ToastContextProps['id'] => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;