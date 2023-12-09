import { combineReducers, createStore } from "redux";
import { notesReducer } from "./reduser";

const rootReducer = combineReducers({
  notes: notesReducer,
});
export const store = createStore(rootReducer);

export type AppRootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});