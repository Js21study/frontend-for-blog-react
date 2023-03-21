import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slices/auth";
import  postsSlice  from "./slices/posts";



const store = configureStore({
    reducer: {
        posts: postsSlice,
        auth: authSlice,
    }
});

export default store;