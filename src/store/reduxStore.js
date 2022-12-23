import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthReducer";
import expenseSlice from "./ExpenseReducer";
import themeSlice from "./ThemeReducer";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        expense: expenseSlice.reducer,
        theme: themeSlice.reducer
    }
})

export default store;