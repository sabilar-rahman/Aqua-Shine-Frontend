import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../../types";

const initialState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  address: "",
  img: "",
};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistrationData(state, action: PayloadAction<TUser>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.password = action.payload.password;
      state.address = action.payload.address;
      state.img = action.payload.img;
    },
  },
});

export const { setRegistrationData } = registerSlice.actions;

export default registerSlice.reducer;