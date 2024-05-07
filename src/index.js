import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import './assets/fonts/fonts.css'
import './reset.css';
import './base.css';
import './index.css';
import App from './App';
import Form from './components/blocks/Form';
import Basket from './pages/Basket';
import Product from './pages/Product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Form
      link="Авторизоваться"
      title="Регистрация"
      button="Зарегистрироваться"
    />,
  },
  {
    path: "/basket",
    element: <Basket />
  },
  {
    path: "/product/:id",
    element: <Product />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
