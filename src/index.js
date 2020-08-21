import React from 'react';
import ReactDOM from 'react-dom';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from './store';
import App from './App.js';
import Login from './Pages/Login/Login';
import Logout from './Pages/Logout/Logout';
import NotFound from './Pages/NotFound/NotFound';

import './index.css';

const store = configureStore();
const persistor = persistStore(store);


    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <BrowserRouter basename="/">
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route exact path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </PersistGate>
        </Provider>,
        document.getElementById('root')
    );
       