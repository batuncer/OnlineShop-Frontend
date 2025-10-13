import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Slice
import authReducer from "../modules/auth/authSlice";
import cartReducer from "../modules/cart/cartSlice";
import productReducer from "../modules/product/productSlice";
import orderReducer from "../modules/order/orderSlice";
import userReducer from "../modules/user/userSlice";

// Redux Persist
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Use local storage
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  order: orderReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // only auth and cart will be persisted
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
