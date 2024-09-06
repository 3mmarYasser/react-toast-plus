import {ToastOptions} from "react-toast-plus";
import {classNames} from "./classNames.helper.ts";

export  const mergeOptions = (...optionsArray: Array<Partial<ToastOptions> | undefined>) => {
    return {
        // Merge className from all options
        className: classNames(
            ...optionsArray.map(option => option?.className).filter(Boolean)
        ),

        // Merge style from all options
        style: Object.assign({}, ...optionsArray.map(option => option?.style)),

        // For these fields, use the last defined value
        lifetime: optionsArray.reverse().find(option => option?.lifetime)?.lifetime,
        autoClose: optionsArray.reverse().find(option => option?.autoClose)?.autoClose,
        hideProgressBar: optionsArray.reverse().find(option => option?.hideProgressBar)?.hideProgressBar,
        pauseOnHover: optionsArray.reverse().find(option => option?.pauseOnHover)?.pauseOnHover,
        draggable: optionsArray.reverse().find(option => option?.draggable)?.draggable,

        // Similar logic for progress className and style
        progressClassName: classNames(
            ...optionsArray.map(option => option?.progressClassName).filter(Boolean)
        ),
        progressStyle: Object.assign({}, ...optionsArray.map(option => option?.progressStyle)),

        // For transition and other non-style properties, use the last defined value
        transition: optionsArray.reverse().find(option => option?.transition)?.transition,
        transitionDuration: optionsArray.reverse().find(option => option?.transitionDuration)?.transitionDuration,
        position: optionsArray.reverse().find(option => option?.position)?.position,
        icon: optionsArray.reverse().find(option => option?.icon)?.icon,

        // Merge icon props (className and style)
        iconProps: {
            className: classNames(
                ...optionsArray.map(option => option?.iconProps?.className).filter(Boolean)
            ),
            style: Object.assign({}, ...optionsArray.map(option => option?.iconProps?.style)),
        },
    };
};
