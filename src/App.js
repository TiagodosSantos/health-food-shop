import React from 'react';
import { hot } from 'react-hot-loader';
import Header from './Components/Header/Header';
import ProductList from './Pages/Product/ProductList';
import styled from 'styled-components';

const AppContainer = styled.div`
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;
    width:100vw;
    height:100vh;
`;

const App = () => (
    <AppContainer>
        <Header />
        <ProductList />
    </AppContainer>
);

export default hot(module)(App);