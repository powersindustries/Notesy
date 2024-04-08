const GLOBAL_NOTE_KEY = "GLOBAL";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
function getCleanedUrlLocal(inURL) {

    // Remove HTTPS and HTTP from front of URL.
    let outURL = inURL.replace(/^https?:\/\//, '');
    outURL.replace(/^http?:\/\//, '');

    // Remove everything after the first quiery '/' character.
    let arr = outURL.split('/');
    arr.pop();

    return arr[0];
}


// ----------------------------------------------------------------
// ----------------------------------------------------------------
async function handleOnMessage(response) {
    if (response.type === 'get_current_url') {

        const key = 'currentUrlKey';
        const result = await browser.storage.local.get(key);

        return result[key];
    }
}


// ----------------------------------------------------------------
// ----------------------------------------------------------------
async function handleOnConnected(response) {


    browser.tabs.query({ currentWindow: true, active: true })
        .then((tabs) => {

            const currentUrl = getCleanedUrlLocal(tabs[0].url);
            const currentUrlKey = { key: currentUrl };
            browser.storage.local.set({ currentUrlKey }).then(() => {

                browser.storage.local.get([GLOBAL_NOTE_KEY, currentUrl]).then(storage => {

                    let bNotexist = false;
                    if (Object.keys(storage).length > 0) {
                        for (const key in storage) {
                            if (storage.hasOwnProperty(key) && storage[key].length > 0) {
                                console.log(key);
                                bNotexist = true;
                            }
                        }
                    }

                    if (bNotexist) {
                        browser.browserAction.setIcon({
                            path: {
                                16: "../assets/icon216.jpg",
                                32: "../assets/icon232.jpg",
                            },
                        });

                    } else {
                        browser.browserAction.setIcon({
                            path: {
                                16: "../assets/icon116.jpg",
                                32: "../assets/icon132.jpg",
                            },
                        });
                    }

                });
            })
        });
}


// ----------------------------------------------------------------
// EVENT LISTENERS
// ----------------------------------------------------------------
browser.runtime.onConnect.addListener(handleOnConnected);
browser.tabs.onUpdated.addListener(handleOnConnected);
browser.tabs.onActivated.addListener(handleOnConnected);
browser.windows.onFocusChanged.addListener(handleOnConnected);
browser.storage.local.onChanged.addListener(handleOnConnected);

browser.runtime.onMessage.addListener(handleOnMessage);