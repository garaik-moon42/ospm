/**
 * This file replaces window.open with an wrapper that Patches the input URL 
 * to ensure we don't switch protocols (https -> http).
 * This is what we want throughout the application.
 * 
 * It also exposes "windowOpen", a wrapper that applies some more magic to the
 * window size calculation to make it more appropriate for the modern font sizes
 * and paddings we use now.
 * 
 * This is to be enabled per usecase.
 * 
 * It also exposes the original window.open as window.openOld
 */

/** Provides the original window.open implementation */
window.openOld = window.open;

/**
 * A wrapper for window.open that opens the window with a scaled-up size.
 * This is a workaround to avoid having to manually adjust each window.open call.
 * 
 * @param {string | URL} url
 * @param {string} target
 * @param {string} features
 * @returns {WindowProxy | null}
 */
function windowOpen(url, target, features){
    console.log("windowOpen called with:", url, target, features);
    try {
        url = ensureUrlProtocol(url);
    } catch (e) {
        console.error("Failed to update URL to use the correct protocol. Using as-is", url, e);
    }

    try {
        const scaleX = 1.25;
        const scaleY = 1.4;
        const scaledFeatures = features.split(',')
        .map(feature => feature.trim())
        .map(feature => {
            
            const [key, value] = feature.split('=');

            switch (key) {
                case 'width':
                    return `${key}=${parseInt(value) * scaleX}`;
                case 'height':
                    return `${key}=${parseInt(value) * scaleY}`;
                default:
                    return feature;
            }
        }).join(', ');
        return window.openOld(url, target, scaledFeatures);
    } catch (e) {
        // If anything goes wrong, fall back to the original window.open
        console.error("Failed to open window with scaling applied", e);
        return window.openOld(url, target, features);
    }
}

function ensureUrlProtocol(url) {
    // Ensure we are dealing with a full URL
    if (typeof url === 'string' && !url.startsWith('http')) {
        console.warn("URL does not start with http(s):", url);
        return url;
    }

    // Try to patch the URL
    const urlObj = new URL(url);

    // If protocol is not current, warn and update
    if (urlObj.protocol !== window.location.protocol) {
        console.warn(`Patching URL protocol from ${urlObj.protocol} to ${window.location.protocol}`);
        urlObj.protocol = window.location.protocol;
        url = urlObj.toString();
    }
    return url;
}

/** Replaces window.open with a custom implementation */
window.open = function(url, target, features){
    console.log("window.open called with:", url, target, features);

    try {
        url = ensureUrlProtocol(url);
    } catch (e) {
        console.error("Failed to update URL to use the correct protocol. Using as-is", url, e);
    }

    return window.openOld(url, target, features);
}
