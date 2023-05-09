import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axiosRef'



export const fetchCommentsByIdPost = createAsyncThunk('posts/fetchCommentsByIdPost', async(idPost) => {
  const { data } = await instance.get(`/comments/${idPost}`);
  return data
  
})


export const fetchComments = createAsyncThunk('posts/fetchComments', async() => {
  const { data } = await instance.get(`/comments`);
  return data
  
})




const initialState = {
  comments: {
    items: [],
    status: 'loading',
  }, 
  commentsAll: {
    items: [],
    status: 'loading',
  }, 
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
   
  },
  extraReducers: {
    [fetchCommentsByIdPost.pending]: (state) => {
        state.comments.items = [];
        state.comments.status = 'loading';   
    },
    [fetchCommentsByIdPost.fulfilled]: (state, action) => {
        state.comments.items = action.payload;
        state.comments.status = 'loaded';   
    },
    [fetchCommentsByIdPost.rejected]: (state) => {
        state.comments.items = [];
        state.comments.status = 'error';   
    },


    [fetchComments.pending]: (state) => {
      state.commentsAll.items = [];
      state.commentsAll.status = 'loading';   
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.commentsAll.items = action.payload;
      state.commentsAll.status = 'loaded';   
    },
    [fetchComments.rejected]: (state) => {
      state.commentsAll.items = [];
      state.commentsAll.status = 'error';   
    },

  },
})




// Action creators are generated for each case reducer function
export const { } = commentsSlice.actions

export default commentsSlice.reducer