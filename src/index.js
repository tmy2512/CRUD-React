import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutRoot from './components/LayoutRoot/LayoutRoot';
import SignIn from './components/SignIn/SignIn';
import Header from './components/Header/Header';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot/>,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/user/create",
        element: <UserForm />
      },
      {
        path: "/user/:id",
        element: <UserForm />
      },
    ]
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</RouterProvider>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
