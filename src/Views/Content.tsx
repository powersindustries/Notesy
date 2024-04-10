import { useState } from "react";

import NotesList from './NotesList';
import AddNote from './AddNote';
import { ContextsEnum } from "../Models/ContextEnums";
import Footer from "./Footer";


function Content() {
    const [currContext, setCurrContext] = useState<ContextsEnum>(ContextsEnum.ViewList);

    function onChangeContext(context: ContextsEnum) {
        console.log("changeContextHit");

        setCurrContext(context);
    }

    function displayContext() {
        if (currContext === ContextsEnum.ViewList) {
            return ( <NotesList /> );
        } else if (currContext === ContextsEnum.AddNote) {
            return ( <AddNote changeContext={ onChangeContext }/> );
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
