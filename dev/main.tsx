import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {ToastProvider} from "react-toast-plus";
import {StrictMode} from "react";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1 style={{color:'red'}}>Live Test For Development Mode Only</h1>
        <ToastProvider
            containerOptions={{
                className: 'toast-container',
            }}
            toastOptions={{
                className: 'toast dgfdg',
                lifetime:5000,
                placement:"bottom-right",
                style:{
                    background:"yellow",
                    color:"aqua"
                },
                successOptions:{
                    lifetime:10000,
                    className: 'success-toast HideMe',
                    style:{
                        background:"green",
                    }
                },
                errorOptions:{
                    lifetime:1000,
                    style:{
                        background:"red",
                    }
                },
            }}
        >
            <h1>Hello From toast Provider</h1>
            <App/>
        </ToastProvider>
    </StrictMode>,
)