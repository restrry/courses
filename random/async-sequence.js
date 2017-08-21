function runInSecWithPromise(...fns){
    return fns.reduce((acc, fn) => acc.then(new Promise(res => fn(res))), Promise.resolve())
}

const a = (cb) => setTimeout(() => {
    console.log(1);
    cb();
}, 1000);

const b = cb => setTimeout(() => {
    console.log(2);
    cb();
}, 2000);

runInSecWithPromise(a, b);

function runInSecWithoutPromise(...fns){
    function check(){
        const fn = fns.pop();
        if(!fn) {
            console.log('end');
            return;
        }
        fn(check);
    }

    check();
}

runInSecWithoutPromise(a, b);

function runNoMoreThanN(n, ...fns){
    let alreadyRun = 0;

    function counter(){
        alreadyRun -= 1;
    }

    function run(){
        if(alreadyRun < n){
            const fn = fns.shift();
            if(!fn){
                if(!alreadyRun) {
                    console.log('end')
                }
                return;
            }
            alreadyRun += 1;
            fn(() => {
                counter();
                run();
            });
        }
    }

    let i = n;
    while(i--){
        run();
    }
}

runNoMoreThanN(2, a, b, a, b, a, b);
