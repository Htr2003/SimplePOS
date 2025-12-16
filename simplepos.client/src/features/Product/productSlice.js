import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsApi } from "./productService";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => await fetchProductsApi()
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default productSlice.reducer;
