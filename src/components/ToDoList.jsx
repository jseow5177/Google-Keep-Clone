import React, {useState, useRef, useEffect} from "react";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ContentEditable from "react-contenteditable";
import ToDoItem from './ToDoItem';
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

        <ContentEditable className="editable title" html={props.title} disabled={isClicked ? false : true} onChange={event => props.updateTitle(event, props.noteId)}/>

        {!props.content.length ? <p className="todoitem"></p> : null}  { /* Show "Empty List" when list is empty */}

        {props.content.map(toDoItem => <ToDoItem deleteToDoItem={props.deleteToDoItem} noteId={props.noteId} toDoItemId={toDoItem.key} toDoItem={toDoItem.content} isClicked={isClicked}/>)}

        <div className="button-wrapper">
          <button onClick={() => props.deleteToDoList(props.noteId)} style={isClicked ? customButtonStyles : null}><DeleteRoundedIcon/></button>
        </div>
      </div>
      <div style={isClicked ? blurBackground : null}></div>
    </div>
  )
}

export default ToDoList;
