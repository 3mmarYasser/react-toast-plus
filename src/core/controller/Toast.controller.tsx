import {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react';
import {useAutoClose} from "../hooks/useAutoClose.hook.ts";
import {useToastHandlers} from "../hooks/useToastHandlers.hook.ts";
import {
  ToastContextProps,
  ToastControllerProps,
  TransitionState
} from "../../types/Toast.types.ts";
import {useToast} from "../hooks/useToast.hook.ts";
import {NEWEST_FIRST, TOAST_PLACEMENT, TOAST_TRANSITION, TOAST_TRANSITION_DURATION} from "../config/config.ts";
import {getPositionStyles, getTransitionStyles} from "../../utils/styles.helper.ts";
import {useDraggableClose} from "../hooks/useDraggableClose.hook.ts";
import {toastControllerClass} from "../../styles";


const ToastController: FunctionComponent<ToastControllerProps>= ({children:Children , toastContextProps ,gutter ,newestFirst =NEWEST_FIRST}) => {
  const [state, setState] = useState<TransitionState>('unmounted');
  const {updateToast}=useToast();
  const {updateToastElement ,calcToastOffset}=useToastHandlers();


  const {autoClose , lifetime ,placement = TOAST_PLACEMENT  ,
    transition =TOAST_TRANSITION , transitionDuration = TOAST_TRANSITION_DURATION ,
    draggableClose ,pauseOnHover ,pauseOnFocusLoss ,closeOnClick} = toastContextProps.options||{};

  const {
    dragDistance,
    opacity,
    handleDragStart,
    handleDragMove,
    handleDragEnd, isDragging,wasDragged
  } = useDraggableClose(toastContextProps.id, toastContextProps.onClose, draggableClose);

  const handleClose:ToastContextProps['onClose'] = useCallback((id) => {
    setState('exiting');
    setTimeout(() => {toastContextProps.onClose(id);},transitionDuration)
  }, [transitionDuration]);

  const autoCloseProps = useAutoClose(toastContextProps.id ,handleClose);




  useEffect(() => {
    updateToast({
      id: toastContextProps.id,
      options:{
        placement:placement
      }
    });
  }, [placement]);

  useEffect(() => {
    if (state === 'unmounted') {
      setState('entering');
    }
    if (state === 'entering') {
      const timeout = setTimeout(() => setState('entered'), transitionDuration);
      return () => clearTimeout(timeout);
    } else if (state === 'exiting') {
      const timeout = setTimeout(() => setState('exited'), transitionDuration);
      return () => clearTimeout(timeout);
    }
  }, [state, transitionDuration]);

  useEffect(() => {
    if (pauseOnFocusLoss && autoClose) {
      const handleWindowBlur = () => autoCloseProps.pause();
      const handleWindowFocus = () => autoCloseProps.resume();
      window.addEventListener('blur', handleWindowBlur);
      window.addEventListener('focus', handleWindowFocus);

      return () => {
        window.removeEventListener('blur', handleWindowBlur);
        window.removeEventListener('focus', handleWindowFocus);
      };
    }
  }, [pauseOnFocusLoss ,autoClose]);


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
      autoCloseProps.start(lifetime);
      return () => {
        autoCloseProps.clear();
      };
    }

  }, [autoClose, lifetime]);



  const handelCloseOnClick = useCallback(() => {
    if (!wasDragged) {
      handleClose(toastContextProps.id)
    }},[wasDragged]);

  const offset = calcToastOffset(toastContextProps,{gutter ,newestFirst})

  const newToastContextProps = {
    ...toastContextProps,
    options:{
      ...toastContextProps.options,
      style: {
        ...toastContextProps.options?.style,
        ...getTransitionStyles(state, transition,transitionDuration ,placement),
      },
    }
  };

  return (

            <div ref={ref}
                 className={toastControllerClass}
                 {...pauseOnHover &&
                 {
                   onMouseEnter: autoCloseProps.pause,
                   onMouseLeave: autoCloseProps.resume,
                 }
                 }
                 {...draggableClose && {
                   onMouseDown:handleDragStart,
                   onMouseMove:handleDragMove,
                   onMouseUp:handleDragEnd,
                   onTouchStart:handleDragStart,
                   onTouchMove:handleDragMove,
                   onTouchEnd:handleDragEnd
                 }}
                 {...closeOnClick && {
                   onClick: handelCloseOnClick
                 }}
                 style={{
                   transform: `translateY(${offset * (placement.includes('top') ? 1 : -1)}px) translateX(${dragDistance}px)`,
                   opacity: opacity,
                   cursor: draggableClose ? 'pointer' : 'default',
                   transition: isDragging ? 'none' : 'all 300ms ease',
                   ...getPositionStyles(placement),
                   [placement.includes('top') ? 'top' : 'bottom']: 0,
                 }}>
                <Children key={toastContextProps.id}  {...newToastContextProps} {...autoCloseProps} onClose={handleClose}/>
            </div>
  );
};
export default ToastController;