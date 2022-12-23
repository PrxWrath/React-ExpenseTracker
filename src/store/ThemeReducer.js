import {createSlice} from '@reduxjs/toolkit';

const initialState = {theme:'light', themeClass:''};

const themeSlice  = createSlice({
    name:'Theme',
    initialState, 
    reducers:{
        toggleTheme(state){
            if(state.theme==='light'){
                state.theme = 'dark';
                state.themeClass = 'bg-dark text-light'
            }
            else{
                state.theme = 'light';
                state.themeClass = '';
            }
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice;