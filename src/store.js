import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLegel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { data } from './Components/Redux/Reducers';

const reducers = {
    data,
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLegel2,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
    createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );