import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
    reducer:{
        users: usersSlice,
        loader: loadingSlice,
    }
});

export default store;