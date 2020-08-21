import {
    REMOVE_PRODUCT,
    UPDATE_PRODUCT,
    LOAD_PRODUCTS_IN_PROGRESS,
    LOAD_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAILURE,
    SET_MESSAGE,
} from './Actions';


const initialState = {
    isLoading: false, 
    products: [],
    message: {
        open: false,
        text: null,
        tipo: 'success',
        loading: false,
    },
};

export const data = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type){

        case SET_MESSAGE: {
            const { message } = payload;
            return {
                ...state,
                message,
            };
        }

        case REMOVE_PRODUCT: {
            const {productId: productIdToRemove} = payload;
            return {
                ...state,
                products: state.products.filter(product => product.id != productIdToRemove),
            };
        }

        case UPDATE_PRODUCT: {
            const {product: productToUpdate} = payload;
            return {
                ...state,
                products: state.products.map(product => {
                    if(product.id == productToUpdate.id){
                        return productToUpdate;
                    }
                    return product;
                }),
            };
        }

        case LOAD_PRODUCTS_SUCCESS: {
            const {products} = payload;
            return {
                ...state, 
                isLoading: false,
                products: products,
                message: { open: false, text: null, tipo: 'success', loading: false, },
            };
        }

        case LOAD_PRODUCTS_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case LOAD_PRODUCTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }

        default: 
            return state;
    }
}