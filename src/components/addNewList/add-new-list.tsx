import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState } from "react";
import { addList } from "../../store/reduser";
import a from "./add-new-list.module.css";

export const AddNewList = (props: { create: (value: boolean) => void }) => {
  const dispatch = useDispatch();
  const [valueList, setValueList] = useState("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueList(e.currentTarget.value);
  };
  const addListHandler = () => {
    dispatch(addList(valueList));
    props.create(false);
  };
  const onBlurHandler = () => {
    if (valueList.length === 0) {
      props.create(false);
    }
  };

  return (
    <div className={a.addList}>
      <TextField
        value={valueList}
        onChange={onChangeHandler}
        label="Add new list"
        variant="outlined"
        autoFocus
        onBlur={onBlurHandler}
      />
      <Button
        variant="outlined"
        onClick={addListHandler}
      >
        +
      </Button>
    </div>
  );
};
