import React, {FunctionComponent, useEffect} from 'react';
import {ToastType, useToast, useToastStore} from "react-toast-plus";


interface FormData {
    msg: string;
    type: ToastType;
}

const App: FunctionComponent = () => {
    const { addToast ,updateToast} = useToast();
    const {toasts} = useToastStore();
    useEffect(() => {
        console.log(     toasts);
    },[toasts] )


    const [formData, setFormData] = React.useState<FormData>({ msg: 'Hello World', type: "empty" });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
       const {id} = addToast(formData.msg , formData.type ,{
            className: 'custom-toast',
            lifetime: 500000,
        } );
       setTimeout(() => {
           updateToast({
               id,
                message: `
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                Updated message
                `,

           });
       },10000)
    }

  return (<>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Make A Toast</button>
      </form>  </>);

};

export default App;
