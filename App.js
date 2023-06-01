import React, { useState } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { Provider } from 'react-redux';
import {store,persistor}  from './redux/store';
import {Routes} from "./Routes";
import {PersistGate} from "redux-persist/integration/react";

export default function App() {


  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer>
                  <Routes/>
              </NavigationContainer>
          </PersistGate>
      </Provider>
  );
}

