import {createSlice} from '@reduxjs/toolkit';

const initialState = {expenses:[], total:Number(0), loaded:true };

const expenseSlice = createSlice({
    name:'expenses',
    initialState,
    reducers: {
       addExpense(state,action){
        state.expenses = [{
                id: action.payload.id,
                amount: action.payload.amount,
                description: action.payload.description,
                category: action.payload.category,
                createdAt: action.payload.createdAt
        }, ...state.expenses]
        state.total = state.total+action.payload.amount
        state.loaded = false;
       },

       removeExpense(state,action){
        state.expenses = [...state.expenses.filter(expense=>expense.id!==action.payload.id)]
        state.total = state.total-action.payload.amount;
        state.loaded = false;
       },

       updateExpense(state, action){
        let expenseToUpdate = state.expenses.find(expense=>expense.id===action.payload.id)
        expenseToUpdate.id = action.payload.id
        expenseToUpdate.amount = action.payload.amount
        expenseToUpdate.description = action.payload.description
        expenseToUpdate.category = action.payload.category
        expenseToUpdate.createdAt = action.payload.createdAt
        
        state.total = state.total-action.payload.oldAmount
        state.total += action.payload.amount 
       },

       load(state,action){
        state.total = action.payload.total;
        state.expenses = action.payload.expenses;
        state.loaded = true;
       },

       clear(state){
        state.expenses  = [];
        state.total = 0;
       }
    }
})

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
