function isPalindrome(x){
    let i = 0;
    x = String(x);
    const pivot = Math.floor(x.length / 2)
    while(i < pivot){
        if(x[i] !== x[(x.length - 1) - i]){
            return false;
        }
        i++;
    }
    return true;
}

const suits = {
    1: true,
    42: false,
    100001: true,
    999: true,
    123: false
};

Object.keys(suits).forEach(key => {
    console.assert(isPalindrome(key) === suits[key]);
});
