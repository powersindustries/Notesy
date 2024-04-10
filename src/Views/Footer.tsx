import { ContextsEnum } from "../Models/ContextEnums";


function Footer(props: any) {

    function onAddNoteClicked() {
        props.changeContext(ContextsEnum.AddNote);
    }
 
    return (
        <footer>
            <button onClick={onAddNoteClicked}>Add Note</button>
        </footer>
    );
}

export default Footer;
