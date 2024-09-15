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
                className: 'toast',
                lifetime: 3000,
                transition: 'bounce',
                transitionDuration: 500,
                pauseOnHover: true,
                closeOnClick: true,
                draggableClose:true,
                loadingOptions:{
                    style:{
                        background: 'gray'
                    }
                },
            }}
        >
            <h1>Hello From toast Provider</h1>
            <App/>
        </ToastProvider>
    </>,
)