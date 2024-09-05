import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import mailReducer from "../features/mail/mailSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer
    }
})

export default store;