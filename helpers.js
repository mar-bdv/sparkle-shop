export const debounce = (fn, msec) => {
    let lastCall = 0;
    let lastCallTimer = 0;

    return (...args) => {
        const previousCall = lastCall;
        lastCall = Date.now();

        if (previousCall && lastCall - previousCall <= msec) {
            clearTimeout(lastCallTimer)
        }


        lastCallTimer = setTimeout(() => fn(...args), msec)
    }
}