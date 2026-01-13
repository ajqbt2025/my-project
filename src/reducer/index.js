import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import clientReducer from "../slices/clientSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  client: clientReducer,
})

export default rootReducer
