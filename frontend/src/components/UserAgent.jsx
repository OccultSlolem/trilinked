export const rawUaString = window.navigator.userAgent;

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

// Note that this can only detect iPhones - iPads use a desktop UA string
export function isIPhone() {
    return rawUaString.indexOf('iPhone') > 0;
}

export function isAndroid() {
    return rawUaString.indexOf('Android') > 0;
}

export function isMobile() {
    console.log([isAndroid(), isIPhone(), getWindowDimensions().width])
    return isAndroid() || isIPhone() || getWindowDimensions().width < 768;
}

export function isDesktop() {
    console.log('is desktop ' + !isMobile());
    return !isMobile();
}