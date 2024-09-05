import  { FunctionComponent } from 'react';
import {useToast} from "react-toast-plus";


let idx = 0;
const App: FunctionComponent = () => {
    const {addToast , removeToast} = useToast();
    const testToasts = () => {
        console.log('Add Toasts');
       const {id} =  addToast.success(`Hello Im One With IDX ${idx}`);
       idx++;
       console.log(id);
    }
    const updateToastsTest = () => {
        console.log('Update Toasts');
    }
    const removeToastsTest = () => {
        removeToast.byIndex(1);
    }
  return (<>
      <button onClick={testToasts}>Click Me </button>
      <button onClick={updateToastsTest}>Click Me2</button>
      <button onClick={removeToastsTest}>remove the one by idx 1</button>
  </>);

};

export default App;
