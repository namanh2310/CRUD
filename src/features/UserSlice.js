import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../UserData";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: userData },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    delUser: (state, action) => {
      state.value.splice(action.payload, 1);
    },
    updateUser: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.date = action.payload.date;
        }
        return state.value;
      });
    },
  },
});

export default userSlice.reducer;
export const { addUser, delUser, updateUser } = userSlice.actions;
