import {
  ColorModeScript
} from '@chakra-ui/react';
import React, {
  StrictMode
} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
