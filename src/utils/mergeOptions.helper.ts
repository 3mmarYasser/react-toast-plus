import {classNames} from "./classNames.helper.ts";
import {ToastOptions} from "../types";

export  const mergeOptions = (...optionsArray: Array<Partial<ToastOptions> | undefined>):ToastOptions => {
    const reversedOptionsArray = [...optionsArray].reverse();
    return  {
        className: classNames(
            ...optionsArray.map(option => option?.className).filter(Boolean)
        ),
        style: Object.assign({}, ...optionsArray.map(option => option?.style)),


        // use the last defined value
        lifetime: reversedOptionsArray.find(option => option?.lifetime !== undefined)?.lifetime,
        autoClose: reversedOptionsArray.find(option => option?.autoClose !== undefined)?.autoClose,
        pauseOnHover: reversedOptionsArray.find(option => option?.pauseOnHover !== undefined)?.pauseOnHover,
        draggableClose: reversedOptionsArray.find(option => option?.draggableClose !== undefined)?.draggableClose,
        pauseOnFocusLoss: reversedOptionsArray.find(option => option?.pauseOnFocusLoss !== undefined)?.pauseOnFocusLoss,
        closeOnClick: reversedOptionsArray.find(option => option?.closeOnClick !== undefined)?.closeOnClick,

        progressBar:{
            visible: reversedOptionsArray.find(option => option?.progressBar?.visible !== undefined)?.progressBar?.visible,
            className: classNames(
                ...optionsArray.map(option => option?.progressBar?.className).filter(Boolean)
            ),
            style: Object.assign({}, ...optionsArray.map(option => option?.progressBar?.style)),
        },

        closeButton:{
            visible: reversedOptionsArray.find(option => option?.closeButton?.visible !== undefined)?.closeButton?.visible,
            className: classNames(
                ...optionsArray.map(option => option?.closeButton?.className).filter(Boolean)
            ),
            style: Object.assign({}, ...optionsArray.map(option => option?.closeButton?.style)),
        },
        // use the last defined value
        transition: reversedOptionsArray.find(option => option?.transition !== undefined)?.transition,
        transitionDuration: reversedOptionsArray.find(option => option?.transitionDuration !== undefined)?.transitionDuration,
        placement: reversedOptionsArray.find(option => option?.placement !== undefined)?.placement,
        icon: reversedOptionsArray.find(option => option?.icon !== undefined)?.icon,

        // Merge props (className and style)
        iconProps: {
            className: classNames(
                ...optionsArray.map(option => option?.iconProps?.className).filter(Boolean)
            ),
            style: Object.assign({}, ...optionsArray.map(option => option?.iconProps?.style)),
        },
    };
};
