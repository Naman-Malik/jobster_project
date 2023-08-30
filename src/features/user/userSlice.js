import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import {toast} from 'react-toastify'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromStorage } from "../../utils/localStorage";
import { clearAllJobsState } from "./allJobsSlice"; 
import { clearValues } from "./jobSlice";
// import { useDispatch } from "react-redux";
// import logoutUser

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
    'user/registerUser', 
    async (user,thunkAPI)=>{
    // console.log(`Register User ${JSON.stringify(user)}`);
    try {
        const resp = await customFetch.post('/auth/testingRegister',user); // user bhi saath mai bhejenge because post req is expecting an object which is user
        // console.log(resp);
        return resp.data;
    } catch (error) {
        // toast.error(error.response.data.msg);
        // console.log(error.response);
        return thunkAPI.rejectWithValue(error.response.data.msg);
    } 
});
export const loginUser = createAsyncThunk(
    'user/loginUser', 
    async (user,thunkAPI)=>{
    // console.log(`Register User ${JSON.stringify(user)}`);
    try {
        const resp = await customFetch.post('/auth/login',user); // user bhi saath mai bhejenge because post req is expecting an object which is user
        // console.log(resp);
        return resp.data;
    } catch (error) {
        // toast.error(error.response.data.msg);
        // console.log(error.response);
        return thunkAPI.rejectWithValue(error.response.data.msg);
    } 
});


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkAPI) => {
      try {
        const resp = await customFetch.patch('/auth/updateUser', user, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        return resp.data;
      } catch (error) {
        if(error.response.status===401){
            thunkAPI.dispatch(LogoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
);

export const clearStore = createAsyncThunk('user/clearStore',
async(message,thunkAPI)=>{
    try{
        thunkAPI.dispatch(LogoutUser(message));
        thunkAPI.dispatch(clearAllJobsState());
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();
    }catch(error){
        return Promise.reject();
    }
}
) 



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        LogoutUser: (state) =>{
            state.isSidebarOpen = false;
            state.user = null;
            removeUserFromStorage();
        }
    },
    extraReducers:{
        [registerUser.pending]: (state) =>{
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state,{payload}) =>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello There ${user.name}`);
            // console.log(state);
            // console.log(state.isLoading);
            // console.log(state.user);
            // console.log(payload);
            // console.log(user);
        },
        [registerUser.rejected]: (state,{payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        },
        [loginUser.pending]: (state) =>{
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state,{payload}) =>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`);
            // console.log(state);
            // console.log(state.isLoading);
            // console.log(state.user);
            // console.log(payload);
            // console.log(user);
        },
        [loginUser.rejected]: (state,{payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        },
        [updateUser.pending]: (state) =>{
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state,{payload}) =>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Updated changes`);
            // console.log(state);
            // console.log(state.isLoading);
            // console.log(state.user);
            // console.log(payload);
            // console.log(user);
        },
        [updateUser.rejected]: (state,{payload}) =>{
            state.isLoading = false;
            toast.error(payload);
        },
        [clearStore.rejected]:()=>{
            toast.error('There was an error');
        }
    }
})

export const {toggleSidebar,LogoutUser} = userSlice.actions;
export default userSlice.reducer;