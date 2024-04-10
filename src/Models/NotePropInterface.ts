import Note from "./Note";

export interface NotePropInterface {
    note: Note;
    noteClickedMethod: (value: Note) => void;
}
