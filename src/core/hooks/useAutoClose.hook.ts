import {useCallback, useEffect, useRef, useState} from 'react';
import {AutoCloseHandler, ToastContextProps, ToastProps} from "../../types";

export const useAutoClose = (id: ToastProps["id"] ,onEnd: ToastContextProps["onClose"] ,pauseOnFocusLoss?: boolean): AutoCloseHandler => {
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [remaining, setRemaining] = useState<number>(0);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    const start: AutoCloseHandler["start"] = useCallback((duration) => {
        if (!id) return;

        const newEndTime = Date.now() + duration;
        setEndTime(newEndTime);
        setRemaining(duration);
        setIsRunning(true);
        setIsPaused(false);

        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
            setIsRunning(false);
            setRemaining(0);
            if (id) {
                onEnd(id);
            }
        }, duration);

    }, [id]);

    const pause = useCallback(() => {
        if (isRunning && endTime) {
            const now = Date.now();
            const remainingTime = endTime - now;
            setRemaining(remainingTime);
            setIsRunning(false);
            setIsPaused(true);
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        }
    }, [isRunning, endTime]);

    const resume: AutoCloseHandler["resume"] = useCallback(() => {
        if (!isRunning && isPaused && remaining > 0) {
            const newEndTime = Date.now() + remaining;
            setEndTime(newEndTime);
            setIsRunning(true);
            setIsPaused(false);
            timeoutIdRef.current = setTimeout(() => {
                setIsRunning(false);
                setRemaining(0);
                if (id) {
                    onEnd(id);
                }
            }, remaining);
        }
    }, [isRunning, isPaused, remaining]);

    const clear = useCallback(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }
        setIsRunning(false);
        setIsPaused(false);
        setRemaining(0);
        setEndTime(null);
    }, []);

    const remainingTime = useCallback((): number => {
        if (isRunning && endTime) {
            return Math.max(0, endTime - Date.now());
        }
        return remaining;
    }, [isRunning, endTime, remaining]);

    useEffect(() => {
        if (pauseOnFocusLoss) {
            if (!document.hasFocus()) pause();

            window.addEventListener('blur', pause);
            window.addEventListener('focus', resume);

            return () => {
                window.removeEventListener('blur', pause);
                window.removeEventListener('focus', resume);
            };
        }
    }, [pauseOnFocusLoss, pause, resume]);

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
