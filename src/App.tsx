import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AddNewList } from "./components/addNewList/add-new-list";
import { AppRootState, InitialState } from "./store/types";
import { getState } from "./store/reduser";
import { Notes } from "./components/list-notes/notes";
import i from "./images/png-transparent-content-creator-thumbnail.png";

function App() {
  const state = useSelector<AppRootState, InitialState[]>((state) => state.notes);

  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getState());
  }, []);
  const onClickHandler = () => {
    setCreate(true);
  };
  return (
    <div className="App">
      {!create ? (
        <div>
          <img src={i} onClick={onClickHandler} alt={"click on me"} /> Create
          new list
        </div>
      ) : (
        <AddNewList create={setCreate} />
      )}
      <div className={"content"}>
        {state.map((n) => {
          return <Notes key={n.listId} notes={n} />;
        })}
      </div>
    </div>
  );
}

export default App;
