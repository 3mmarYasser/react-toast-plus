import type React from "react"
import type { ToastProps } from "react-toast-plus"

const CustomToast: React.FC<ToastProps> = ({ options, isPaused }) => {
    const { style, className } = options || {}

    return (
        <div className={className} style={style}>
            <h1>Custom Toast</h1>
            <p>This is a custom toast</p>
            {isPaused && <p>Paused</p>}
        </div>
    )
}

export default CustomToast

