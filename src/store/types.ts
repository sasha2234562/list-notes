import {
  addList,
  addNote,
  deleteList,
  deleteNote,
  getState,
  pickOutNote,
  updateListName,
  updateNote,
} from "./reduser";
import { store } from "./store";

export type AppRootState = ReturnType<typeof store.getState>;

export type InitialState = {
  listName: "What to learn";
  listId: string;
  notes: NotesType[];
};
export type NotesType = {
  id: string;
  important: boolean;
  title: string;
  tags: string[];
};
export const GET_STATE = "NOTE/GET_STATE";
export type ActionsType =
  | ReturnType<typeof deleteList>
  | ReturnType<typeof getState>
  | ReturnType<typeof pickOutNote>
  | ReturnType<typeof addList>
  | ReturnType<typeof addNote>
  | ReturnType<typeof updateNote>
  | ReturnType<typeof updateListName>
  | ReturnType<typeof deleteNote>;

// NOTES/ADD-LIST redux ducks
export const DELETE_LIST = "NOTE/DELETE_LIST";
export const ADD_LIST = "NOTE/ADD_LIST";
export const ADD_NOTE = "NOTE/ADD_NOTE";
export const PICK_OUT_NOTE = "NOTE/PICK_OUT_NOTE";
export const UPDATE_NOTE = "NOTE/UPDATE_NOTE";
export const UPDATE_LIST_NAME = "NOTE/UPDATE_LIST_NAME";
export const DELETE_NOTE = "NOTE/DELETE_NOTE";