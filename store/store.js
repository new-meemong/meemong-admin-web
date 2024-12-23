import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

const setupStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(setupStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
