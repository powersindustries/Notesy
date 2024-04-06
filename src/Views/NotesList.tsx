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

        browser.storage.local.get([GLOBAL_NOTE_KEY, url])
            .then(notes => {

                const globalNotes: Note[] = notes[GLOBAL_NOTE_KEY] !== undefined ? notes[GLOBAL_NOTE_KEY] : [];
                const urlNotes: Note[] = notes[url] !== undefined ? notes[url] : [];

                setNotesList([...globalNotes, ...urlNotes]);
            });
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