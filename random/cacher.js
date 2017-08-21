// implement caching function
// if fn wasn't called call it, cache result as a promise
// if result isn't outdated, return promise for last call
// if result is outdatad call fn again and update cached promise

function doCache(fn, timeout = 1000){
    const state = {
        isPending: false,
        upateTimestamp: 0,
        promise: null
    };

    return function request(){
        if(state.isPending){
            return state.promise;
        }

        const isOutdated = Date.now() - state.upateTimestamp > timeout;

        if(isOutdated) {
            state.isPending = true;
            state.promise = fn();
            state.promise.then(() => {
                console.log('upated');
                state.upateTimestamp = Date.now();
                state.isPending = false;
            });
        }

        return state.promise;
    }
}

function getData() {
    return new Promise(resolve => {
        setTimeout(() => resolve(42), 1000)
    })
}

const request = doCache(getData, 2000);

request() /*?*/
request() /*?*/
request() /*?*/

setTimeout(request, 3000);
