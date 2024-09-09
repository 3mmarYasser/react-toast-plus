import React, { FunctionComponent, useEffect} from 'react';
import {Placement, ToastType, useToast, useToastStore} from "react-toast-plus";


interface FormData {
    msg: string;
    type: ToastType;
    placement: Placement;
}

const App: FunctionComponent = () => {
    const { addToast ,removeToast } = useToast();
    const {toasts} = useToastStore();
    useEffect(() => {
        console.log(     toasts);
    },[toasts] )


    const [formData, setFormData] = React.useState<FormData>({ msg: 'Hello World', type: "empty" ,placement:"top-left" });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
       addToast(formData.msg , formData.type ,{
            className: 'custom-toast',
            placement: formData.placement,
        } );
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
              </select>
          </label>
          <br/>
          <label>
              Placement :
              <select name={"placement"} onChange={handleInputChange}>
                  <option value="top-left">Top Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
              </select>
          </label>
          <br/>
          <button type="submit">Make A Toast</button>
      </form>
      <button onClick={()=>{removeToast.byIndex?.(0)}}>
          Remove idx 0
      </button>
  </>);

};

export default App;
