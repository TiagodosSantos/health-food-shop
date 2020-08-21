import { 
    removeProduct,
    updateProduct,
    loadProductsInProgress, 
    loadProductsSuccess,
    loadProductsFailure, 
    setMessage,
} from '../Redux/Actions';

const urlBase = 'http://localhost:8080/store/products';

export const loadProducts = () => async (dispatch, getState) => {
    
    try{
        dispatch(loadProductsInProgress());
        const response = await fetch(`${urlBase}`);
        const products = await response.json();

        dispatch(loadProductsSuccess(products));
    }catch(e){
        dispatch(loadProductsFailure());
        dispatch(
            setMessage({
                open: true,
                text: `Erro ao processar a requisição ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
}

export const updateProductRequest = (id, product) => async (dispatch) => {
    try{
        const body = JSON.stringify(product);
        const response = await fetch(`${urlBase}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('auth-token'),
            },
            method: 'PUT',
            body,
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            dispatch(updateProduct(updatedProduct));
            dispatch(
                setMessage({
                    open: true,
                    text: `${updatedProduct.title} atualizado com sucesso!`,
                    loading: false,
                    tipo: 'success',
                })
            );
        } else {
            console.log(`Erro response ${response.status}`);
            dispatch(
                setMessage({
                    open: true,
                    text: `${response.status == 403 ? 'Você precisa estar logado para realizar esta ação' : 'Erro ao processar a exclusão' }`,
                    tipo: 'error',
                    loading: false,
                })
            );
        }

    }catch(e){
        dispatch(
            setMessage({
                open: true,
                text: `Erro ao processar a atualizacão ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
}

export const removeProductRequest = (id) => async (dispatch) => {
    try{
        const response = await fetch(`${urlBase}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': localStorage.getItem('auth-token'),
            },
        });
    
        if (response.ok) {
            dispatch(removeProduct(id));
            dispatch(
                setMessage({
                    open: true,
                    text: `Producto Id ${id} removido com sucesso!`,
                    loading: false,
                    tipo: 'success',
                })
            );
          } else {
            console.log(`Erro response ${response.status}`);
            dispatch(
                setMessage({
                    open: true,
                    text: `${response.status == 403 ? 'Você precisa estar logado para realizar esta ação' : 'Erro ao processar a exclusão' }`,
                    tipo: 'error',
                    loading: false,
                })
            );
          }
        
    }catch(e){
        dispatch(
            setMessage({
                open: true,
                text: `Erro ao processar a exclusão ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
}

export const sendMessage = (message) => async (dispatch) => {
    dispatch(setMessage(message));
};