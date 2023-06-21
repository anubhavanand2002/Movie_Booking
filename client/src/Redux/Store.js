import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Features/UserSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
},
});