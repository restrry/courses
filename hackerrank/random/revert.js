function reverse(str){
    let i = str.length;
    const result = Array({ length: i });
    while(i >= 0){
        result[str.length - i] = str.charAt(i);
        i -= 1;
    }
    return result.join('');
}

console.assert(
    reverse('') === ''
)

console.assert(
    reverse('abcdef') === 'fedcba'
)
