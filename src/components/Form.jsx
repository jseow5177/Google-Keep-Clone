import React, {useState, useRef, useEffect} from "react";
import uuid from 'react-uuid';
import ToDoItem from './ToDoItem'
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddIcon from '@material-ui/icons/Add';
import NotesIcon from '@material-ui/icons/Notes';
import TextareaAutosize from 'react-textarea-autosize';

function Form(props){

  useEffect(() => {
    // Execute after the render is completed
    document.addEventListener("mousedown", handleClick);
    // Remove if component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const [isList, setIsList] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const form = useRef();
  // Note
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // ToDo List
  const [toDoItems, setToDoItems] = useState([]);

  function expandForm(){
    setIsExpanded(true);
  }

  function handleClick(event){
    // If the current node contains the triggered event
    if (form.current.contains(event.target)) {
      // inside click
      return;
    }
    // outside click
    setIsExpanded(false);
  };

  function handleEnter(event, key){
    if (event.key !== 'Enter')
    {
      return;
    }
    else {
      let newToDoItem = {
        key: uuid(),
        content: event.target.value
      }
      event.preventDefault(); // Prevent newline from being added
      setToDoItems(prevToDoItems => [...prevToDoItems, newToDoItem])
      setContent("");
    }
  }

  function changeTitle(event){
    setTitle(event.target.value)
  }

  function changeContent(event){
    setContent(event.target.value)
  }

  function resetForm(event){
    event.stopPropagation();
    setIsExpanded(false);
    setTitle("");
    setContent("");
    setToDoItems([]);
  }

  function changeType(){
    setIsList(!isList);
    setToDoItems([]);
  }

  return(
    <div onClick={expandForm} ref={form}>
      <form className="create-note">

        {/* Show Title input when form is clicked */}
        {isExpanded ? <input onChange={changeTitle} value={title} name="title" autoComplete="off" autoFocus placeholder="Title" /> : null}

        {/* This section of code does two things */}
        {toDoItems.map(toDoItem => <ToDoItem key={toDoItem.key} toDoItem={toDoItem.content}/>)}
        <div className="todo-wrapper add-todo">
          {isList ? <AddIcon className="add-icon"/> : null}
          <TextareaAutosize onChange={changeContent} onKeyPress={isList ? handleEnter : null} value={content} name={isList ? "listItem" : "content"} placeholder={isList ? "List Item" : "Take a note..."} minRows={isExpanded && !isList ? 3 : 1}/>
        </div>

        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={event => {
            isList ? props.addToDoLists(event, {key: uuid(), title: title, content: toDoItems}) : props.addNote(event, {key: uuid(), title: title, content: content});
            setIsList(false);
            resetForm(event);
          }} className="submit">
            <AddIcon />
          </Fab>
        </Zoom>

        <Zoom in={isExpanded ? true : false}>
          <Fab className="make-list" onClick={changeType}>
            {isList ? <FormatListBulletedIcon /> : <NotesIcon/>}
          </Fab>
        </Zoom>

      </form>
    </div>
  )
}

export default Form;
