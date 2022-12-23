import {createSlice} from '@reduxjs/toolkit';

const initialState = {expenses:[], total:0};

const expenseSlice = createSlice({
    name:'expenses',
    initialState,
    reducers: {
       addExpense(state,action){
        state.expenses = [action.payload, ...state.expenses];
       },
       clear(state){
        state.expenses = [];
       },
       updateTotal(state,action){
        state.total = action.payload;
       } 
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
