import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productReducer from './features/Product/productSlice.js'
import orderReducer from './features/Order/orderSlice.js'
import cartReducer from './features/Cart/cartSlice.js'

import "./index.css"
import App from './App.jsx'

const rootReducer = combineReducers({
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer,

});

const store = configureStore({
    reducer: rootReducer,
});

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
