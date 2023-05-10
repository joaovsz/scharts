import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import stockReducer from "./request-slice";

const store = configureStore({
  reducer: {
    requests: stockReducer,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
