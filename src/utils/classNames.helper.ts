type ClassValue = string | undefined | null | boolean | Record<string, boolean>;

export const classNames = (...args: ClassValue[]): string => {
    return args
        .flatMap(arg => {
            if (typeof arg === 'string') {
                return arg;
            } else if (typeof arg === 'object' && arg !== null) {
                return Object.keys(arg).filter(key => arg[key]);
            }
            return [];
        })
        .filter(Boolean)
        .join(' ')
        .trim();
};