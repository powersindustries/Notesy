import { useState, useEffect } from 'react';
import { deleteNote, GLOBAL_NOTE_KEY } from '../Controllers/StorageHelpers';
import Note from '../Models/Note';

function NotesList() {
    const [notesList, setNotesList] = useState<Note[]>([]);
    const [url, setUrl] = useState<string>("");

    useEffect(() => {

        window.addEventListener("storage", onStorageChanged);

        getCurrentUrl();

        return () => {
            window.removeEventListener("storage", onStorageChanged);
        };
    }, [url]);

    async function getCurrentUrl(): Promise<void> {
        const getCurrentUrlResponse = await browser.runtime.sendMessage({ type: 'get_current_url' });
        const urlString: string = getCurrentUrlResponse.key;

        setUrl(urlString);

        onStorageChanged();
    }

    function onStorageChanged() {

        const updatedData: Note[] = [];

        // Global notes.
        const globalString: string | null = localStorage.getItem(GLOBAL_NOTE_KEY);
        if (globalString) {
            const globalData: Note[] = JSON.parse(globalString);

            for (let note of globalData) {
                updatedData.push(note);
            }
        }

        // Url specific notes.
        if (url) {
            const urlString: string | null = localStorage.getItem(url);
            if (urlString) {
                const urlNotesData: Note[] = JSON.parse(urlString);

                for (let note of urlNotesData) {
                    updatedData.push(note);
                }
            }
        }

        setNotesList(updatedData);
    }

    function onDeleteNoteClicked(noteToDelete: Note) {
        deleteNote(noteToDelete);
    }


    return (
        <div>
            {notesList.map((note: Note) => (
                <div>
                    <p>{note.url}</p>
                    <p>{note.title}</p>
                    <p>{note.content}</p>
                    <button onClick={() => onDeleteNoteClicked(note)}>Delete</button>
                    <br />
                </div>
            ))}
        </div>
    );

}

export default NotesList;