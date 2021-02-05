import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './src/configs/AppNavigation';
import store from './src/store';
import { Provider } from 'react-redux';
import { Root } from "native-base";

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <Provider store={store}>
        <Root>
        <AppNavigation />
        </Root>
      </Provider>
    </>
  );
};


export default App;
