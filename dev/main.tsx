import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {ToastProvider} from "react-toast-plus";
import  {StrictMode} from "react";
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1 style={{color:'red'}}>Live Test For Development Mode Only</h1>
        <ToastProvider
            containerOptions={{
                className: 'toast-container',
            }}
            toastOptions={{
                className: 'toast dgfdg',
                autoClose: false,
                lifetime: 3000,
                draggable: false,
                pauseOnHover: true,
                placement:"bottom-center",
                style:{
                    background:"yellow",
                    color:"aqua"
                },
                successOptions:{
                    className: 'success-toast HideMe',
                    style:{
                        background:"green",
                    }
                },
                errorOptions:{
                    style:{
                        background:"red",
                    }
                },
                warningOptions:{
                    style:{
                        background:"orange",
                    }
                },
                infoOptions:{
                    style:{
                        background:"blue",
                    }
                }
            }}
        >
            <h1>Hello From toast Provider</h1>
            <App/>
        </ToastProvider>
    </StrictMode>,
)