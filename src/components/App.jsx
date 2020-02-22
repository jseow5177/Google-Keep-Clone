import React, {useState} from 'react';
import Header from "./Header";
import Note from "./Note";
import Form from "./Form";

function App() {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <Header />
      <Form addNote={addNote}/>
      <div className="wrapper">
        {items.map(item => <Note key={item.key} id={item.key} title={item.title} content={item.content} deleteNote={deleteNote} updateTitle={updateTitle} updateContent={updateContent}/>)}
      </div>
    </div>
  );
}

export default App;
