import React, {useState, useRef, useEffect} from "react";
import StyledCheckbox from './Checkbox'
//import Checkbox from '@material-ui/core/Checkbox';

function ToDoItem(props){
  const [toDoItem, setToDoItem] = useState("");

  return(
    <div className="todo-wrapper">
      <StyledCheckbox/>
      <p>{props.toDoItem}</p>
    </div>
  )
}

export default ToDoItem;
