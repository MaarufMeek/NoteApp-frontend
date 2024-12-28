import api from "../api.js"
import React, {useEffect, useState} from "react";
import "../styles/home.css"
import Note from "../components/Note.jsx";
import NoteForm, {scrollToSection} from "../components/NoteForm.jsx";
import {useNavigate} from "react-router-dom";
import {showToast} from "../components/toast.js";


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
            .catch(err => showToast(err, "error"))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    // Update state by filtering out the deleted note
                    setNote(prevNotes => prevNotes.filter(note => note.id !== id));
                    showToast("Note deleted successfully", "success")
                    // alert("Note deleted successfully");
                } else {
                    showToast("Error deleting note", "error")
                    alert("Error deleting note");
                }
            })
            .catch(error => {
                console.error("Error deleting note:", error);
                showToast("An error occurred while deleting note", "error")
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
                {note.map(note => <Note key={note.id} note={note} onEdit={handleEditClick} onDelete={deleteNote}/>)}
            </div>

            {/*Create Note Form*/}
            <NoteForm setNotes={setNote} currentNote={currentNote} setCurrentNote={setCurrentNote}/>

            <>
                {/* Toast Container */}
                <div className="toast-container position-fixed top-0 end-0 p-3">
                    <div id="toast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto text-white">Alert</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"
                                    aria-label="Close"></button>
                        </div>
                        <div className="toast-body"></div>
                    </div>
                </div>
                {/* Rest of the JSX */}
            </>


        </>

    )
}

export default Home