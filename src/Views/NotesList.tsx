import { useState, useEffect } from 'react';
import { deleteNote } from '../Controllers/StorageHelpers';
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
        if (url){

            const valueString: string | null = localStorage.getItem(url);

            if (valueString){
                const updatedData: Note[] = JSON.parse(valueString);
                setNotesList(updatedData);

                return;
            }
        }

        setNotesList([]);
    }

    function onDeleteNoteClicked(value: Note) {
        deleteNote(url, value);
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