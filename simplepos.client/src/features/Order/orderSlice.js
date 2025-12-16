import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderApi, fetchOrdersApi } from "./orderService";

export const createOrder = createAsyncThunk(
  "orders/create",
  async totalAmount => await createOrderApi(totalAmount)
);

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async () => await fetchOrdersApi()
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
  },
  reducers: {
    addRealtimeOrder: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { addRealtimeOrder } = orderSlice.actions;
export default orderSlice.reducer;
