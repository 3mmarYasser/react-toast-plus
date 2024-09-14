import {useCallback, useRef, useState} from "react";
import {AutoCloseHandler, ToastProps} from "../../types/Toast.types.ts";

export const useAutoClose = (id:ToastProps["id"]): AutoCloseHandler => {
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const remainingRef = useRef<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);


    const start: AutoCloseHandler["start"] = useCallback((duration, onEnd) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        if (!id) return;

        setIsRunning(true);
        setIsPaused(false);
        startTimeRef.current = Date.now();
        remainingRef.current = duration;

        timeoutIdRef.current = setTimeout(() => {
            setIsRunning(false);
            if (id) {
                onEnd(id);
            }
        }, remainingRef.current);
    }, [id]);

    const pause = useCallback(() => {
        if (isRunning && timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            const elapsed = Date.now() - startTimeRef.current;
            remainingRef.current -= elapsed;
            setIsRunning(false);
            setIsPaused(true);
        }
    }, [isRunning]);

    const resume = useCallback(() => {
        if (!isRunning && isPaused && remainingRef.current > 0) {
            setIsRunning(true);
            setIsPaused(false);
            startTimeRef.current = Date.now();

            timeoutIdRef.current = setTimeout(() => {
                setIsRunning(false);
                remainingRef.current = 0;
            }, remainingRef.current);
        }
    }, [isRunning, isPaused]);

    const clear = useCallback(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
        setIsRunning(false);
        setIsPaused(false);
        remainingRef.current = 0;
    }, []);

    const remainingTime = useCallback((): number => {
        if (isRunning) {
            return remainingRef.current - (Date.now() - startTimeRef.current);
        }
        return remainingRef.current;
    }, [isRunning]);


    return {
        start,
        pause,
        resume,
        clear,
        remainingTime,
        isRunning,
        isPaused,
    };
};

