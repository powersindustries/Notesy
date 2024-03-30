import { useState, useEffect } from "react";
import { addNewNote } from "../Controllers/StorageHelpers";
import Note from "../Models/Note";

function AddNote() {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [url, setUrl] = useState<string>("");

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
        const newNote = new Note(url, title, content);

        addNewNote(url, newNote);

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

            <button onClick={onSaveClicked}>Save</button>
        </div>
    );
}

export default AddNote;