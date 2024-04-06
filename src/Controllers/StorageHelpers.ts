import Note from "../Models/Note";

export const GLOBAL_NOTE_KEY: string = "GLOBAL";


function broadcastStorageChanged() {
    window.dispatchEvent(new Event("storage"));
}


export function getAllLocalStorage(): { [key: string]: string } {
    const localStorageData: { [key: string]: string } = {};
    for (let x = 0; x < localStorage.length; ++x) {
        const key = localStorage.key(x);
        if (key) {
            localStorageData[key] = localStorage.getItem(key) || '';
        }
    }

    return localStorageData;
}


export function clearAllLocalStorage() {
    localStorage.clear();

    broadcastStorageChanged();
}


export function addNewNote(inNote: Note) {

    browser.storage.local.get([inNote.url])
        .then(notes => {

            const notesObject: Note[] = notes[inNote.url] !== undefined ? notes[inNote.url] : [];
            notesObject.push(inNote);

            browser.storage.local.set({ [inNote.url]: notesObject })
                .then(() => {
                    broadcastStorageChanged();
                });
        });
}


export function deleteNote(inNote: Note) {

    browser.storage.local.get([inNote.url])
        .then(notes => {

            const urlNotes: Note[] = notes[inNote.url] !== undefined ? notes[inNote.url] : [];
            let newStorageArray: Note[] = [];

            for (let x: number = 0; x < urlNotes.length; ++x) {
                const currNote: Note = urlNotes[x];

                if (!(currNote.url === inNote.url &&
                    currNote.title === inNote.title &&
                    currNote.content === inNote.content)) {
                    newStorageArray.push(currNote);
                }
            }

            browser.storage.local.set({ [inNote.url]: newStorageArray })
                .then(() => {
                    broadcastStorageChanged();
                });
        });
}