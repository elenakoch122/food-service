import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Products from './pages/Products';
import Basket from './pages/Basket';
import Product from './pages/Product';
import Form from './components/blocks/Form';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Form
          link="Зарегистрироваться"
          title="Вход"
          button="Войти"
        />,
      },
      {
        path: "/registration",
        element: <Form
          link="Авторизоваться"
          title="Регистрация"
          button="Зарегистрироваться"
        />,
      },
    ]
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/basket",
    element: <Basket />
  },
  {
    path: "/product/:id",
    element: <Product />
  }
], { basename: "/food-service" });

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
