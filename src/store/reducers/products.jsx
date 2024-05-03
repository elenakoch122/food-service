import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../products";

const initialState = JSON.parse(localStorage.getItem('products')) || {
  products,
  basketProducts: [],
  count: 0,
  sum: 0
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductInBasket: (state, action) => {
      state.basketProducts.push(action.payload);
      state.count = state.basketProducts.length;
      state.sum += action.payload.price;
      localStorage.setItem('products', JSON.stringify(state));
    },

    removeProductFromBasket: (state, action) => {
      state.basketProducts = state.basketProducts.filter(prod => prod.idUnic !== action.payload);
      state.count = state.basketProducts.length;
      state.sum = state.basketProducts.reduce((acc, product) => acc + product.price, 0);
      localStorage.setItem('products', JSON.stringify(state));
    },

    removeAllProducts: (state) => {
      state.basketProducts = [];
      state.count = 0;
      state.sum = 0;
      localStorage.removeItem('products');
    },
  }
});

export const { addProductInBasket, removeProductFromBasket, removeAllProducts } = productsSlice.actions;

export default productsSlice.reducer;
