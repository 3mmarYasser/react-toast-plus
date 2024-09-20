# React Toast Plus

React Toast Plus is a lightweight, customizable toast notification library for React. It offers support for various types of notifications, auto-close functionality, draggable close, and customizable transitions. This library is designed to be simple and highly customizable, allowing developers to easily integrate and style toasts in their React applications.

### ✨ Features


- **🔥 Lightweight & Fast**: Built for speed and performance, React Toast Plus delivers snappy notifications with zero delay, making it perfect for modern web apps.

- **Complete TypeScript Support**: With robust TypeScript integration, enjoy typed toast options that ensure your toasts are consistent and bug-free, whether you're handling `success`, `error`, or even custom notifications.

- **Auto-Close with Precision Control**: Toasts can auto-close after a set time. Want more control? We pass the remaining time to you, enabling advanced scenarios like progress bars and animations.

- **Pause and Resume Interaction**: Timers pause automatically when users hover over the toast or switch tabs, and resume when they return—giving users a seamless experience.

- **Interactive Draggable Close**: Dismiss your toasts by dragging them off the screen, adding a fun, interactive touch to your notifications.

- **Portal Support**: Use the built-in `portalSelector` to place toasts anywhere within your app structure, providing complete layout flexibility.

- **Hot & Customizable**: React Toast Plus is all about flexibility. Create unique toasts with customizable components like `StyledToaster`, `StyledProgressBar`, and `StyledCloseButton`. You can even inject your own transitions and icons for a fully personalized user experience.

- **Highly Customizable Progress Bar**: Style the progress bar to match your app, and provide real-time feedback with `StyledProgressBar`, making the lifetime of your toasts clearly visible.

- **Multiple Placement Options**: Display toasts anywhere on the screen—top-right, bottom-center, or wherever fits your design best.

- **Built-in Icons & Rich Icon Library**: React Toast Plus comes with built-in icons (`SuccessIcon`, `ErrorIcon`, `WarningIcon`, `InfoIcon`, `CloseIcon`) and custom icon support, making it easy to match your app's style.

- **Styled Components Ready**: Using styled-components under the hood, React Toast Plus provides fully styled, theme-aware toasts right out of the box. Plug in your own styles with the exportable components (`StyledToaster`, `StyledToastContainer`, and more).

