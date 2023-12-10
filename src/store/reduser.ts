import { v1 } from "uuid";
import {
  ActionsType,
  ADD_LIST,
  ADD_NOTE, DELETE_LIST,
  DELETE_NOTE,
  GET_STATE, InitialState,
  PICK_OUT_NOTE,
  UPDATE_LIST_NAME,
  UPDATE_NOTE
} from "./types";

const initialState: InitialState[] = [];
export const notesReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case ADD_LIST: {
      return [
        {
          listName: action.title,
          listId: v1(),
          notes: [],
          tags: [],
        },
        ...state,
      ];
    }
    case ADD_NOTE: {
      return state.map((l) =>
        l.listId === action.payload.listId
          ? {
              ...l,
              notes: [
                {
                  id: v1(),
                  important: false,
                  title: action.payload.title,
                  tags: action.payload.tags,
                },
                ...l.notes,
              ],
            }
          : l,
      );
    }
    case UPDATE_NOTE: {
      return state.map((l) =>
        l.listId === action.payload.listId
          ? {
              ...l,
              notes: l.notes.map((n) =>
                n.id === action.payload.noteId
                  ? {
                      ...n,
                      title: action.payload.newTitle,
                      tags: action.payload.tags,
                    }
                  : n,
              ),
            }
          : l,
      );
    }
    case DELETE_NOTE: {
      return state.map((l) =>
        l.listId === action.listId
          ? {
              ...l,
              notes: l.notes.filter((n) => n.id !== action.idNote),
            }
          : l,
      );
    }
    case UPDATE_LIST_NAME: {
      return state.map((l) =>
        l.listId === action.listId ? { ...l, listName: action.newListName } : l,
      );
    }
    case PICK_OUT_NOTE: {
      return state.map((l) =>
        l.listId === action.payload.listId
          ? {
              ...l,
              notes: l.notes.map((n) =>
                n.id === action.payload.noteId
                  ? { ...n, important: !n.important }
                  : n,
              ),
            }
          : l,
      );
    }
    case GET_STATE: {
      if (!!action.state) {
        return action.state.notes;
      }
      return [];
    }
    case DELETE_LIST: {
      return state.filter((l) => l.listId !== action.listId);
    }
    default:
      return state;
  }
};
//actions
export const deleteList = (listId: string) =>
  ({ type: DELETE_LIST, listId }) as const;

export const getState = () => {
  const stateFromLS = localStorage.getItem('state');

   return {
      type: GET_STATE,
        state: stateFromLS ? JSON.parse(localStorage.getItem("state") || "") : null,
    } as const
 };
export const pickOutNote = (payload: {
  listId: string;
  noteId: string;
  important: boolean;
}) => ({ type: PICK_OUT_NOTE, payload }) as const;
export const addList = (title: string) => ({ type: ADD_LIST, title }) as const;
export const addNote = (payload: {
  title: string;
  listId: string;
  tags: string[];
}) =>
  ({
    type: ADD_NOTE,
    payload,
  }) as const;
export const updateNote = (payload: {
  newTitle: string;
  listId: string;
  noteId: string;
  tags: string[];
}) => ({ type: UPDATE_NOTE, payload }) as const;
export const updateListName = (newListName: string, listId: string) =>
  ({
    type: UPDATE_LIST_NAME,
    newListName,
    listId,
  }) as const;
export const deleteNote = (listId: string, idNote: string) =>
  ({ type: DELETE_NOTE, listId, idNote }) as const;


