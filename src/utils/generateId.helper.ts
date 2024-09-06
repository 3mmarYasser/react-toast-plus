import {ToastProps} from "../types/Toast.types.ts";

export const generateId = ():ToastProps['id'] => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
