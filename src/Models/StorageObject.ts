import Note from "./Note";

export interface StorageObjectInterface {
    [ key: string ] : [ Note ];
}