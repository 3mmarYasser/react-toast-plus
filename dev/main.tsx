import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ToastProvider} from "react-toast-plus";
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1 style={{color:'red'}}>Live Test For Development Mode Only</h1>
        <ToastProvider>
            <h1>Hello From my Own Provider</h1>
            <App/>
        </ToastProvider>
    </StrictMode>,
)