import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import authReducer from "./reducers/auth";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  }
});
