interface NoteInterface {
    url: string;
    content: string;
}

class Note implements NoteInterface {
    url: string;
    content: string;

    constructor(inUrl: string, inContent: string) {
        this.url = inUrl;
        this.content = inContent;
    }
}

export default Note;
