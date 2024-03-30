interface NoteInterface {
    url: string;
    title: string;
    content: string;
}

class Note implements NoteInterface {
    url: string;
    title: string;
    content: string;

    constructor(inUrl: string, inTitle: string, inContent: string) {
        this.url = inUrl;
        this.title = inTitle;
        this.content = inContent;
    }
}

export default Note;