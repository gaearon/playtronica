import React from 'react';
import { render } from 'react-dom';
import App from './App';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { Provider } from 'react-redux';

const middleware = process.env.NODE_ENV === 'production' ?
  [thunk] :
  [thunk, require('redux-logger')()];
const finalCreateStore = compose(
  applyMiddleware(...middleware),
  persistState()
)(createStore);
const store = finalCreateStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    let NextApp = require('./App');
    render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('root')
    );
  });

  module.hot.accept('./reducers', () => {
    let nextReducer = require('./reducers');
    store.replaceReducer(nextReducer);
  });  
}
