import { useState, useEffect } from "react";
import { addNewNote, GLOBAL_NOTE_KEY } from "../Controllers/StorageHelpers";
import Note from "../Models/Note";

function AddNote() {

    const [title, setTitle] = useState<string>("");
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

    function onTitleChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setTitle(value);
    }

    function onContentChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;
        setContent(value);
    }

    function onSaveClicked() {
        const noteUrl: string = bIsGlobal ? GLOBAL_NOTE_KEY : url;
        const newNote = new Note(noteUrl, title, content);

        addNewNote(noteUrl, newNote);

        setTitle("");
        setContent("");
    }

    return (
        <div className="new-note">

            <p>{url}</p>

            <input 
                type="text"
                id="title"
                placeholder="Title"
                required
                value={title}
                onChange={onTitleChanged}
            />

            <textarea
                id="description"
                placeholder="Description"
                required
                value={content}
                onChange={onContentChanged}
            />

            <label>
                <p>Global Note</p>
                <input
                    id="global"
                    type="checkbox"
                    checked={bIsGlobal}
                    onChange={(event) => setBIsGlobal(event.target.checked)}
                />
            </label>


            <button onClick={onSaveClicked}>Save</button>
        </div>
    );
}

export default AddNote;