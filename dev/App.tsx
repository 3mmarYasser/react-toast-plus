import  { FunctionComponent } from 'react';
import {useToast} from "react-toast-plus";



const App: FunctionComponent = () => {
    const toast = useToast();
    const testToasts = () => {
        console.log('Add Toasts');
        toast.info("Hello From Toast" );
    }
    const updateToastsTest = () => {
        console.log('Update Toasts');
    }
  return (<>
      <button onClick={testToasts}>Click Me</button>
      <button onClick={updateToastsTest}>Click Me2</button>
  </>);

};

export default App;
