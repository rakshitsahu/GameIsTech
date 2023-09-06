export function decryptString(word){
    // console.log(word)
    word = word.replaceAll('%2F' , '/')
    // word = word.replaceAll('%2D',' ')
    return word
}
export function encryptString(word){
    // console.log(word)
    word = word.replaceAll('/', '%2F')
    // word = word.replaceAll(' ','%2D')
    return word
}
