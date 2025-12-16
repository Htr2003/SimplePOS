import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductScreen from './pages/ProductScreen.jsx';
import OrderScreen from './pages/OrderScreen.jsx';

function App() {
    return (
        <div>
            <Router>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Zoom}
                    toastStyle={{ fontWeight: "bold" }}
                />
                <Routes>
                    <Route path="/" element={<ProductScreen />} />
                    <Route path="/orders" element={<OrderScreen />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;