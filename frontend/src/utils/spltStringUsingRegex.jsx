export default function splitStringUsingRegex(inputString){
    const characters = [];
    const regex =  /./gu

    let match;

    while((match = regex.exec(inputString)) !== null){
        characters.push(match[0]);
    }

    return characters;
}
