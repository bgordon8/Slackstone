import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import App from './App';
import Styles from './components/Styles';

const store = createStore(reducers, applyMiddleware(logger, thunk));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Styles />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
