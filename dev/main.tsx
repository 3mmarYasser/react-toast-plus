import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {ToastProvider} from "react-toast-plus";
// import  {StrictMode} from "react";
createRoot(document.getElementById('root')!).render(
    <>
        <h1 style={{color:'red'}}>Live Test For Development Mode Only</h1>
        <ToastProvider
            newestFirst={true}
            containerOptions={{
                className: 'toast-container',
            }}

            toastOptions={{
                className: 'toast dgfdg',
                autoClose: true,
                lifetime: 3000,
                transition: 'zoom',
                transitionDuration: 500,
                pauseOnHover: true,
                closeOnClick: true,
                draggableClose:true,
                style:{
                    background:"yellow",
                    color:"aqua"
                },
                successOptions:{
                    className: 'success-toast HideMe',
                    lifetime: 5000,
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
    </>,
)