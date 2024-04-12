import { NotePropInterface } from "../Models/NotePropInterface";

function ListNote(prop: NotePropInterface) {
    const maxTextLength: number = 125;
    const elipsesCharacter: string = "...";

    function getDisplayableContent() {
        if (prop.note.content.length > maxTextLength) {
            return prop.note.content.substring(0,maxTextLength) + elipsesCharacter;
        }
         
        return prop.note.content;
    }


    return (
            <div>

                <button 
                    className="list-note"
                    onClick={() => prop.noteClickedMethod(prop.note) }>
                    <p>{getDisplayableContent()}</p>
                </button>

            </div>
           );
}

export default ListNote;
