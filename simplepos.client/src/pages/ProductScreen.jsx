import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Product/productSlice";
import { addToCart, clearCart } from "../features/Cart/cartSlice";
import { createOrder } from "../features/Order/orderSlice";

// Thêm import toast
import { toast } from "react-toastify";

export default function ProductScreen() {
    const dispatch = useDispatch();
    const { items: products, loading: productsLoading } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = async () => {
        await dispatch(createOrder(total));
        // Thay alert bằng toast.success
        toast.success("Thanh toán thành công!", {
            position: "top-right",
            autoClose: 3000,
        });
        dispatch(clearCart());
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Màn Hình Bán Hàng (POS)</h1>
                {/* Products Grid */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Danh sách sản phẩm</h2>
                    {productsLoading ? (
                        <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {products.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => dispatch(addToCart(product))}
                                    className="bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-200 p-5 text-center group"
                                >
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-3 group-hover:border-blue-300" />
                                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                                    <p className="text-lg font-bold text-blue-600 mt-1">
                                        {product.price.toLocaleString("vi-VN")}₫
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
                {/* Cart Summary */}
                <section className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Chưa có sản phẩm nào</p>
                    ) : (
                        <>
                            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between text-gray-700">
                                        <span>{item.name}</span>
                                        <span className="font-medium">{item.price.toLocaleString("vi-VN")}₫</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t-2 border-gray-300 pt-4">
                                <div className="flex justify-between text-xl font-bold text-gray-800">
                                    <span>Tổng tiền:</span>
                                    <span className="text-blue-600">{total.toLocaleString("vi-VN")}₫</span>
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all ${cartItems.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                            }`}
                    >
                        Thanh toán
                    </button>
                </section>
            </div>
        </div>
    );
}