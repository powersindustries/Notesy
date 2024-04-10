import { useState, useEffect } from "react";
import { deleteNote } from '../Controllers/StorageHelpers';
import { ContextsEnum } from "../Models/ContextEnums";

function ViewNote(prop: any) {
    
    const [content, setContent] = useState<string>("");


    useEffect(() => {

        setContent(prop.content.content);

    }, []);


    function onBackClicked() {
        prop.changeContext(ContextsEnum.ViewList);
    }


    function onDeleteNoteClicked() {
        deleteNote(prop.content);

        prop.changeContext(ContextsEnum.ViewList);
    }


    return (
            <div>

            <button
                onClick={onBackClicked}
            >
                Back
            </button>

            <button
                onClick={onDeleteNoteClicked}
            >
                Delete
            </button>

            <textarea
                value={content}
            />

            </div>
           );
}

export default ViewNote;
