import api from "../api.js"
import React, {useEffect, useState} from "react";
import "../styles/home.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Note from "../components/Note.jsx";
import NoteForm, {scrollToSection} from "../components/NoteForm.jsx";
import {useNavigate} from "react-router-dom";


function Home() {
    const [note, setNote] = useState([]);
    const [currentNote, setCurrentNote] = useState(null)



    useEffect(() => {
        getNotes()
    }, []);

    const getNotes = () => {
        api
            .get('/api/notes/')
            .then(res => res.data)
            .then((data) => {
                setNote(data);
                console.log(data)
            })
            .catch(err => alert(err))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    // Update state by filtering out the deleted note
                    setNote(prevNotes => prevNotes.filter(note => note.id !== id));
                    alert("Note deleted successfully");
                } else {
                    alert("Error deleting note");
                }
            })
            .catch(error => {
                console.error("Error deleting note:", error);
                alert("An error occurred while deleting the note.");
            });
    };

  const handleEditClick = (note) => {
    setCurrentNote(note); // Update state
};



    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <>
            {/*Navbar*/}
            <header className="nav">
                <div className="container">
                    <h1 className="navbar-title">Notes</h1>
                </div>
            </header>
            <div className="d-flex justify-content-between me-4 ms-4">
                <button
                    className="note-btn"
                    onClick={() => scrollToSection("createNote")}>
                    Create Note
                </button>
                <button
                    className="note-btn bg-danger text-white"
                    onClick={handleLogout}> Logout <i className="bi bi-box-arrow-right"></i>
                </button>
            </div>

            {/*Note Cards*/}
            <div className="note-list" id="notes">
                { note.map( note => <Note key={note.id} note={note} onEdit={handleEditClick} onDelete={deleteNote} />) }
            </div>

            {/*Create Note Form*/}
            <NoteForm setNotes={setNote} currentNote={currentNote} setCurrentNote={setCurrentNote}/>

        </>

    )
}

export default Home