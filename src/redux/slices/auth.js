import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axiosRef'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async(params) => {
    const { data } = await instance.post('/auth/login', params);
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async(params) => {
  const { data } = await instance.post('/auth/register', params);
  return data
})


export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async() => {
  const { data } = await instance.get('/auth/me');
  return data
})




const initialState = {
  data: null,
  status: 'loading',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   logout: (state) => {
    state.data = null;
   } 
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
        state.data = null;
        state.status = 'loading';   
    },
    [fetchAuth.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';   
    },
    [fetchAuth.rejected]: (state) => {
        state.data = null;
        state.status = 'error';   
    },



    [fetchAuthMe.pending]: (state) => {
        state.data = null;
        state.status = 'loading';   
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';   
    },
    [fetchAuthMe.rejected]: (state) => {
        state.data = null;
        state.status = 'error';   
    },



    

    [fetchRegister.pending]: (state) => {
        state.data = null;
        state.status = 'loading';   
    },
    [fetchRegister.fulfilled]: (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';   
    },
    [fetchRegister.rejected]: (state) => {
        state.data = null;
        state.status = 'error';   
    },
  },
})
export const isAuthSelector = (state) => Boolean(state.auth.data)
export const dataSelector = (state) => state.auth.data
// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer