import {useEffect, useState} from "react";
import api from "../api.js";
import {showToast} from "./toast.js";

// Smooth scrolling function
export function scrollToSection(sectionID) {
    const section = document.getElementById(sectionID);
    section.scrollIntoView({ behavior: 'smooth' });
}

function NoteForm({ setNotes, currentNote, setCurrentNote }) {
    const [title, setTitle] = useState(currentNote?.title || "");
    const [content, setContent] = useState(currentNote?.content || "");

     useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        }
    }, [currentNote]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentNote) {
            // Part that handles Edit
            api
                .patch(`/api/notes/edit/${currentNote.id}/`, { title, content })
                .then((res) => {
                    if (res.status === 200) {
                        setNotes((prevNotes) =>
                            prevNotes.map((note) =>
                                note.id === currentNote.id ? res.data : note
                            )
                        );
                        showToast("Note updated successfully!", "success")
                        clearForm();
                    } else {
                        showToast("Error updating note", "error")
                    }
                })
                .catch((error) => {
                    console.error("Error updating note:", error);
                    alert("An error occurred while updating the note.");
                });
        } else {
            // Part that handles Create
            api
                .post("/api/notes/", { title, content })
                .then((res) => {
                    if (res.status === 201) {
                        setNotes((prevNotes) => [...prevNotes, res.data]);
                        showToast("Note created successfully", "success")
                        clearForm();
                    } else {
                        showToast("Error creating note", "error")
                    }
                })
                .catch((error) => {
                    console.error("Error creating note:", error);
                    showToast("An error occurred while creating note", "error")
                });
        }
    };

    const clearForm = () => {
        setTitle("");
        setContent("");
        setCurrentNote(null); // Reset the form to "create" mode
    };

    return (
        <section id="createNote">
            <div className="note-container">
                <div className="note">
                    <h1 className="text-center">
                        {currentNote ? "Edit Note" : "Create Note"}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content" className="form-label">
                                Content
                            </label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="5"
                                placeholder="Enter the content here"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="btn-container">
                            <button
                                type="submit"
                                onClick={() => scrollToSection("notes")}
                                className="btn btn-primary"
                            >
                                {currentNote ? "Save Changes" : "Create Note"}
                            </button>
                        </div>
                        {currentNote && (
                                    <i
                                        className=" close-btn bi bi-x-circle"
                                        onClick={() => {
                                            clearForm();
                                            scrollToSection("notes")
                                        }}
                                    ></i>
                            )}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default NoteForm;
