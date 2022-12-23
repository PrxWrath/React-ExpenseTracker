import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthReducer";
import expenseSlice from "./ExpenseReducer";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense: expenseSlice.reducer
    }
})

export default store;