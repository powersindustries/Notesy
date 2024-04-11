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
            <div className="note">

                <button
                    className="note-back"
                    onClick={onBackClicked}
                    >
                    Back
                </button>


                <textarea
                    value={content}
                />


                <button
                    className="note-save"
                    onClick={onDeleteNoteClicked}
                    >
                    Delete
                </button>

            </div>
           );
}

export default ViewNote;
