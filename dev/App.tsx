import React, { FunctionComponent, useEffect} from 'react';
import {Placement, ToastTransitionType, ToastType, useToast, useToastStore} from "react-toast-plus";


interface FormData {
    msg: string;
    type: ToastType;
    placement: Placement;
    transition: ToastTransitionType;
}

const App: FunctionComponent = () => {
    const { addToast} = useToast();
    const {toasts} = useToastStore();
    useEffect(() => {
        console.log(     toasts);
    },[toasts] )


    const [formData, setFormData] = React.useState<FormData>({ msg: 'Hello World', type: "empty" ,placement:"top-right" ,transition:"slide" });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
       addToast(formData.msg , formData.type ,{
            className: 'custom-toast',
            placement: formData.placement,
           transition: formData.transition,
           lifetime: 3000,

        } );
    }
    const callPromise = () => {
        const someAsyncFunction = (): Promise<string> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const isSuccess = Math.random() > 0.5;
                    if (isSuccess) {
                        resolve("Success!");
                    } else {
                        reject("Failed!");
                    }
                }, 1000);
            });
        };
        addToast.promise(someAsyncFunction ,{pending:"Pending" ,success:"Success" ,error:"Error"})
    }
const addCustomToast = () => {
    addToast.custom(({options ,isPaused}) => {
        const {style ,className ,} = options ||{};
        return (
            <div className={className} style={style}>
                <h1>Custom Toast</h1>
                <p>This is a custom toast</p>
                {isPaused && <p>Paused</p>}
            </div>
        );
    },{placement:"top-center" ,transition:"slide" ,lifetime:5000 ,autoClose:true});
}
  return (<>
      <form onSubmit={handleSubmit} >
          <label>
              Message:
              <input type="text" name="msg" value={formData.msg} onChange={handleInputChange}/>
          </label>
          <br/>
          <label>
              Type:
              <select name={"type"} onChange={handleInputChange}>
                    <option value="empty">Empty</option>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="loading">Loading</option>
              </select>
          </label>
          <br/>
          <label>
              Placement :
              <select name={"placement"} onChange={handleInputChange}>
                  <option value="top-right">Top Right</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-left">Top Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-left">Bottom Left</option>
              </select>
          </label>
          <br/>
          <label>
              Transition :
              <select name={"transition"} onChange={handleInputChange}>
                  <option value="slide">Slide</option>
                  <option value="bounce">Bounce</option>
                  <option value="fade">Fade</option>
                  <option value="zoom">Zoom</option>
              </select>
          </label>
          <br/>
          <button type="submit">Make A Toast</button>
      </form>
      <button onClick={callPromise}>
          Promise Toast
      </button>
      <br/>
      <button onClick={addCustomToast}>
            Custom Toast
      </button>
  </>);

};

export default App;
