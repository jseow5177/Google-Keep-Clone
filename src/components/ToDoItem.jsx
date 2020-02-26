import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ContentEditable from "react-contenteditable";

function ToDoItem(props){

  const StyledCheckbox = withStyles({
    root: {
      '&:hover': {
        backgroundColor: 'rgb(245, 186, 19, 0.3)',
    }
  }
  })(Checkbox);

  return(
    <div className="todo-wrapper">
      <StyledCheckbox onClick={(event) => props.deleteToDoItem(event, props.noteId, props.toDoItemId)}/>
      <ContentEditable className="editable todo-item" html={props.toDoItem} disabled={props.isClicked ? false : true} onChange={event => props.updateContent(event, props.id)} />
    </div>
  )
}

export default ToDoItem;
