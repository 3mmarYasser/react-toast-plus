import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import {ToastProvider} from "react-toast-plus";
import {StrictMode} from "react";
import ToasterComponent from "../src/components/Toaster/Toaster.component.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <h1 style={{color:'red'}}>Live Test For Development Mode Only</h1>
        <ToastProvider
            newestFirst={true}
            gutter={8}
            containerOptions={{
                className: 'toast-container',
            }}

            toastOptions={{
                component:ToasterComponent,
                className: 'toast',
                lifetime: 3000,
                transition: 'bounce',
                transitionDuration: 500,
                pauseOnHover: true,
                pauseOnFocusLoss: true,
                closeOnClick: true,
                draggableClose:true,
                successOptions:{
                    style: {backgroundColor: 'green'},
                },
                errorOptions:{
                    closeButton:{visible:false},
                },
                warningOptions:{
                    closeOnClick:false,
                }
            }}
        >
            <h1>Hello From toast Provider</h1>
            <App/>
        </ToastProvider>
    </StrictMode>,
)