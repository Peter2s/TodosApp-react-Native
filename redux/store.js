import { configureStore } from '@reduxjs/toolkit'
import todosSlice from './Reducers/todosSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, todosSlice);


export const store = configureStore({
    reducer:{
        todos : persistedReducer
    },
})
export const persistor = persistStore(store);