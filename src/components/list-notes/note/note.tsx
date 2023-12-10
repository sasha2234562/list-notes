import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import n from "./note.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteNote, pickOutNote, updateNote } from "../../../store/reduser";
import GradeIcon from "@mui/icons-material/Grade";
import { NotesType } from "../../../store/types";

export const Note = (props: { listId: string; note: NotesType }) => {
  const { listId, note } = props;

  const [update, setUpdate] = useState(false);
  const [valueNote, setValueNote] = useState(note.title);
  const [tags, setTags] = useState<string[]>(note.tags);
  const [error, SetError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const updateNoteHandler = () => {
    setUpdate(true);
  };
  const changeNoteHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValueNote(newValue);
    setTags(() => {
      // Используем метод match для поиска всех подстрок в строке newValue,
      // которые соответствуют регулярному выражению /#(\w+)/g.
      // Регулярное выражение ищет символ #, за которым следует один
      // или более символов слова (\w+). Флаг g обеспечивает глобальный
      // поиск всех совпадений, а не только первого.
      return newValue.match(/#(\w+)/g) || [];
    });
  };
  const onBlurHandler = () => {
    if (valueNote.length <= 3) {
      // minimum number of characters for a note
      debugger;
      SetError(true);
      setUpdate(true);
    } else {
      dispatch(
        updateNote({
          newTitle: valueNote,
          listId: listId,
          noteId: note.id,
          tags,
        }),
      );
      SetError(false);
      setUpdate(false);
    }
  };
  const deleteNoteHandler = () => {
    dispatch(deleteNote(listId, note.id));
  };
  const pickOutNoteHandler = () => {
    dispatch(
      pickOutNote({ listId, noteId: note.id, important: !note.important }),
    );
  };

  return (
    <>
      <div className={n.containerNote}>
        {/*<div>*/}
          <GradeIcon
            onClick={pickOutNoteHandler}
            className={note.important ? n.starImportant : n.star}
          />
          {update ? (
            <TextField
              error={error}
              className={n.containerNoteInput}
              autoFocus
              id="standard-basic"
              variant="standard"
              value={valueNote}
              onChange={changeNoteHandler}
              onBlur={onBlurHandler}
            />
          ) : (
            <span onDoubleClick={updateNoteHandler}>
              {props.note.title}
            </span>
          )}
          {error && <div className={n.error}>If the note length should be at least 3 characters.</div>}
        {/*</div>*/}
        <IconButton aria-label="delete" size="small">
          <DeleteIcon onClick={deleteNoteHandler} fontSize={"small"} />
        </IconButton>
      </div>
      {update && !!tags.length && (
        <div className={n.tags}>
          Tags:
          <br />{" "}
          {tags.map((t, index) => (
            <div key={index} className={n.tags}>
              {t}
            </div>
          ))}
        </div>
      )}
      <hr />
    </>
  );
};
