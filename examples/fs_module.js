const {readFileSync, writeFileSync, readFile, writeFile} = require('fs');

//! Synchronous
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');

console.log(first, second)

writeFileSync(
    './content/third.txt', 
    'This is the third txt file yooo',
    // {flag: 'a'} <-- this property just adds the value to the end of the file instead of re-writing the entire thing
)

//! Asynchronous
readFile('./content/first.txt', 'utf8', (err, result) => {
    if(err){
        console.log(err);
        return
    }
    const first = result;
    readFile('./content/second.txt', 'utf8', (err, result) => {
     if(err){
        console.log(err);
        return
    }  
    const second = result;
    writeFile('./content/fourth.txt', 'FourthFile', (err, result) => {
        if(err){
            console.log(err)
            return 
        }
        console.log(result);
    }) 
    })
})