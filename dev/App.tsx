import  { FunctionComponent } from 'react';
import {useToast} from "react-toast-plus";



const App: FunctionComponent = () => {
    const {addToast ,updateToast ,toasts} = useToast();
    const testToasts = () => {
        console.log('Add Toasts');
        addToast({message: 'Hello From Toast'});
    }
    const updateToastsTest = () => {
        console.log('Update Toasts');
        updateToast(toasts[0].id,{message: 'Hello From Updated Toast'});
    }
  return (<>
      <button onClick={testToasts}>Click Me</button>
      <button onClick={updateToastsTest}>Click Me2</button>
  </>);

};

export default App;
