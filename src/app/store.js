import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Slice
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

// Redux Persist
import {persistReducer, persistStore, FLUSH, PAUSE, PERSIST,  PURGE, REGISTER, REHYDRATE } from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // only auth and cart will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

