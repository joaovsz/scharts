import storage from "redux-persist/lib/storage";
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import stockReducer from "./request-slice";

import { persistStore, persistReducer } from "redux-persist";

const store = configureStore({
  reducer: {
    requests: stockReducer,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
