import {classNames} from "./classNames.helper.ts";
import {ToastOptions} from "../types/Toast.types.ts";

export  const mergeOptions = (...optionsArray: Array<Partial<ToastOptions> | undefined>):ToastOptions => {
    const reversedOptionsArray = [...optionsArray].reverse();
    return  {
        // Merge className from all options
        className: classNames(
            ...optionsArray.map(option => option?.className).filter(Boolean)
        ),

        // Merge style from all options
        style: Object.assign({}, ...optionsArray.map(option => option?.style)),

        // For these fields, use the last defined value
        lifetime: reversedOptionsArray.find(option => option?.lifetime !== undefined)?.lifetime,
        autoClose: reversedOptionsArray.find(option => option?.autoClose !== undefined)?.autoClose,
        hideProgressBar: reversedOptionsArray.find(option => option?.hideProgressBar !== undefined)?.hideProgressBar,
        pauseOnHover: reversedOptionsArray.find(option => option?.pauseOnHover !== undefined)?.pauseOnHover,
        draggable: reversedOptionsArray.find(option => option?.draggable !== undefined)?.draggable,


        // Similar logic for progress className and style
        progressClassName: classNames(
            ...optionsArray.map(option => option?.progressClassName).filter(Boolean)
        ),
        progressStyle: Object.assign({}, ...optionsArray.map(option => option?.progressStyle)),

        // For transition and other non-style properties, use the last defined value
        transition: reversedOptionsArray.find(option => option?.transition !== undefined)?.transition,
        transitionDuration: reversedOptionsArray.find(option => option?.transitionDuration !== undefined)?.transitionDuration,
        placement: reversedOptionsArray.find(option => option?.placement !== undefined)?.placement,
        icon: reversedOptionsArray.find(option => option?.icon !== undefined)?.icon,

        // Merge icon props (className and style)
        iconProps: {
            className: classNames(
                ...optionsArray.map(option => option?.iconProps?.className).filter(Boolean)
            ),
            style: Object.assign({}, ...optionsArray.map(option => option?.iconProps?.style)),
        },
    };
};
