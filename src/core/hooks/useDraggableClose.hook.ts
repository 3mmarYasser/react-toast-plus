import React, {useCallback, useEffect, useRef, useState} from "react";
import {ToastContextProps, ToastOptions} from "../../types";

export const useDraggableClose =(id:ToastContextProps['id'] , onClose:ToastContextProps['onClose'] ,draggableClose:ToastOptions['draggableClose']  )=>{
    const [dragDistance, setDragDistance] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const startX = useRef(0);
    const velocityRef = useRef<number>(0);
    const wasDraggedRef = useRef(false); // Track if the toast was dragged


    const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;

        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const distance = currentX - startX.current;

        velocityRef.current = distance - dragDistance;

        requestAnimationFrame(() => {
            setDragDistance(distance);
            const opacityFactor = Math.max(1 - Math.abs(distance) / 150, 0);
            setOpacity(opacityFactor);
        });

        if (Math.abs(distance) > 10) {
            wasDraggedRef.current = true; // Considered a drag if distance > 10px
        }
    },[isDragging, dragDistance]);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        velocityRef.current = 0;
        wasDraggedRef.current = false;

    };

   const handleDragEnd = useCallback(() => {
        setIsDragging(false);

        if (Math.abs(dragDistance) > 100 || Math.abs(velocityRef.current) > 30) {
            onClose(id);
        } else {
            setDragDistance(0);
            setOpacity(1);
        }
    }, [dragDistance, onClose, id]);

    useEffect(() => {
    if(draggableClose) return;
        const handleWindowMouseUp = () => {
            if (isDragging) {
                handleDragEnd();
            }
        };
        window.addEventListener('mouseup', handleWindowMouseUp);
        window.addEventListener('touchend', handleWindowMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleWindowMouseUp);
            window.removeEventListener('touchend', handleWindowMouseUp);
        };

    }, [isDragging, handleDragEnd]);

    return {
        dragDistance,
        opacity,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        isDragging,
        wasDragged: wasDraggedRef.current, // Return if toast was dragged

    };
}