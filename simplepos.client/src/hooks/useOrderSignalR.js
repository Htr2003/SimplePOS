import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { addRealtimeOrder } from "../features/Order/orderSlice";

export default function useOrderSignalR() {
    const dispatch = useDispatch();
    const connectionRef = useRef(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7265/orderHub", {
                withCredentials: true  // Important for CORS with credentials
            })
            .withAutomaticReconnect()
            .build();

        connectionRef.current = connection;

        connection
            .start()
            .then(() => {
                console.log("SignalR Connected!");
                connection.on("NewOrder", (order) => {
                    console.log("New order received:", order);
                    dispatch(addRealtimeOrder(order));
                });
            })
            .catch((err) => console.error("SignalR Connection Error: ", err));

        return () => {
            console.log("SignalR Disconnecting...");
            connection.stop();
        };
    }, [dispatch]);
}