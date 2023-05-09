import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/auth";
import  postsSlice  from "./slices/posts";
import  commentsSlice  from "./slices/comments";



const store = configureStore({
    reducer: {
        posts: postsSlice,
        auth: authSlice,
        comments: commentsSlice,
    }
});

export default store;