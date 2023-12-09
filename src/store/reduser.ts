import {v1} from "uuid";

const initialState: InitialState[] = []
export const notesReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_LIST: {
            return [{
                listName: action.title,
                listId: v1(),
                notes: [],
                tags: [],
            }, ...state]
        }
        case ADD_NOTE: {
            return state.map(l => l.listId === action.payload.listId ? {
                ...l,
                notes: [{id: v1(), important: false, title: action.payload.title, tags: action.payload.tags}, ...l.notes]
            } : l)
        }
        case UPDATE_NOTE: {
            return state.map(l => l.listId === action.payload.listId ? {
                ...l,
                notes: l.notes.map(n => n.id === action.payload.noteId ? {...n, title: action.payload.newTitle, tags: action.payload.tags} : n)
            } : l)
        }
        case DELETE_NOTE: {
            return state.map(l => l.listId === action.listId ? {
                ...l,
                notes: l.notes.filter(n => n.id !== action.idNote)
            } : l)
        }
        case UPDATE_LIST_NAME: {
            return state.map(l => l.listId === action.listId ? {...l, listName: action.newListName} : l)
        }
        case PICK_OUT_NOTE: {
            return state.map(l => l.listId === action.payload.listId ? {
                ...l,
                notes: l.notes.map(n => n.id === action.payload.noteId ? {...n, important: !n.important} : n)
            } : l)
        }
        case GET_STATE: {
            if (!!action.state) {
                return action.state.notes
            }
            return []
        }
        case DELETE_LIST: {
            return state.filter(l => l.listId !== action.listId)
        }
        default:
            return state
    }
}
//actions
export const deleteList = (listId: string) => ({type: DELETE_LIST, listId} as const)

export const getState = () => ({type: GET_STATE, state: JSON.parse(localStorage.getItem("state") || '')} as const)
export const pickOutNote = (payload: { listId: string, noteId: string, important: boolean }) => (
    {type: PICK_OUT_NOTE, payload} as const)
export const addList = (title: string) => ({type: ADD_LIST, title} as const)
export const addNote = (payload: { title: string, listId: string, tags: string[] }) => ({type: ADD_NOTE, payload} as const)
export const updateNote = (payload: { newTitle: string, listId: string, noteId: string, tags: string[] }) => ({type: UPDATE_NOTE, payload} as const)
export const updateListName = (newListName: string, listId: string) => ({type: UPDATE_LIST_NAME, newListName, listId} as const)
export const deleteNote = (listId: string, idNote: string) => ({type: DELETE_NOTE, listId, idNote} as const)

//types
export type InitialState = {
    listName: "What to learn",
    listId: string,
    notes: NotesType[]
}
export type NotesType = {
    id: string,
    important: boolean,
    title: string,
    tags: string[]
}
type ActionsType = ReturnType<typeof deleteList>
    | ReturnType<typeof getState>
    | ReturnType<typeof pickOutNote>
    | ReturnType<typeof addList>
    | ReturnType<typeof addNote>
    | ReturnType<typeof updateNote>
    | ReturnType<typeof updateListName>
    | ReturnType<typeof deleteNote>

// NOTES/ADD-LIST redux ducks
const DELETE_LIST = "NOTE/DELETE_LIST"
const GET_STATE = "NOTE/GET_STATE"
const ADD_LIST = "NOTE/ADD_LIST"
const ADD_NOTE = "NOTE/ADD_NOTE"
const PICK_OUT_NOTE = "NOTE/PICK_OUT_NOTE"
const UPDATE_NOTE = "NOTE/UPDATE_NOTE"
const UPDATE_LIST_NAME = "NOTE/UPDATE_LIST_NAME"
const DELETE_NOTE = "NOTE/DELETE_NOTE"