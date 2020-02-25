import React from "react";
import StyledCheckbox from './Checkbox'

function ToDoItem(props){
  return(
    <div className="todo-wrapper">
      <StyledCheckbox/>
      <p>{props.toDoItem}</p>
    </div>
  )
}

export default ToDoItem;
