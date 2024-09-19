import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import { ToastProvider} from "react-toast-plus";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1 style={{color:'red'}}>Live Test For Development Mode Only</h1>
        <ToastProvider>
            <h1>Hello From toast Provider</h1>
            <App/>
        </ToastProvider>
    </StrictMode>,
)