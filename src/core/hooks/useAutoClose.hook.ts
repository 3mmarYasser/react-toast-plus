import {useCallback, useRef} from "react";
import {AutoCloseHandler, ToastProps} from "../../types/Toast.types.ts";

export const useAutoClose = (id:ToastProps["id"]): AutoCloseHandler => {
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const remainingRef = useRef<number>(0);
    const runningRef = useRef<boolean>(false);


    const start: AutoCloseHandler["start"] = useCallback((duration, onEnd) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        if (!id) return;

        runningRef.current = true;
        startTimeRef.current = Date.now();
        remainingRef.current = duration;

        timeoutIdRef.current = setTimeout(() => {
            runningRef.current = false;
            if (id) {
                onEnd(id);
            }
        }, remainingRef.current);
    }, [id]);

    const pause = useCallback(() => {
        if (runningRef.current && timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            const elapsed = Date.now() - startTimeRef.current;
            remainingRef.current -= elapsed;
            runningRef.current = false;
        }
    }, []);

    const resume = useCallback(() => {
        if (!runningRef.current && remainingRef.current > 0) {
            runningRef.current = true;
            startTimeRef.current = Date.now();

            timeoutIdRef.current = setTimeout(() => {
                runningRef.current = false;
                remainingRef.current = 0;
            }, remainingRef.current);
        }
    }, []);

    const clear = useCallback(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
        runningRef.current = false;
        remainingRef.current = 0;
    }, []);

    const remainingTime = useCallback((): number => {
        if (runningRef.current) {
            return remainingRef.current - (Date.now() - startTimeRef.current);
        }
        return remainingRef.current;
    }, []);

    const isRunning = useCallback((): boolean => {
        return runningRef.current;
    }, []);

    return {
        start,
        pause,
        resume,
        clear,
        remainingTime,
        isRunning,
    };
};

