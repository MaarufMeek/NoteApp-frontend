import "../styles/home.css"
import {scrollToSection} from "./NoteForm.jsx";
import React from "react";

function Note({note, onDelete, onEdit}) {
    const formattedDate = new Date(note.created_at).toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });


    return (
        <>
           <div className="note-card" key={note.id} id="notes">
                    <h3>{note.title}</h3>
                    <div className="title-separator"></div>
                    {/* Thin line separating title */}
                    <p>{note.content}</p>
                    <div className="note-actions">
                        <p className="note-date">{formattedDate}</p>
                        <div>
                            <button onClick={() => {
                                onEdit(note);
                                scrollToSection("createNote")
                                console.log("Note to Edit", note);
                            }}><i className="bi bi-pencil text-primary"></i></button>
                            <button onClick={() => onDelete(note.id)}><i className="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>
        </>


    )
}

export default Note;