import { clearAllLocalStorage } from '../Controllers/StorageHelpers';

function Footer() {

    function onClearNotesButtonClicked() {
        clearAllLocalStorage();
    }
 
    return (
        <footer>

            <button onClick={onClearNotesButtonClicked}>Clear All Notes</button>

        </footer>
    );
}

export default Footer;