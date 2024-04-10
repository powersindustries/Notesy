import { useState, useEffect } from 'react';
import { deleteNote, GLOBAL_NOTE_KEY } from '../Controllers/StorageHelpers';
import Note from '../Models/Note';


function NotesList() {
    const [globalNotesList, setGlobalNotesList] = useState<Note[]>([]);
    const [urlNotesList, setUrlNotesList] = useState<Note[]>([]);
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

                setGlobalNotesList([...globalNotes]);
                setUrlNotesList([...urlNotes]);
            });
    }


    function onDeleteNoteClicked(noteToDelete: Note) {
        deleteNote(noteToDelete);
    }


    function getUrlNotesUI() {
        if (urlNotesList.length > 0){

            return (
                    <div>
                        <p>{url}</p>
                        {
                            urlNotesList.map((note: Note) => (
                            <div>

                                <p>{note.title}</p>
                                <p>{note.content}</p>
                                <button onClick={() => onDeleteNoteClicked(note)}>Delete</button>
                                <br />

                            </div>
                        ))}

                    </div>
            );
        }

        return null;
    }


    function getGlobalNotesUI() {
        if (globalNotesList.length > 0){

            return (
                    <div>
                        <p>Global</p>
                        {
                            globalNotesList.map((note: Note) => (

                            <div>
                                <p>{note.title}</p>
                                <p>{note.content}</p>
                                <button onClick={() => onDeleteNoteClicked(note)}>Delete</button>
                                <br />
                            </div>

                        ))}
                    </div>
            );
        }

        return null;
    }


    return (
        <div>
            <div>
                {getUrlNotesUI()}
            </div>
            <br/>
            <br/>
            <div>
                {getGlobalNotesUI()}
            </div>

        </div>
    );

}

export default NotesList;
