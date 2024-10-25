import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from  "./reducers/productSlice";
import cartReducer from "./reducers/cartSLice";
import { 
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { iCart } from "../models/cart.model";
import { IProduct, IProductState } from "../models/product.model";


const persistConfig = {
    key: 'cart',
    storage
}

const rootReducer = combineReducers({
    cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart:  persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH,  REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),

});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export interface RootState {
//     cart: iCart[],
//     products: IProductState
// };
export type AppDispatch = typeof store.dispatch;


  