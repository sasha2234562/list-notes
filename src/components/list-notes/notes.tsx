import React from "react";
import { CreateNote } from "../create-note/create-note";
import { EditableSpan } from "../editable-span/editable-span";
import { Note } from "./note/note";
import n from "./notes.module.css";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteList, InitialState } from "../../store/reduser";
import DeleteIcon from "@mui/icons-material/Delete";

export const Notes = (props: { notes: InitialState }) => {
  const notes: InitialState = props.notes;
  const dispatch = useDispatch();
  const deleteListHandler = () => {
    dispatch(deleteList(notes.listId));
  };
  return (
    <div className={n.notesContainer}>
      <IconButton onClick={deleteListHandler} aria-label="delete" size="large">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <EditableSpan listId={notes.listId} listName={notes.listName} />
      <CreateNote listId={notes.listId} notes={notes} />
      <div>
        {props.notes.notes.map((n) => {
          return <Note key={n.id} listId={notes.listId} note={n} />;
        })}
      </div>
    </div>
  );
};
