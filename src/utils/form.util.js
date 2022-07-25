// set random letter
const getRandomLetter = () => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomIndex = Math.floor(Math.random() * charset.length)
    return charset[randomIndex]
}
// set random Number
const getRandomNumber = () => {
    let charset = "0123456789";
    let randomIndex = Math.floor(Math.random() * charset.length)
    return charset[randomIndex]
}

// set random symbol
const getRandomSymbol = () => {
    let charset = "!$%^&*{}[]?/_+=";
    let randomIndex = Math.floor(Math.random() * charset.length)
    return charset[randomIndex]
}

// create random password function 
const generatePassword = (hasNumber=false, hasSymbol=false, len=6) => {
    let functionSet = [getRandomLetter]

    // if hasX is true include nad create another list with all the elements in first list adding getRandom etc otherwise return functionSet
    functionSet = hasNumber ? [...functionSet, getRandomNumber] : functionSet
    functionSet = hasSymbol ? [...functionSet, getRandomSymbol] : functionSet

    // picks up a random function in the list and adds that random character to min password length
    let password = []
    for (let i = 0; i < len; i++) {
        let randomIndex = Math.floor(Math.random() * functionSet.length)
        let character = functionSet[randomIndex]()
        password.push(character);
    }

    // make sure there are no spaces
    return password.join("");
};

export {generatePassword};