import react ,{useState} from "react";
import NoteContext from "./noteContext"


const NoteState = (props) =>{
    
    const noteInitial = [
        {
          "_id": "65c268afe1c6562c76a7c4f6",
          "user": "65bf6605813f5c38cda29fe8",
          "title": "first//",
          "description": "first///",
          "tag": "personal",
          "date": "2024-02-06T17:13:19.556Z",
          "__v": 0
        },
        {
          "_id": "65c5046d77b202d1d0bae543",
          "user": "65bf6605813f5c38cda29fe8",
          "title": "first//",
          "description": "first/",
          "tag": "personal",
          "date": "2024-02-08T16:42:21.995Z",
          "__v": 0
        },
        {
          "_id": "65c5046f77b202d1d0bae545",
          "user": "65bf6605813f5c38cda29fe8",
          "title": "first//",
          "description": "first/",
          "tag": "personal",
          "date": "2024-02-08T16:42:23.122Z",
          "__v": 0
        },
        {
          "_id": "65c5047077b202d1d0bae547",
          "user": "65bf6605813f5c38cda29fe8",
          "title": "first//",
          "description": "first/",
          "tag": "personal",
          "date": "2024-02-08T16:42:24.198Z",
          "__v": 0
        },
        {
          "_id": "65c5047177b202d1d0bae549",
          "user": "65bf6605813f5c38cda29fe8",
          "title": "first//",
          "description": "first/",
          "tag": "personal",
          "date": "2024-02-08T16:42:25.238Z",
          "__v": 0
        }
      ]
    const [notes,setNotes] = useState(noteInitial)
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;