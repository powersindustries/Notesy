import { useState } from "react";
import { ContextsEnum } from "../Models/ContextEnums";
import NotesList from './NotesList';
import Footer from "./Footer";
import Note from "../Models/Note";
import ViewNote from "./ViewNote";
import AddNote from "./AddNote";


function Content() {
    const [currContext, setCurrContext] = useState<ContextsEnum>(ContextsEnum.ViewList);
    const [currNote, setCurrNote] = useState<Note>();


    function onNotesListPropsCalled(note: Note) {
        console.log(note);

        setCurrNote(note);
        setCurrContext(ContextsEnum.ViewNote);
    }


    function onChangeContext(context: ContextsEnum) {
        console.log("changeContextHit");

        setCurrContext(context);
    }


    function displayContext() {
        if (currContext === ContextsEnum.ViewList) {
            return ( <NotesList notesListPropsCalled={ onNotesListPropsCalled } /> );
        } else if (currContext === ContextsEnum.ViewNote) {
            return ( <ViewNote content={currNote} changeContext={ onChangeContext } /> );
        } else if (currContext === ContextsEnum.AddNote) {
            return ( <AddNote changeContext={ onChangeContext } /> );
        }
    }


    return (
        <div>

            { displayContext() }

            <Footer changeContext={ onChangeContext } />

        </div>
    );
}

export default Content;
