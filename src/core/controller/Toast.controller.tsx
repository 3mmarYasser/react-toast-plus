import React, {FunctionComponent, useCallback, useEffect, useRef} from 'react';
import {useAutoClose} from "../hooks/useAutoClose.hook.ts";
import {useToastHandlers} from "../hooks/useToastHandlers.hook.ts";
import {Placement, ToastContextProps, ToastControllerProps} from "../../types/Toast.types.ts";
import {useToast} from "../hooks/useToast.hook.ts";


const ToastController: FunctionComponent<ToastControllerProps>= ({children:Children , toastContextProps ,gutter}) => {
  const autoCloseProps = useAutoClose(toastContextProps.id);
  const {updateToastElement ,calcToastOffset}=useToastHandlers();
  const {updateToast}=useToast();

  const {autoClose , lifetime} = toastContextProps.options||{};

  const placement:Placement = toastContextProps.options?.placement || 'top-right';
  useEffect(() => {
    updateToast({
        id: toastContextProps.id,
      options:{
          placement
      }
    });
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
    toastContextProps.onClose(id);
  }, [autoCloseProps, toastContextProps.onClose]);

  const offset = calcToastOffset(toastContextProps ,{gutter});

  return (
      <div ref={ref} style={{
          marginBottom: '10px',
          display: 'flex',
          transform: `translateY(${offset * (placement.includes('top') ? 1 : -1) }px)`,
          position: 'absolute',
          transition: 'all 0.3s ease',
        ...getPositionStyles(undefined),

      }}>
        <Children {...toastContextProps} {...autoCloseProps} onClose={handleClose} />
      </div>
  );
};
const getPositionStyles = (placement: Placement|undefined):React.CSSProperties => {
  switch (placement) {
    case 'top-left':
    case 'bottom-left':
      return { justifyContent: 'flex-start', left: 0 };
    case 'top-center':
    case 'bottom-center':
      return { justifyContent: 'center', left: '50%', transform: 'translateX(-50%)' };
    case 'top-right':
    case 'bottom-right':
      return { justifyContent: 'flex-end', right: 0 };
    default:
      return { justifyContent: 'flex-end', right: 0 }; // Default to 'top-right'
  }
};
export default ToastController;
