import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axiosRef'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const { data } = await instance.get('/posts');
    return data
})

export const fetchPostsNew = createAsyncThunk('posts/fetchPostsNew', async() => {
  const { data } = await instance.get('/posts/new');
  return data
})

export const fetchPostsPopular = createAsyncThunk('posts/fetchPostsPopular', async() => {
  const { data } = await instance.get('/posts/popular');
  return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async() => {
    const { data } = await instance.get('/posts/tags');
    return data
})

export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async(id) => {
  instance.delete(`/posts/${id}`);
  
})

export const fetchTagsByName = createAsyncThunk('posts/fetchTagsByName', async(name) => {
  const { data } = await instance.get(`/posts/tags/${name}`);
  return data
  
})

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  }, 
  tags: {
    items: [],
    status: 'loading',
  },
  allTagsByName: {
    items: [],
    status: 'loading',
  }
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
   
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
        state.posts.items = [];
        state.posts.status = 'loading';   
    },
    [fetchPosts.fulfilled]: (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded';   
    },
    [fetchPosts.rejected]: (state) => {
        state.posts.items = [];
        state.posts.status = 'error';   
    },


  [fetchPostsNew.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';   
  },
  [fetchPostsNew.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';   
  },
  [fetchPostsNew.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';   
  },



[fetchPostsPopular.pending]: (state) => {
    state.posts.items = [];
    state.posts.status = 'loading';   
},
[fetchPostsPopular.fulfilled]: (state, action) => {
    state.posts.items = action.payload;
    state.posts.status = 'loaded';   
},
[fetchPostsPopular.rejected]: (state) => {
    state.posts.items = [];
    state.posts.status = 'error';   
},



    [fetchTags.pending]: (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';   
    },
    [fetchTags.fulfilled]: (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded';   
    },
    [fetchTags.rejected]: (state) => {
        state.tags.items = [];
        state.tags.status = 'error';   
    },


    [fetchTagsByName.pending]: (state) => {
      state.allTagsByName.items = [];
      state.allTagsByName.status = 'loading';   
  },
  [fetchTagsByName.fulfilled]: (state, action) => {
      state.allTagsByName.items = action.payload;
      state.allTagsByName.status = 'loaded';   
  },
  [fetchTagsByName.rejected]: (state) => {
      state.allTagsByName.items = [];
      state.allTagsByName.status = 'error';   
  },



    [fetchRemovePosts.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)  
    },
    
  },
})

export const allTagsByNameSelector = (state) => state.posts.allTagsByName.items

// Action creators are generated for each case reducer function
export const { } = postsSlice.actions

export default postsSlice.reducer