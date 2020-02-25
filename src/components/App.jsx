import React, {useState} from 'react';
import Header from "./Header";
import Note from "./Note";
import ToDoList from "./ToDoList";
import Form from "./Form";

function App() {
  const [items, setItems] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);

  // Note Logic

  function addNote(event, newNote){
    setItems(prevItems => [...prevItems, newNote]);
  }

  function deleteNote(noteId)
  {
    setItems(prevItems => prevItems.filter(oldItem => oldItem.key !== noteId));
  }

  function updateTitle(event, noteId)
  {
    setItems(prevItems => {
      let foundNoteIndex = prevItems.findIndex(item => item.key === noteId);
      prevItems[foundNoteIndex].title = event.target.value;
      return [...prevItems]
    });
  }

  function updateContent(event, noteId)
  {
    setItems(prevItems => {
      let foundNoteIndex = prevItems.findIndex(item => item.key === noteId);
      prevItems[foundNoteIndex].content = event.target.value;
      return [...prevItems]
    });
  }

  // ToDo Lists Logic

  function addToDoLists(event, newToDoList)
  {
    setToDoLists(prevToDoLists => [...prevToDoLists, newToDoList]);
  }

  function deleteToDoList(listId)
  {
    setToDoLists(prevToDoLists => prevToDoLists.filter(oldLists => oldLists.key !== listId));
  }

  function deleteToDoItem(event, listId, itemId)
  {
    setToDoLists(prevToDoLists => {
      let foundListIndex = prevToDoLists.findIndex(toDoLists => toDoLists.key === listId);
      prevToDoLists[foundListIndex].content = prevToDoLists[foundListIndex].content.filter(oldListItem => oldListItem.key !== itemId);
      return [...prevToDoLists]
    })
    event.stopPropagation();
  }

  return (
    <div>
      <Header />
      <Form addNote={addNote} addToDoLists={addToDoLists}/>
      <div className="wrapper">
        {items.map(item => <Note key={item.key} id={item.key} title={item.title} content={item.content} deleteNote={deleteNote} updateTitle={updateTitle} updateContent={updateContent}/>)}
        {toDoLists.map(toDoList => <ToDoList key={toDoList.key} id={toDoList.key} title={toDoList.title} content={toDoList.content} deleteToDoList={deleteToDoList} deleteToDoItem={deleteToDoItem} updateTitle={updateTitle} updateContent={updateContent}/>)}
      </div>
    </div>
  );
}

export default App;
