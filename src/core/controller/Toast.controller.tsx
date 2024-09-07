import React, {FunctionComponent, useCallback, useEffect, useRef} from 'react';
import {Placement, ToastControllerProps} from "react-toast-plus";
import {useAutoClose} from "../hooks/useAutoClose.hook.ts";
import {useToastHandlers} from "../hooks/useToastHandlers.hook.ts";


const ToastController: FunctionComponent<ToastControllerProps>= ({children:Children , toastContextProps}) => {
  const autoCloseProps = useAutoClose(toastContextProps.id);
  const {updateToastElement}=useToastHandlers();

  const {autoClose , lifetime} = toastContextProps.options||{};

  const prevHeightRef = useRef<number | null>(null);

  const ref  = useCallback((el:HTMLElement|null)=>{
    if (el) {
      const updateElement = () => {
        const currentHeight = el.clientHeight;
        if (prevHeightRef.current !== currentHeight) {
          prevHeightRef.current = currentHeight; // Update the stored height
          updateToastElement(toastContextProps.id, { height: currentHeight });
        }
      };
      updateElement();
      new  ResizeObserver(updateElement).observe(el ,{box: 'border-box'});
    }
  },[]);

  useEffect(() => {
    if (autoClose && lifetime) {
      autoCloseProps.start(lifetime, toastContextProps.onClose);
    }
  }, [autoCloseProps.start, toastContextProps.onClose, toastContextProps.options?.autoClose, toastContextProps.options?.lifetime]);


  return (
      <div ref={ref} style={{
        ...getPositionStyles(undefined),
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center',
          transform: `translateY(0px)`,
          position: 'absolute',
          transition: 'all 0.3s ease',
      }}>
        <Children {...toastContextProps} {...autoCloseProps} />
      </div>
  );
};
const getPositionStyles = (placement: Placement|undefined):React.CSSProperties => {
  switch (placement) {
    case 'top-left':
      return { top: 0, left: 0 };
    case 'top-right':
      return { top: 0, right: 0 };
    case 'bottom-left':
      return { bottom: 0, left: 0 };
    case 'bottom-right':
      return { bottom: 0, right: 0 };
    default:
      return { left: 0, right: 0 }; // Default to top-right
  }
};
export default ToastController;
