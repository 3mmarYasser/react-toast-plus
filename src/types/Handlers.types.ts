interface AutoCloseHandler {
    start: (duration: number) => void;
    pause: () => void;
    resume: () => void;
    clear: () => void;
    remainingTime: () => number;
    isRunning:boolean;
    isPaused:boolean;
}
export type {AutoCloseHandler};