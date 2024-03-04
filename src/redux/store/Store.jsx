import { configureStore } from "@reduxjs/toolkit";
import { UserAuthSlice } from "../slice/AuthSlice";
import { AdminSlice } from "../slice/AdminSlice";



const Store = configureStore({
    reducer:{
        auth : UserAuthSlice.reducer,
        adminData: AdminSlice.reducer
    }
})

export default Store