- **Flexible API for Custom Components**: Build and render your own toast components via the `addToast.custom()` function, passing your custom toast along with all configurable options.

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
const CustomToast: FunctionComponent<ToastProps> = ({ id, onClose }) => (
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

| **Option**              | **Type**                                                                                 | **Description**                                                       |
|-------------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `className`             | `string`                                                                                 | Custom class for the toast container.                                 |
| `style`                 | `React.CSSProperties`                                                                    | Inline styles for the toast container.                                |
| `lifetime`              | `number`                                                                                 | Time (in milliseconds) the toast will be visible before auto-closing. |
| `autoClose`             | `boolean`                                                                                | Determines whether the toast should auto-close. Default is `true`.    |
| `pauseOnHover`          | `boolean`                                                                                | Pauses the toast timer when the user hovers over it.                  |
| `pauseOnFocusLoss`      | `boolean`                                                                                | Pauses the toast timer when the window loses focus.                   |
| `draggableClose`        | `boolean`                                                                                | Allows the toast to be closed by dragging it.                         |
| `closeOnClick`          | `boolean`                                                                                | Closes the toast when clicked.                                        |
| **closeButton**         | `object`                                                                                 | Customization options for the close button.                           |
| `closeButton.visible`   | `boolean`                                                                                | Shows or hides the close button. Default is `true`.                   |
| `closeButton.className` | `string`                                                                                 | Custom class for the close button.                                    |
| `closeButton.style`     | `React.CSSProperties`                                                                    | Inline styles for the close button.                                   |
| **progressBar**         | `object`                                                                                 | Customization options for the progress bar.                           |
| `progressBar.visible`   | `boolean`                                                                                | Shows or hides the progress bar. Default is `true`.                   |
| `progressBar.className` | `string`                                                                                 | Custom class for the progress bar.                                    |
| `progressBar.style`     | `React.CSSProperties`                                                                    | Inline styles for the progress bar.                                   |
| `transition`            | `'fade' ,'bounce' , 'slide' ,'zoom'`                                                     | Type of transition effect for the toast.                              |
| `transitionDuration`    | `number`                                                                                 | Duration of the transition effect (in milliseconds).                  |
| `placement`             | ` 'top-left' , 'top-right','top-center' , 'bottom-left' ,'bottom-center' 'bottom-right'` | Placement of the toast on the screen.                                 |
| `icon`                  | `React.ReactNode`                                                                        | Custom icon for the toast, can be a React component or JSX.           |
| **iconProps**           | `object`                                                                                 | Customization options for the icon.                                   |
| `iconProps.visible`     | `boolean`                                                                                | Shows or hides the icon. Default is `true`.                           |
| `iconProps.className`   | `string`                                                                                 | Custom class for the icon.                                            |
| `iconProps.style`       | `React.CSSProperties`                                                                    | Inline styles for the icon.                                           |

## ToastProps

Provides all the properties passed to the toast component .

| **Prop Name**      | **Description**                                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| **id**             | Unique identifier for the toast.                                                                                          |
| **content**        | The message or custom content to display in the toast.                                                                    |
| **onClose**        | Function to trigger when the toast needs to be closed.                                                                    |
| **type**           | Specifies the type of toast (e.g., success, error).                                                                       |
| **options**        | Custom options for configuring the toast’s behavior and style check it here [ToastOptions](#advanced-options-for-toasts). |
| **remainingTime**  | Provides the time remaining before the toast auto-closes.                                                                 |
| **start**          | Starts the auto-close timer for the toast.                                                                                |
| **pause**          | Pauses the auto-close timer.                                                                                              |
| **resume**         | Resumes the paused auto-close timer.                                                                                      |
| **clear**          | Clears the auto-close timer.                                                                                              |
| **isRunning**      | Indicates if the timer is currently running.                                                                              |
| **isPaused**       | Indicates if the timer is currently paused.                                                                               |


## ToastProvider

| Prop               | Type      | Default     | Description                                                                     |
|--------------------|-----------|-------------|---------------------------------------------------------------------------------|
| `newestFirst`      | `boolean` | `true`      | Whether to display the newest toast first.                                      |
| `gutter`           | `number`  | `8`         | The space (in pixels) between each toast.                                       |
| `containerOptions` | `object`  | `undefined` | Customize the toast container. See [containerOptions](#containerOptions) below. |
| `toastOptions`     | `object`  | `undefined` | Default options for all toasts. See [toastOptions](#toastOptions) below.        |
| `toastStyles`      | `object`  | `undefined` | Customize the toast styles. See [toastStyles](#toastStyles) below.              |

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

| Prop             | Type                                     | Description                                                                        |
|------------------|------------------------------------------|------------------------------------------------------------------------------------|
| `className`      | `string`                                 | Add a custom class to the container.                                               |
| `style`          | `React.CSSProperties`                    | Inline styles for the container.                                                   |
| `component`      | `React.ElementType<ToastContainerProps>` | A custom component to render the toast container.                                  |
| `portalSelector` | `Element `  or `DocumentFragment`        | The DOM node or fragment where the toast container is rendered. Default is `body`. |

### Example with a custom container component

```tsx
const CustomContainer: FunctionComponent<ToastContainerProps> = ({ children, ...props }) => {
  return <div className="custom-container" {...props}>{children}</div>;
};

<ToastProvider containerOptions={{ component: CustomContainer }}>
  <App />
</ToastProvider>
```

This will render the toasts inside the custom container.

### Example with a portal

```tsx
<ToastProvider containerOptions={{ portalSelector: document.getElementById('toast-root')!}}>
  <App />
</ToastProvider>
```

This will render the toasts inside the element with the ID `toast-root`.

## toastOptions

| Prop Name        | Type                                             | Description                                                                                                                                                                                           |
|------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ...toastOptions  | [ToastOptions](#advanced-options-for-toasts)     | Extends all properties from ToastOptions and serves as the default configuration for all toasts. Each toast type (e.g., success, error ,..etc) can override these defaults with its specific options. || **successOptions** | [ToastOptions](#advanced-options-for-toasts) | Specific options for success toasts. |
| `errorOptions`   | [ToastOptions](#advanced-options-for-toasts)     | Specific options for error toasts.                                                                                                                                                                    |
| `warningOptions` | [ToastOptions](#advanced-options-for-toasts)     | Specific options for warning toasts.                                                                                                                                                                  |
| `infoOptions`    | [ToastOptions](#advanced-options-for-toasts)     | Specific options for info toasts.                                                                                                                                                                     |
| `emptyOptions`   | [ToastOptions](#advanced-options-for-toasts)     | Specific options for empty toasts.                                                                                                                                                                    |
| `loadingOptions` | [ToastOptions](#advanced-options-for-toasts)     | Specific options for loading toasts.                                                                                                                                                                  |
| `component`      | `React.ElementType<`[ToastProps](#toastprops)`>` | Custom component to use for individual toasts.                                                                                                                                                        |


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
const CustomToastComponent: FunctionComponent<ToastProps> = (props) => {
  const { content, id, onClose, options } = props;
  const { style, icon } = options || {};
  const renderContent = () => {
    if (typeof content === "string") {
      return content;
    } else if (isValidElement(content)) {
      return content;
    } else if (typeof content === "function") {
      return content(props);
    }
    return null;
  };
  return (
    <div className="custom-toast" style={style}>
      <div className="custom-toast-content">
        {icon}
        <div className="custom-toast-text">{renderContent()}</div>
      </div>
      <button onClick={() => onClose(id)}>Close</button>
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


| Prop Name              | Type     | Description                           |
|------------------------|----------|---------------------------------------|
| `toastMaxWidth`        | `string` | Maximum width of the toast.           |
| `toastMinWidth`        | `string` | Minimum width of the toast.           |
| `toastMinHeight`       | `string` | Minimum height of the toast.          |
| `toastFontFamily`      | `string` | Font family for the toast content.    |
| `toastBgColor`         | `string` | Background color of the toast.        |
| `toastTextColor`       | `string` | Text color of the toast content.      |
| `toastRadius`          | `string` | Border radius of the toast.           |
| `toastPadding`         | `string` | Padding inside the toast.             |
| `toastBoxShadow`       | `string` | Box shadow of the toast.              |
| `toastEmptyColor`      | `string` | color for empty toasts (icon).        |
| `toastSuccessColor`    | `string` | color for success toasts (icon).      |
| `toastErrorColor`      | `string` | color for error toasts (icon).        |
| `toastWarningColor`    | `string` | color for warning toasts (icon).      |
| `toastInfoColor`       | `string` | color for info toasts (icon).         |
| `toastLoaderColor`     | `string` | Color for the loader in the toast.    |
| `toastLoaderAreaColor` | `string` | Background color for the loader area. |

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

# `useToastStore`

The `useToastStore` hook provides access to the current toast notifications and a `dispatch` function to manage toast actions.

## Return Value

The hook returns an object containing two keys:

- **`toasts`**: An array of the current active toasts.
- **`dispatch`**: A function to dispatch actions for toast management.

```ts
const { toasts, dispatch } = useToastStore();
```
## Actions
Below is a table of actions you can dispatch to manage toasts:

| Action Type          | Description                                    |
|---------------------|------------------------------------------------|
| `ADD_TOAST`           | Adds a new toast to the state.                |
| `REMOVE_TOAST`        | Removes a toast by its `id`.                     |
| `UPDATE_TOAST`        | Updates an existing toast's properties.        |
| `REMOVE_ALL_TOASTS`   | Removes all active toasts.                     |

### Usage Example

```tsx
import {useToastStore ,ActionTypes} from 'react-toast-plus';

const ToastManager = () => {
    const {toasts, dispatch} = useToastStore();

    return (
        <div>
            {toasts.map((toast) => (
                <div key={toast.id}>{toast.content}</div>
            ))}
            <button
                onClick={() =>
                    dispatch({
                        type: ActionTypes.ADD_TOAST,
                        toast: {
                            id: `${Date.now()}`, // Unique ID
                            content: "New Toast Added!",
                            type: "success",
                            options: {autoClose: true, lifetime: 3000},
                        },
                    })
                }
            >
                Add Toast
            </button>
            <button
                onClick={() => dispatch({ type: ActionTypes.REMOVE_ALL_TOASTS })}
            >
                Remove All Toasts
            </button>
        </div>
    );
};
```

## Custom Styled Components

In addition to providing a powerful toast notification system,
React Toast Plus also exports various styled components 
and icons that you can use to customize or create your own custom toasters.

### Available Styled Components
You can import and use the following styled components in your custom `Toaster`:

- `StyledToaster`
- `StyledProgressBar` (requires props `type`, `duration`, and `state`)
- `StyledCloseButton`
- `StyledToastContainer`
- `StyledToasterContent`
- `StyledLoadingIcon`
- `SuccessIcon`
- `ErrorIcon`
- `WarningIcon`
- `InfoIcon`
- `CloseIcon`

### Example Usage of Styled Components with Props

Here’s an example where the `CustomToaster` is a `React.FunctionComponent<`[ToastProps](#toastprops)`>`, and values like `type`, `lifetime`, and `onClose` are passed via props.

```tsx
import { StyledToaster, StyledProgressBar, StyledCloseButton, StyledToastContainer, StyledToasterContent, SuccessIcon, CloseIcon } from 'react-toast-plus';
import { ToastProps } from 'react-toast-plus';

const CustomToaster: React.FunctionComponent<ToastProps> = ({
  id,
  type,
  onClose,
  options,
  isRunning,
}) => {
  const { autoClose = true, lifetime = 5000, style } = options || {};

  return (
    <StyledToaster style={style}>
      <div
        style={{
          width: 20,
          height: 20,
        }}
      >
        <SuccessIcon />
      </div>
      <StyledToasterContent>
        <p>Hello from componemt</p>
      </StyledToasterContent>
      <StyledProgressBar
        type={type || "empty"}
        duration={lifetime}
        state={isRunning ? "running" : "paused"}
      />
      <StyledCloseButton onClick={() => onClose && onClose(id)}>
        <CloseIcon />
      </StyledCloseButton>
    </StyledToaster>
  );
};
```

### Triggering the Custom Toaster with Props

Here’s how you can trigger the custom toaster with the `addToast.custom` method and pass the necessary props:

```tsx
import { useToast } from 'react-toast-plus';

const MyComponent = () => {
  const { addToast } = useToast();

  const showCustomToast = () => {
    addToast.custom(CustomToaster, {
      lifetime: 5000,
      autoClose: true,
    });
  };

  return (
    <button onClick={showCustomToast}>Show Custom Toast</button>
  );
};
```

### Explanation

- The `CustomToaster` component receives `ToastProps`, which include properties like `type`, `lifetime`, and `onClose`.
- These props are passed into `StyledProgressBar` and other elements to render a custom toast.
- The `addToast.custom` function is used to display the custom toast with options such as `isRuning`, `lifetime`, and `autoClose`.

```ts
addToast.custom(CustomToaster, { lifetime: 5000, autoClose: true });
```

### 🛠️ Contributing

Contributions, suggestions, and feedback are highly encouraged! Whether it's bug reports, new features, or improvements, feel free to check the [issues page](#) or submit a pull request. Let's collaborate and make React Toast Plus even better!

### 📄 License

React Toast Plus is proudly open-source under the [MIT license](LICENSE). You’re free to use it in both personal and commercial projects. Enjoy!
