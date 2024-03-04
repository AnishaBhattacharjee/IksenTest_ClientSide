import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstence from "../../api/AxiosInstance";
// import { axiosInstance } from "../api/AxiosInstance";


export const Fetchuser=createAsyncThunk('fetchuserdata',async()=>{
    try{
        const res=await axiosInstence.get('adminPanel');
        return res?.data?.data

    }catch(error){
        console.log(error);
    }
})


const initialState={
    user_data:[],
    status:"success"
}

export const AdminSlice=createSlice({
    name:"user",
    initialState,
    reducer:{
    },

    extraReducers: (builder) => {
        builder
          .addCase(Fetchuser.pending, (state) => {
            state.status = 'loading......';
            state.user_data = null;
          })
          .addCase(Fetchuser.fulfilled, (state, action) => {
            state.status = 'success';
            state.user_data = action.payload;
          })
          .addCase(Fetchuser.rejected, (state) => {
            state.status = 'try again';
          });
      },
})