import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style.css"
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/redusers/rootReducer'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);