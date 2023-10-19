import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import TokenRefresher from 'router/TokenRefresher';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <TokenRefresher />
                <Routes>
                    <Route path="*" element={<App />}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;