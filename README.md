# React Toast Plus

React Toast Plus is a lightweight, customizable toast notification library for React. It offers support for various types of notifications, auto-close functionality, draggable close, and customizable transitions. This library is designed to be simple and highly customizable, allowing developers to easily integrate and style toasts in their React applications.

## Features

- Multiple toast types: `success`, `error`, `info`, `warning`, `loading`, `empty`
- Customizable transitions: `fade`, `zoom`, `slide`, `bounce`
- Support for auto-close with pause on hover
- Draggable close functionality
- Fully customizable toast styles and icons
- Promise-based toasts for async operations

---

## Installation

To install `react-toast-plus`, run:

```bash
npm install react-toast-plus
```

Or with Yarn:

```bash
yarn add react-toast-plus
```

## Usage

### Basic Setup
Wrap your application with the `ToastProvider` to enable toast notifications:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-plus';
import App from './App';

ReactDOM.render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  document.getElementById('root')
);
```
### Adding Toasts

You can use the `useToast` hook to add toasts:

```jsx
import React from 'react';
import { useToast } from 'react-toast-plus';

const App  = () => {
  const { addToast } = useToast();

  const showToast = () => {
      addToast('This is a toast!');
  };

  return <button onClick={showToast}>Show Toast</button>;
};
```

## Toast Types

### Success Toast

```tsx
addToast.success("Success!");
```

### Error Toast

```tsx
addToast.error("Something went wrong!");
```

### Info Toast

```tsx
addToast.info("Here’s some information");
```

### Warning Toast

```tsx
addToast.warning("This is a warning!");
```

### Custom JSX Toast

```tsx
addToast.loading(<div>Custom JSX inside a toast!</div>);
```

## Custom Toasts

You can create custom toasts by passing either a React component or a function that returns JSX:

### Example with Custom Toast Component

```tsx
const CustomToast = ({ id, onClose }) => (
    <div>
      <strong>Custom Toast Component</strong>
      <p>This is a custom toast using a component!</p>
      <button onClick={() => onClose(id)}>Close</button>
    </div>
);

addToast.custom(CustomToast, { placement: "top-right", transition: "slide", lifetime: 5000, autoClose: true });
```

### Example with Custom JSX

```tsx
addToast(({ id, onClose }) => (
    <span>
        <strong>Custom JSX in Toast</strong>
        <span>This is a custom toast with JSX</span>
        <button onClick={() => onClose(id)}>Close</button>
    </span>),
    "success",
    { lifetime: 5000, autoClose: true, closeButton: { visible: false } }
);
```

## Promise-based Toasts

The `addToast.promise` method accepts a promise or a function that returns a promise:

### Basic Example

```tsx
const resolvePromise = new Promise(resolve => setTimeout(resolve, 2000));
addToast.promise(
    resolvePromise,
    {
        pending: 'pending',
        success: 'success',
        error: 'error'
    }
)

// example with Function that return Promise
const someAsyncFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            if (isSuccess) {
                resolve("Success!");
            } else {
                reject("Failed!");
            }
        }, 4000);
    });
};

addToast.promise(someAsyncFunction, {
    pending: "Pending...",
    success: (data) => `Success: {data}`,
    error: (error) => `Error: ${error}`
},{
    autoClose: true,
    transition: "slide",
    placement: "top-center",
    success: {
        lifetime: 3000,
        icon:"🤩"
    },
    error: {
        lifetime: 5000,
        closeButton: { visible: false }
    }
});
```

## Removing Toasts

You can remove toasts using the following methods from `useToast()`:

### Remove a Specific Toast

```tsx
const { removeToast } = useToast();

removeToast(toastId);  // Removes the toast with the given id
```

### Remove All Toasts

```tsx
const { removeAllToasts } = useToast();

removeAllToasts();  // Removes all active toasts
```

## Updating Toasts

You can update existing toasts using the `updateToast` function. Here's an example:

```tsx
const { updateToast } = useToast();

const { id } = addToast.loading("Loading...");
setTimeout(() => {
    updateToast({
        id,
        content: "Loaded!",
        type: "success"
    });
}, 4000);
```

## Advanced Options for Toasts

Here’s the full list of toast options:

| **Option**             | **Type**                                                                                 | **Description**                                                       |
|------------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `className`            | `string`                                                                                 | Custom class for the toast container.                                 |
| `style`                | `React.CSSProperties`                                                                    | Inline styles for the toast container.                                |
| `lifetime`             | `number`                                                                                 | Time (in milliseconds) the toast will be visible before auto-closing. |
| `autoClose`            | `boolean`                                                                                | Determines whether the toast should auto-close. Default is `true`.    |
| `pauseOnHover`         | `boolean`                                                                                | Pauses the toast timer when the user hovers over it.                  |
| `pauseOnFocusLoss`     | `boolean`                                                                                | Pauses the toast timer when the window loses focus.                   |
| `draggableClose`       | `boolean`                                                                                | Allows the toast to be closed by dragging it.                         |
| `closeOnClick`         | `boolean`                                                                                | Closes the toast when clicked.                                        |
| **closeButton**        | `object`                                                                                 | Customization options for the close button.                           |
| `closeButton.visible`  | `boolean`                                                                                | Shows or hides the close button. Default is `true`.                   |
| `closeButton.className`| `string`                                                                                 | Custom class for the close button.                                    |
| `closeButton.style`    | `React.CSSProperties`                                                                    | Inline styles for the close button.                                   |
| **progressBar**        | `object`                                                                                 | Customization options for the progress bar.                           |
| `progressBar.visible`  | `boolean`                                                                                | Shows or hides the progress bar. Default is `true`.                   |
| `progressBar.className`| `string`                                                                                 | Custom class for the progress bar.                                    |
| `progressBar.style`    | `React.CSSProperties`                                                                    | Inline styles for the progress bar.                                   |
| `transition`           | `'fade' ,'bounce' , 'slide' ,'zoom'`                                                     | Type of transition effect for the toast. |
| `transitionDuration`   | `number`                                                                                 | Duration of the transition effect (in milliseconds).                  |
| `placement`            | ` 'top-left' , 'top-right','top-center' , 'bottom-left' ,'bottom-center' 'bottom-right'` | Placement of the toast on the screen. |
| `icon`                 | `React.ReactNode`                                                                        | Custom icon for the toast, can be a React component or JSX.           |
| **iconProps**          | `object`                                                                                 | Customization options for the icon.                                   |
| `iconProps.visible`    | `boolean`                                                                                | Shows or hides the icon. Default is `true`.                           |
| `iconProps.className`  | `string`                                                                                 | Custom class for the icon.                                            |
| `iconProps.style`      | `React.CSSProperties`                                                                    | Inline styles for the icon.                                           |

