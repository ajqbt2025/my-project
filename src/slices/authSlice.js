import { createSlice } from "@reduxjs/toolkit";
const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") return null;
    return JSON.parse(token);
  } catch {
    return null;
  }
};



const initialState = {
  signupData: null,
  loading: false,
 token: getToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
