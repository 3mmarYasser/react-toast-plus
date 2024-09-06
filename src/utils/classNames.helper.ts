export const classNames = (...args: Array<string | undefined | null | boolean>) => {
    return args
        .filter(Boolean)
        .join(' ')
        .trim(); // Removes any extra spaces
};