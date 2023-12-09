import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import e from "./editable-span.module.css";
import { useDispatch } from "react-redux";
import { updateListName } from "../../store/reduser";

export const EditableSpan = (props: any) => {
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState(props.listName);
  const dispatch = useDispatch();
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onBlurHandler = () => {
    setUpdate(false);
    dispatch(updateListName(value, props.listId));
  };
  return (
    <div className={e.editableSpanContainer}>
      {!update ? (
        <h3 onDoubleClick={() => setUpdate(true)}>{props.listName}</h3>
      ) : (
        <TextField
          autoFocus
          id="standard-basic"
          variant="standard"
          value={value}
          onChange={changeHandler}
          onBlur={onBlurHandler}
        />
      )}
    </div>
  );
};