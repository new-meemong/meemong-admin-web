import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import picture from "./picture";
import user from "./user";
import dashboard from "./dashboard";
import banner from "./banner";
import notice from "./notice";

const combinedReducer = combineReducers({
  picture,
  user,
  dashboard,
  banner,
  notice,
  // 다른 리듀서가 있다면 여기에 추가
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return combinedReducer(state, action);
  }
};

export default rootReducer;
