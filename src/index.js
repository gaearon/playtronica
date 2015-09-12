import React from 'react';
import { render } from 'react-dom';
import App from './App';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { Provider } from 'react-redux';

const logger = createLogger();
const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
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
