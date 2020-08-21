import 'node-fetch'; 
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { loadProducts } from '../Components/Api/thunks';

describe('The loadProducts thunk', () => {
    it('Dispatches the correct actions in the success scenario', async() => {
        const fakeDispatch = sinon.spy();

        const fakeProducts = [{title: 'Product 1'}, {title: 'Product 2'}];
        fetchMock.get('http://localhost:8080/store/products', fakeProducts);

        const expectedFirstAction = {type: 'LOAD_PRODUCTS_IN_PROGRESS'};
        const expectedSecondAction = {
            type: 'LOAD_PRODUCTS_SUCCESS',
            payload: {
                products: fakeProducts,
            },
        };

        await loadProducts()(fakeDispatch);

        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

        fetchMock.reset();
    });
});