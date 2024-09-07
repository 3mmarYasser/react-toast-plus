import {AutoCloseHandler, ToastProps} from "react-toast-plus";
import {useCallback} from "react";

export const useAutoClose = (id:ToastProps["id"]): AutoCloseHandler => {
    let timeoutId: NodeJS.Timeout | null = null;
    let startTime: number = 0;
    let remaining: number = 0;
    let running: boolean = false;

    const start:AutoCloseHandler["start"] = (duration, onEnd) => {
        running = true;
        startTime = Date.now();
        remaining = duration;

        timeoutId = setTimeout(() => {
            running = false;
            onEnd(id);
        }, remaining);
    };

    const pause = () => {
        if (running && timeoutId) {
            clearTimeout(timeoutId);
            remaining -= Date.now() - startTime;
            running = false;
        }
    };

    const resume = () => {
        if (!running && remaining > 0) {
            startTime = Date.now();
            timeoutId = setTimeout(() => {
                running = false;
                remaining = 0;
            }, remaining);
            running = true;
        }
    };

    const clear = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            running = false;
        }
    };

    const remainingTime = useCallback(() => {
        if (running) {
            return remaining - (Date.now() - startTime);
        }
        return remaining;
    },[running, remaining, startTime]);

    const isRunning = () => running;

    return {
        start,
        pause,
        resume,
        clear,
        remainingTime,
        isRunning,
    };
};

