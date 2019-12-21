import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import FlashMessage from 'react-native-flash-message';
import { store, persistor } from './store';

import App from './App';

// import { Container } from './styles';

export default function Index() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <App />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </>
  );
}
