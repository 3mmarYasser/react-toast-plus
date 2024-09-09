import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react';
import {useAutoClose} from "../hooks/useAutoClose.hook.ts";
import {useToastHandlers} from "../hooks/useToastHandlers.hook.ts";
import {Placement, ToastContextProps, ToastControllerProps} from "../../types/Toast.types.ts";
import {useToast} from "../hooks/useToast.hook.ts";
import {TOAST_PLACEMENT} from "../config/config.ts";
import {CSSTransition} from "react-transition-group";

export type ToastTransitionType =
    | 'fade'
    | 'zoom'
    | 'slide'
    | 'bounce'
    | 'flip'
    | 'rotate'
    | 'scale'
    | 'swirl';

const ToastController: FunctionComponent<ToastControllerProps>= ({children:Children , toastContextProps ,gutter}) => {
  const autoCloseProps = useAutoClose(toastContextProps.id);
  const {updateToastElement ,calcToastOffset}=useToastHandlers();
  const {updateToast}=useToast();
  const [inProp, setInProp] = useState(false);

  const {autoClose , lifetime ,placement = TOAST_PLACEMENT , pauseOnHover} = toastContextProps.options||{};


  useEffect(() => {
    updateToast({
        id: toastContextProps.id,
      options:{
          placement:placement
      }
    });
    setInProp(true);
  }, [placement]);

  const prevElementRefProps = useRef<Required<ToastContextProps["element"]>>({
    height: 0,
  });
  const ref  = useCallback((el:HTMLElement|null)=>{
    if (el) {
      const updateElement = () => {
        const currentHeight = el.clientHeight;
        if (prevElementRefProps.current && prevElementRefProps.current?.height !== currentHeight && currentHeight > 0) {
          prevElementRefProps.current.height = currentHeight;
          updateToastElement(toastContextProps.id, { height: currentHeight });
        }
      };
      updateElement();
      new  ResizeObserver(updateElement).observe(el ,{box: 'border-box'});
    }
  },[toastContextProps.id, updateToastElement]);



  useEffect(() => {
    if (autoClose && lifetime) {
      autoCloseProps.start(lifetime, toastContextProps.onClose);
    }
  }, [autoClose, lifetime]);

  const handleClose:ToastContextProps['onClose'] = useCallback((id) => {
    if (autoClose && autoCloseProps.isRunning()) {
      autoCloseProps.clear();
    }
    setInProp(false); // Toast leaving
    setTimeout(() => toastContextProps.onClose(id), 300);
    }, [autoCloseProps, toastContextProps.onClose]);

  const offset = calcToastOffset(toastContextProps ,{gutter});
  const getTransitionClass = (transition: ToastTransitionType) => {
    switch (transition) {
      case 'zoom':
        return 'zoom-toast';
      case 'slide':
        return `slide-${placement.includes('top') ? 'down' : 'up'}-toast`;
      case 'bounce':
        return `bounce-${placement.includes('top') ? 'down' : 'up'}-toast`;
      case 'flip':
        return 'flip-toast';
      default:
        return 'fade-toast';
    }
  };
  return (
      <CSSTransition
          in={inProp}
          timeout={300}
          classNames={getTransitionClass("slide")}
          onExited={() => handleClose(toastContextProps.id)}
          unmountOnExit>
        <div ref={ref}
             {...pauseOnHover &&
             {
               onMouseEnter: autoCloseProps.pause,
               onMouseLeave: autoCloseProps.resume,
             }
             }
             style={{
               marginBottom: '10px',
               display: 'flex',
               transform: `translateY(${offset * (placement.includes('top') ? 1 : -1)}px)`,
               position: 'absolute',
               transition: 'all 0.3s ease, opacity 0.3s ease',
               ...getPositionStyles(placement),
               ...getPlacementStyles(placement)
             }}>
          <Children {...toastContextProps} {...autoCloseProps} onClose={handleClose}/>
        </div>
      </CSSTransition>
  );
};
const getPositionStyles = (placement: Placement | undefined): React.CSSProperties => {
  switch (placement) {
    case 'top-left':
    case 'bottom-left':
      return {justifyContent: 'flex-start', left: 0};
    case 'top-center':
    case 'bottom-center':
      return {justifyContent: 'center', left: 0, right: 0};
    case 'top-right':
    case 'bottom-right':
      return {justifyContent: 'flex-end', right: 0};
    default:
      return {justifyContent: 'flex-end', right: 0}; // Default to 'top-right'
  }
};
const getPlacementStyles = (placement: Placement | undefined): React.CSSProperties => {
  switch (placement) {
    case 'top-left':
    case 'top-center':
    case 'top-right':
      return { top: 0 };
    case 'bottom-left':
    case 'bottom-center':
    case 'bottom-right':
    return { bottom: 0 };

    default:
      return { top: 0 };
  }
}
export default ToastController;
