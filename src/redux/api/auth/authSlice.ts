// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
// import { TAutState } from "../../../types";

import { RootState } from "@/redux/store";
import { TAutState, TUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TAutState = {
    user: null,
    token: null,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (
        state,
        action: PayloadAction<{ user: TUser | null; token: string | null }>
      ) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
      },
      updateUserInfo: (state, action: PayloadAction<Partial<TUser>>) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      },
    },
  });
  
  export const { setUser, logout, updateUserInfo } = authSlice.actions;
  export default authSlice.reducer;
  
  export const useCurrentToken = (state: RootState) => state.auth.token;
  export const useCurrentUser = (state: RootState) => state.auth.user;
  
  export const isAuthenticated = (state: RootState) => !!state.auth.token;