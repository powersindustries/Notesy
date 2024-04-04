import Note from "../Models/Note";

export const GLOBAL_NOTE_KEY : string = "GLOBAL";


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


export function addNewNote(inUrl: string, inNote: Note) {
    const localStorageString: string | null = localStorage.getItem(inUrl);

    if (localStorageString === null) {
        let localStorageArray: Note[] = [];
        localStorageArray.push(inNote);

        localStorage.setItem(inUrl, JSON.stringify(localStorageArray));
    } else {
        let localStorageArray: Note[] = JSON.parse(localStorageString);
        localStorageArray.push(inNote);

        localStorage.setItem(inUrl, JSON.stringify(localStorageArray));
    }

    broadcastStorageChanged();
}


export function deleteNote(inUrl: string, inNote: Note) {
    const localStorageString: string | null = localStorage.getItem(inUrl);

    if (localStorageString === null) {
        console.error("Storage string (" + localStorageString + ") doesnt exist.");
        return;
    }

    const localStorageArray: Note[] = JSON.parse(localStorageString);
    let newStorageArray: Note[] = [];

    for (let x: number = 0; x < localStorageArray.length; ++x) {
        const currNote: Note = localStorageArray[x];
    
        if (!(currNote.url === inNote.url && 
            currNote.title === inNote.title && 
            currNote.content === inNote.content)){
            newStorageArray.push(currNote);
        }
    }

    localStorage.setItem(inUrl, JSON.stringify(newStorageArray));

    broadcastStorageChanged();
}