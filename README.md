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

```typescript jsx
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

```typescript jsx
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



// if you want to delete by index
removeToast.byIndex(0);  // Removes the first toast
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

const { id } = addToast("Loading..." ,'loading',{
    placement:"bottom-right"
});
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


## ToastProvider

| Prop            | Type                | Default | Description                                      |
|-----------------|---------------------|---------|--------------------------------------------------|
| `newestFirst`   | `boolean`           | `true`  | Whether to display the newest toast first.       |
| `gutter`        | `number`            | `8`     | The space (in pixels) between each toast.        |
| `containerOptions` | `object`          | `undefined` | Customize the toast container. See [containerOptions](#containerOptions) below. |
| `toastOptions`  | `object`            | `undefined` | Default options for all toasts. See [toastOptions](#toastOptions) below. |
| `toastStyles`   | `object`            | `undefined` | Customize the toast styles. See [toastStyles](#toastStyles) below. |

### Example for `newestFirst`

```typescript jsx
<ToastProvider newestFirst={false}>
  <App />
</ToastProvider>
```

This will display the oldest toast first.

### Example for `gutter`

```typescript jsx
<ToastProvider gutter={16}>
  <App />
</ToastProvider>
```

This will add a 16px space between each toast.


## containerOptions

| Prop             | Type                  | Description                                                                        |
|------------------|-----------------------|------------------------------------------------------------------------------------|
| `className`      | `string`              | Add a custom class to the container.                                               |
| `style`          | `React.CSSProperties` | Inline styles for the container.                                                   |
| `component`      | `React.ElementType<ToastContainerProps>`   | A custom component to render the toast container.                                         |
| `portalSelector` | `Element `  or `DocumentFragment`      | The DOM node or fragment where the toast container is rendered. Default is `body`. |

### Example with a custom container component

```typescript jsx
const CustomContainer = ({ children, ...props }) => {
  return <div className="custom-container" {...props}>{children}</div>;
};

<ToastProvider containerOptions={{ component: CustomContainer }}>
  <App />
</ToastProvider>
```

This will render the toasts inside the custom container.

### Example with a portal

```typescript jsx
<ToastProvider containerOptions={{ portalSelector: document.getElementById('toast-root') }}>
  <App />
</ToastProvider>
```

This will render the toasts inside the element with the ID `toast-root`.

## toastOptions

| Prop Name  | Type                   | Description                                                                                                                                                                                         |
|------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ...toastOptions | [ToastOptions](#advanced-options-for-toasts) | Extends all properties from ToastOptions and serves as the default configuration for all toasts. Each toast type (e.g., success, error ,..etc) can override these defaults with its specific options. || **successOptions** | [ToastOptions](#advanced-options-for-toasts) | Specific options for success toasts. |
| `errorOptions` | [ToastOptions](#advanced-options-for-toasts) | Specific options for error toasts.                                                                                                                                                                  |
| `warningOptions` | [ToastOptions](#advanced-options-for-toasts) | Specific options for warning toasts.                                                                                                                                                                |
| `infoOptions`| [ToastOptions](#advanced-options-for-toasts) | Specific options for info toasts.                                                                                                                                                                   |
| `emptyOptions` | [ToastOptions](#advanced-options-for-toasts) | Specific options for empty toasts.                                                                                                                                                                  |
| `loadingOptions` | [ToastOptions](#advanced-options-for-toasts) | Specific options for loading toasts.                                                                                                                                                                |
| `component` | `React.ElementType<ToastProps>`  | Custom component to use for individual toasts.  |


### Example for `toastOptions`

```typescript jsx
<ToastProvider toastOptions={{ className: 'toast', lifetime: 3000 }}>
  <App />
</ToastProvider>
```

This will apply the class `toast` and set the lifetime of all toasts to 3000ms.

### Example for Typed options

```typescript jsx
<ToastProvider toastOptions={{
  closeOnClick: true,
  successOptions: {
      style: { backgroundColor: 'green' },
      icon: <cutomIcon/>
  },
  errorOptions: { 
      closeButton: { visible: false } ,
      lifetime: 5000
  },
}}>
  <App />
</ToastProvider>
```
### Example for Custom Component
```tsx
const CustomToastComponent: FunctionComponent<ToastProps> = ({content ,icon ,onClose,style}) => {
    return (
        <div className="custom-toast" style={style}>
        <div className="custom-toast-content">
            {icon}
            <div className="custom-toast-text">{content}</div>
        </div>
        <button onClick={onClose}>Close</button>
        </div>
    );
    };


<ToastProvider toastOptions={{
  component: CustomToastComponent
}}>
  <App />
</ToastProvider>
```

## toastStyles


| Prop Name           | Type        | Default     | Description |
|---------------------|-------------|-------------|-------------|
| **`toastMaxWidth`**    | `string`    | `auto`      | Maximum width of the toast. |
| **`toastMinWidth`**    | `string`    | `200px`     | Minimum width of the toast. |
| **`toastMinHeight`**   | `string`    | `auto`      | Minimum height of the toast. |
| **`toastFontFamily`**  | `string`    | `inherit`   | Font family for the toast content. |
| **`toastBgColor`**     | `string`    | `#fff`      | Background color of the toast. |
| **`toastTextColor`**   | `string`    | `#000`      | Text color of the toast content. |
| **`toastRadius`**      | `string`    | `4px`       | Border radius of the toast. |
| **`toastPadding`**     | `string`    | `8px`       | Padding inside the toast. |
| **`toastBoxShadow`**   | `string`    | `none`      | Box shadow of the toast. |
| **`toastSuccessColor`**| `string`    | `#28a745`   | Background color for success toasts. |
| **`toastErrorColor`**  | `string`    | `#dc3545`   | Background color for error toasts. |
| **`toastWarningColor`**| `string`    | `#ffc107`   | Background color for warning toasts. |
| **`toastInfoColor`**   | `string`    | `#17a2b8`   | Background color for info toasts. |
| **`toastLoaderColor`** | `string`    | `#007bff`   | Color for the loader in the toast. |
| **`toastLoaderAreaColor`** | `string`| `#f8f9fa`   | Background color for the loader area. |

### Example for `toastStyles`

```jsx
<ToastProvider toastStyles={{
  toastBgColor: '#333',
  toastTextColor: '#fff',
}}>
  <App />
</ToastProvider>
```

This will set the background color to dark and the text color to white.


