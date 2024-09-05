import {ToastData} from "../types/Toast.types.ts";

export const generateId = ():ToastData['id'] => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
