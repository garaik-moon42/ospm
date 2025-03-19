
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
    return window.open(url, target, scaledFeatures);
}