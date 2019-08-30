import React, {useState} from 'react';
import '../css/main.css';

const INITIAL_NOTES = [
  {id: Date.now(), title: 'Test Note 1', note: 'This is an example of the sample note'}
];


const INITIAL_TO_BE_SAVED_NOTE = {title: '', note: ''};

function App() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [toBeSavedNote, setToBeSavedNote] = useState(INITIAL_TO_BE_SAVED_NOTE);


  const handleChange = (e) => {
    e.persist();
    setToBeSavedNote(toBeSavedNote => {
      let clone = {...toBeSavedNote};
      clone[e.target.name] = e.target.value;
      return clone;
    });
  }

  const saveNote = (e) => {
    e.preventDefault();
    setNotes(currentNotes => {
      let clone = [...currentNotes];
      clone.unshift({id: Date.now(), title: toBeSavedNote.title, note: toBeSavedNote.note});
      return clone;
    })
  }

  const deleteNote = (id) => {
    setNotes(currentNotes => {
      let clone = [...currentNotes];
      return clone.filter(notes => notes.id !== id);
    })
    setToBeSavedNote(INITIAL_TO_BE_SAVED_NOTE);
  }


  return (
    <div className="content">
      <div className="note-wrapper">
        <h1>Add Notes</h1>
        <form className="note-content-wrapper">

          <input type="text" placeholder="Title" onChange={handleChange} value={toBeSavedNote.title} name="title"/>
          <textarea name="note" placeholder="Note..." onChange={handleChange} value={toBeSavedNote.note}
                    className="note"/>
          <button onClick={saveNote}>Save</button>
        </form>
      </div>

      <ul className="list-wrapper">
        {
          notes.map(note =>
            <li key={note.id}>
              <div className="list-title">{note.title}</div>
              <hr/>
              <div className="list-note">{note.note}</div>
              <span className="cross-icon" onClick={() => deleteNote(note.id)}>x</span>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
