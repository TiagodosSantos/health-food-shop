import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProductListItem from './ProductListItem';
import CustomDialog from '../../Components/Dialog/CustomDialog';
import Toast from '../../Components/Toast/Toast';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    loadProducts, 
    removeProductRequest, 
    updateProductRequest, 
    sendMessage,
} from '../../Components/Api/Thunks';

import {
    getProductsLoading,
    getAllProducts,
    getAllMessages,
} from '../../Components/Selectors/selectors';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
    display: 'flex'; 
    justify-content: 'center';
`;

const fields = {
    id: "Id",
    title: 'Titulo', 
    type: 'Tipo',
    description: 'Descrição',
    filename: 'Nome do Arquivo', 
    price: 'Preço',
    rating: 'Rating',
    height: 'Altura',
    width: 'Largura',
    createdAt: 'Criado em',
};

const ProductList = ({ 
        products = [], 
        onRemovePressed, 
        onUpdatePressed,
        isLoading, 
        message, 
        startLoadingProducts,
        onSetMessagePressed,
    }) => {

    useEffect(() => {
        startLoadingProducts();
    }, []);

    const [state, setState] = React.useState({
        mensagem: {
            open: false,
            texto: '',
            tipo: 'success',
            data: null,
            campos: [],
            labelButton: null,
            dialogTitle: null,
            message: null,
            action: null,
            openToast: false,
            tipoToast: 'success',
            textoToast: null,
            editData: false,
        },
    });

    const handleRemove = (dado) => {
        const mensagem = {
            open: true,
            labelButton: 'Sim',
            tipo: 'success',
            dialogTitle: 'Excluir',
            message: `Tem certeza que deseja excluir o registro '${dado.title}' permanentemente? `,
            action(){
                setState({...state, mensagem: { openToast: false }});
                onSetMessagePressed({
                    open: false,
                    text: null,
                    tipo: 'success',
                    loading: true,
                });
                onRemovePressed(dado.id);
                //setState({...state, mensagem: { openToast: true, textoToast: `Dado excluído com sucesso! ${dado[Object.keys(dado)[0]]}`}})
            },
        };
        setState({...state, mensagem});
    };

    const notOptional = ['title', 'type', 'price'];

    const handleUpdate = (dado) => {

        const camposObject = 
                Object.entries(dado).map(([key, ]) => {
                    return (
                             {
                                'titulo':`${fields[key]}`,
                                'dado':`${key}`,
                                'opcional': !notOptional.includes(key)
                             }
                    )});

        const mensagem = {
            open: true,
            //texto: `Consultar/Update ${dado.id}`,
            tipo: 'success',
            labelButton: 'Atualizar',
            dialogTitle: 'Atualizar atributo',
            data: dado,
            campos: camposObject,
            editData: true,
            action(dadoAlteracao){

                setState({...state, mensagem: { openToast: false, open: false }});
                onSetMessagePressed({
                    open: false,
                    text: null,
                    tipo: 'success',
                    loading: true,
                });

                const productToUpdate = {
                    title: dadoAlteracao.title, 
                    type: dadoAlteracao.type,
                    description: dadoAlteracao.description,
                    filename: dadoAlteracao.filename, 
                    price: dadoAlteracao.price,
                    rating: dadoAlteracao.rating,
                    height: dadoAlteracao.height,
                    width: dadoAlteracao.width,
                }; 

                onUpdatePressed(dadoAlteracao.id, productToUpdate);

            },
        };
        setState({...state, mensagem});
    }

    const loadingMessage = <CircularProgress style={{display: 'block', marginTop:'36px', marginRight: 'auto', marginLeft: 'auto'}}/>;
    const loadingAction = <LinearProgress />;

    const contant = (
        <>


            <CustomDialog
                open={state.mensagem.open}
                mensagem={state.mensagem}
                data={state.mensagem.data}
                campos={state.mensagem.campos}
                labelButton={state.mensagem.labelButton}
                dialogTitle={state.mensagem.dialogTitle}
                message={state.mensagem.message}
                action={state.mensagem.action}
                editData = {state.mensagem.editData}
                editaveis = {true}
                handleClose={() => setState({...state, mensagem: { open: false }})} />

            <Toast
                    open={state.mensagem.openToast || message.open}
                    handleClose={() => {
                        setState({...state, mensagem: { openToast: false }})
                        onSetMessagePressed({
                                open: false,
                                text: null,
                                tipo: 'success',
                                loading: false,
                            });
                        }}
                    severity={state.mensagem.openToast ? state.mensagem.tipoToast : message.tipo}>
                        {state.mensagem.textoToast}
                        {message.text}
            </Toast>   

            {message.loading ? loadingAction : null}

                <h3 style={{textAlign: 'center'}}>Products</h3>
                {
                products.map(product => <ProductListItem 
                    key={product.id}
                    product={product} 
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}/>)
                }
        </>
    )
    return <ListWrapper> {isLoading ? loadingMessage : contant} </ListWrapper>;

};

const mapStateToProps = state => ({
    isLoading: getProductsLoading(state),
    products: getAllProducts(state),
    message: getAllMessages(state),
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeProductRequest(id)),
    onUpdatePressed: (id, product) => dispatch(updateProductRequest(id, product)),
    startLoadingProducts: () => dispatch(loadProducts()),
    onSetMessagePressed: (message) => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);