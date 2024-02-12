import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial);

    //get all notes
    const getNotes = async () => {
      //API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZjY2MDU4MTNmNWMzOGNkYTI5ZmU4In0sImlhdCI6MTcwNzA0MjMwOX0.bN1g-ElN4tc8MS3PYfOUFYMzibYXndXOtlGuMHHDpho",
        },
  
        
      });
      const json = await response.json();
      console.log(json)
      setNotes(json)
    };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZjY2MDU4MTNmNWMzOGNkYTI5ZmU4In0sImlhdCI6MTcwNzA0MjMwOX0.bN1g-ElN4tc8MS3PYfOUFYMzibYXndXOtlGuMHHDpho",
      },

      //body: JSON.stringify(data),
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    //add logic for client side
    const note = {
      _id: "65c5046f77b202d1d0bae545",
      user: "65bf6605813f5c38cda29fe8",
      title: title,
      description: description,
      tag: tag,
      date: "2024-02-08T16:42:23.122Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = (id) => {
    console.log("deleting note from" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViZjY2MDU4MTNmNWMzOGNkYTI5ZmU4In0sImlhdCI6MTcwNzA0MjMwOX0.bN1g-ElN4tc8MS3PYfOUFYMzibYXndXOtlGuMHHDpho",
      },
      
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();

    //Logic to edit at client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
