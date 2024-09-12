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


const ToastController: FunctionComponent<ToastControllerProps>= ({children:Children , toastContextProps ,gutter ,newestFirst =NEWEST_FIRST}) => {
  const [state, setState] = useState<TransitionState>('unmounted');
  const autoCloseProps = useAutoClose(toastContextProps.id);
  const {updateToastElement ,calcToastOffset}=useToastHandlers();
  const {updateToast}=useToast();
  const ToastRef = useRef<HTMLDivElement>(null);


  const {autoClose , lifetime ,placement = TOAST_PLACEMENT  ,transition =TOAST_TRANSITION , transitionDuration = TOAST_TRANSITION_DURATION ,draggableClose ,pauseOnHover} = toastContextProps.options||{};

  const {
    dragDistance,
    opacity,
    handleDragStart,
    handleDragMove,
    handleDragEnd, isDragging
  } = useDraggableClose(toastContextProps.id, toastContextProps.onClose, draggableClose);

  useEffect(() => {
    console.log('isDragging', isDragging);
  }, [isDragging]);
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
    console.log('state', state);
  }, [state]);

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
      autoCloseProps.start(lifetime, handleClose);
    }
  }, [autoClose, lifetime]);

  const handleClose:ToastContextProps['onClose'] = useCallback((id) => {
    if (autoClose  && autoCloseProps.remainingTime() > 0) {
      autoCloseProps.clear();
    }
    setState('exiting');
    setTimeout(() => {toastContextProps.onClose(id);},transitionDuration)
    }, [autoClose, transitionDuration]);

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
                 style={{
                   display: 'flex',
                   transform: `translateY(${offset * (placement.includes('top') ? 1 : -1)}px) translateX(${dragDistance}px)`,
                   position: 'absolute',
                   opacity: opacity,
                   boxSizing: 'border-box',
                   cursor: draggableClose ? 'pointer' : 'default',
                   transition: isDragging ? 'none' : 'all 300ms ease',
                   ...getPositionStyles(placement),
                   [placement.includes('top') ? 'top' : 'bottom']: 0,
                 }}>
                <Children  {...newToastContextProps} {...autoCloseProps} onClose={handleClose} toastRef={ToastRef}/>
            </div>
  );
};
export default ToastController;
