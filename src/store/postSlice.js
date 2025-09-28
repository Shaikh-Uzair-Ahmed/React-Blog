// import { createSlice } from "@reduxjs/toolkit";
// import { get } from "react-hook-form";
// import appwriteService from "../appwrite/config";

// const initialState = {
//     posts : appwriteService.getPosts()
// }

// const postSlice = createSlice({
//     name: "posts",
//     initialState,
//     reducers:{
//         setPosts: (state,action)=>{
//             state.posts.push(action.payload);
//         },
//         updatePost: (state,action)=>{
//             const index = state.posts.findIndex(post => post.$id === action.payload.$id);
//             if (index !== -1) {
//                 state.posts[index] = action.payload;
//             }
//         },
//         deletePost: (state,action)=>{   
//             state.posts = state.posts.filter(post => post.$id !== action.payload);
//         },
//     }
// })

// export const {setPosts,updatePost,deletePost,getPosts} = postSlice.actions;
// export default postSlice.reducer;