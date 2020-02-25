import React, {useState, useRef, useEffect} from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ContentEditable from "react-contenteditable";
import StyledCheckbox from './Checkbox'
import {customNoteStyles, customButtonStyles, blurBackground} from "../custom-styles/note-expanded";

function ToDoList(props){

  useEffect(() => {
    // Execute after the render is completed
    document.addEventListener("mousedown", handleClick);
    // Remove if component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const note = useRef();

  function handleClick(event){
    // If the current node contains the triggered event
    if (note.current.contains(event.target)) {
      // inside click
      return;
    }
    // outside click
    setIsClicked(false);
  };

  function expandCenter(){
    setIsClicked(true);
  }

  return(
    <div>
      <div ref={note} onClick={expandCenter} className="note" style={isClicked ? customNoteStyles : null}>
        {isClicked ? <ContentEditable key={props.id} className="editable title" html={props.title} onChange={event => props.updateTitle(event, props.id)}/> : <h1 className="title">{props.title}</h1>}
        {props.content.map(toDoItem => isClicked ? <ContentEditable key={toDoItem.id} className="editable content" html={toDoItem.content} onChange={event => props.updateContent(event, props.id)}/> : <div className="todo-wrapper"><input type="checkbox" onClick={(event) => props.deleteToDoItem(event, props.id, toDoItem.key)} /><p className="content">{toDoItem.content}</p></div>)}
        <div className="button-wrapper">
          <button onClick={() => props.deleteToDoList(props.id)} style={isClicked ? customButtonStyles : null}><DeleteRoundedIcon/></button>
        </div>
      </div>
      <div style={isClicked ? blurBackground : null}></div>
    </div>
  )
}

export default ToDoList;
