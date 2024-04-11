import { useState, useEffect } from "react";
import { addNewNote, GLOBAL_NOTE_KEY } from "../Controllers/StorageHelpers";
import { ContextsEnum } from "../Models/ContextEnums";
import Note from "../Models/Note";


function AddNote(props: any) {
    const [content, setContent] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [bIsGlobal, setBIsGlobal] = useState<boolean>(true);


    useEffect(() => {

        getCurrentUrl();

    }, []);


    async function getCurrentUrl(): Promise<void> {
        const getCurrentUrlResponse = await browser.runtime.sendMessage({ type: 'get_current_url' });
        const urlString: string = getCurrentUrlResponse.key;
 
        setUrl(urlString);
    }


    // UI delegates.
    function onContentChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;
        setContent(value);
    }


    function onBackClicked() {
        props.changeContext(ContextsEnum.ViewList);
    }


    function onSaveClicked() {
        if (content === "") {
            return;
        }

        const noteUrl: string = bIsGlobal ? GLOBAL_NOTE_KEY : url;
        const newNote = new Note(noteUrl, content);

        addNewNote(newNote);

        setContent("");

        props.changeContext(ContextsEnum.ViewList);
    }


    return (
        <div className="note">

            <button
                className="note-back"
                onClick={ onBackClicked }>
                Back
            </button>

            <textarea
                id="description"
                placeholder="Note"
                required
                value={content}
                onChange={onContentChanged}
            />


            <div className="note-global-note">
                <label >Global Note?</label>
                <input
                    className="note-global-note-checkbox"
                    id="global"
                    type="checkbox"
                    checked={bIsGlobal}
                    onChange={(event) => setBIsGlobal(event.target.checked)}
                />
            </div>


            <button
                className="note-save"
                onClick={onSaveClicked}>
                Save
            </button>


        </div>
    );
}

export default AddNote;
