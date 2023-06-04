import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";

export const postProducts = createAsyncThunk(
    "auto/postProducts",
    async (_, thunkAPI) => {
      try {
        const res = await axios.post(`${BASE_URL}/auto`);
        return res.data;
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err);
      }
    }
  );

  const postProductSlice = createSlice({
    name: "user",
    initialState: {
      currentUser: null,
      cart: [],
      isLoading: false,
      formType: "signup",
      showForm: false,
    },
    reducers: {
        filterByPrice: (state, { payload }) => {
          state.filtered = state.list.filter(({ price }) => price < payload);
         },
          getRelatedProducts: (state, { payload }) => {
           const list = state.list.filter(({ type_id: { id } }) => id === payload);
          state.related = shuffle(list);
        },
       },
       traReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled,  (state, { payload }) => {
          state.list = payload;
          state.isLoading = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
          state.isLoading = false;
        });
      },
    
    });
    
    export const { filterByPrice, getRelatedProducts} = productsSlice.actions;
    
    export default productsSlice.reducer;
    