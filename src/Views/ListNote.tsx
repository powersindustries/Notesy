import { NotePropInterface } from "../Models/NotePropInterface";

function ListNote(prop: NotePropInterface) {

    return (
            <div>

                <button 
                    className="list-note"
                    onClick={() => prop.noteClickedMethod(prop.note) }>
                    <p>{prop.note.content}</p>
                </button>

            </div>
           );
}

export default ListNote;
