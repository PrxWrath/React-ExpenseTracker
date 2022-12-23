import {createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem('LOGIN_TOKEN');
const email = localStorage.getItem('EMAIL');
const premium_status = localStorage.getItem('PREMIUM_USER');
const initialState = {isLoggedIn: !!token, loginToken: token, loginEmail:email, premium: !!premium_status};

const authSlice = createSlice({
    name:'Authentication',
    initialState,
    reducers:{
        login(state, action){
            state.loginToken = action.payload.token;
            state.loginEmail = action.payload.email;
            localStorage.setItem('LOGIN_TOKEN',action.payload.token);
            localStorage.setItem('EMAIL', action.payload.email);
            state.isLoggedIn = true;
        },
        logout(state){
            state.loginToken = '';
            state.email = '';
            state.premium = false;
            state.isLoggedIn = false;
            localStorage.clear();
        },
        activatePremium(state){
            state.premium = true;
            localStorage.setItem('PREMIUM_USER', true);
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;