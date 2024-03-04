import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstence from '../../api/AxiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const initialState = {
    loading: false,
    user: {}, // for user object
    redirectTo: null,
    Logouttoggle: false,
    userName: false,
    redirectReg: null,
};

const navigate=useNavigate

export const registerUser = createAsyncThunk("/signup", async (formdata) => {
    try {
        console.log("Sending registration request with data:", formdata);
        const res = await axiosInstence.post("register", formdata);
        console.log("Registration response:", res?.data);
        return res?.data;
    } catch (error) {
        toast("Registration failed");
        console.error(error);
        return Promise.reject(error);
    }
});

export const loginRequest = createAsyncThunk("/login", async (user) => {
    try {
      const res = await axiosInstence.post("login", user);
      return res?.data;
    } catch (error) {
      toast("failed login");
      console.log(error);
    }
  });

export const UserAuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        check_token: (state, { payload }) => {
            let token = localStorage.getItem("userToken");
            if (token !== null && token !== undefined) {
                state.Logouttoggle = true;
                state.Logoutadmin = true;
            }
        },
        RegLog: (state, { payload }) => {
            localStorage.removeItem("name");
            state.Logouttoggle = false;
            state.redirectTo = null;
        },
        redirectToo: (state, { payload }) => {
            state.redirectTo = payload;
        },
        redirectTo_Register: (state, { payload }) => {
            state.redirectReg = payload;
        },
        logout: (state) => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("name");
            toast("Logout successful");
            navigate('/login'); 
            state.Logouttoggle = false;
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                if (payload?.status === true) {
                    localStorage.setItem("name", payload?.data.name);
                    localStorage.setItem("email", payload?.data.email);
                    localStorage.setItem("mobile", payload?.data.mobile);
                    state.redirectReg = "/login";
                    state.loading = false;
                    toast(payload?.data.message);
                } else {
                    state.redirectReg = "/register";
                    toast(payload?.message);
                }
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(loginRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginRequest.fulfilled, (state, { payload }) => {
                if (payload?.status === 200) {
                    localStorage.setItem("userToken", payload?.userToken);
                    localStorage.setItem("name", payload?.data?.name);
                    localStorage.setItem("email", payload?.data?.email);
                    localStorage.setItem("mobile", payload?.data?.mobile);
                    localStorage.setItem("isAdmin", payload?.data?.isAdmin);
                    state.Logouttoggle = true;
                    state.redirectTo = "/";
                    toast(payload?.message);
                }
            })
            .addCase(loginRequest.rejected, (state) => {
                state.loading = false;
            });
    },    
});

export const { check_token, redirectToo, redirectTo_Register, RegLog, logout } = UserAuthSlice.actions;

export default UserAuthSlice.reducer;
