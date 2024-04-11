import { useState, useEffect } from 'react';
import { GLOBAL_NOTE_KEY } from '../Controllers/StorageHelpers';
import { ContextsEnum } from '../Models/ContextEnums';
import Note from '../Models/Note';
import ListNote from './ListNote';


function NotesList(props: any) {
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


    // Storage methods.
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


    // UI methods.
    function noteClickedMethod(note: Note) {
        props.notesListPropsCalled(note);
    }


    function getUrlNotesUI() {
        if (urlNotesList.length > 0){

            return (
                    <div>
                        <p>{url}</p>
                        {
                            urlNotesList.map((note: Note) => (

                            <ListNote 
                                note={note} 
                                noteClickedMethod={noteClickedMethod} 
                                /> 

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

                            <ListNote 
                                note={note} 
                                noteClickedMethod={noteClickedMethod} 
                                /> 

                        ))}
                    </div>
            );
        }

        return null;
    }


    function getNotesListUI() {
        if (globalNotesList.length > 0 || urlNotesList.length > 0) {
            return (
                <div>
                    <div>
                        {getUrlNotesUI()}
                    </div>
                    <div>
                        {getGlobalNotesUI()}
                    </div>
                </div>
               );

        }

        return (
            <div>
                <p>No notes exist. Add a note using the button below.</p>
            </div>
        );

    }

    return (
        <div>
            <div>
                {getNotesListUI()}
            </div>
        </div>
    );

}

export default NotesList;
