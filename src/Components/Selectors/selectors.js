import { createSelector } from 'reselect';

export const getProductsLoading = state => state.data.isLoading;
export const getProducts = state => state.data.products;
export const getMessage = (state) => state.data.message;


export const getAllProducts = createSelector(
    getProducts,
    (products) => products,
);

export const getAllMessages = createSelector(
    getMessage,
    (products) => products,
);