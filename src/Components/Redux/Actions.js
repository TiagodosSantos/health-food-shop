export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const removeProduct = productId => ({
    type: REMOVE_PRODUCT, 
    payload: { productId },
});

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const updateProduct = product => ({
    type: UPDATE_PRODUCT, 
    payload: { product },
});

export const LOAD_PRODUCTS_IN_PROGRESS = 'LOAD_PRODUCTS_IN_PROGRESS';
export const loadProductsInProgress = () => ({
    type: LOAD_PRODUCTS_IN_PROGRESS,
});

export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const loadProductsSuccess = products => ({
    type: LOAD_PRODUCTS_SUCCESS, 
    payload: { products },
});

export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';
export const loadProductsFailure = () => ({
    type: LOAD_PRODUCTS_FAILURE, 
});

export const SET_MESSAGE = 'SET_MESSAGE';
export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: { message },
});