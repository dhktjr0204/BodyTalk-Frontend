import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import './index.css';
import reportWebVitals from './reportWebVitals';
import configureStore from 'redux/configureStore';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root store={store}/>);

if(module.hot) {
    module.hot.accept('./Root', () => root.render(Root));
}

reportWebVitals();