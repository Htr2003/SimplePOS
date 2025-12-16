import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/Order/orderSlice";
import useOrderSignalR from "../hooks/useOrderSignalR";
import { format } from "date-fns";

export default function OrderScreen() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders?.list || []);
    const loading = useSelector((state) => state.orders?.loading ?? false);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // Connect to SignalR for realtime updates
    useOrderSignalR();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">
                    Đơn Hàng Thời Gian Thực
                </h1>

                {loading && orders.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">Đang tải đơn hàng...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-500">Chưa có đơn hàng nào</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {orders
                            .slice()
                            .reverse()
                            .map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-2xl transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-lg text-gray-800">Đơn hàng #{order.id}</h3>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Hoàn thành
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tổng tiền:</span>
                                            <span className="font-bold text-xl text-blue-600">
                                                {order.totalAmount.toLocaleString("vi-VN")}₫
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Thời gian:</span>
                                            <span className="text-sm text-gray-700">
                                                {format(new Date(order.createdAt), "HH:mm:ss - dd/MM/yyyy")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                <div className="mt-12 text-center text-sm text-gray-500">
                    Cập nhật tự động theo thời gian thực qua SignalR
                </div>
            </div>
        </div>
    );
}