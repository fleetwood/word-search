const _ = require('underscore');

var dictionary = require('./dictionary.json');
var tmp = require('./dictionary.tmp.json');

console.log(`${dictionary.length} : ${tmp.length}`);

// let i = dictionary.length;
// let temp = dictionary.map(entry => {
//     console.log(i--);
//     let word = entry.word.toUpperCase();
//     let current = word.split('').sort();
//     let count = _.countBy(current, a => a);
//     return _.extend(entry, {word, count})
// });

// let i = words.length;
// let points = words.map(word => {
//     console.log(i--);
//     let term = word.toUpperCase().split('');
//     let results = {
//         word,
//         value: -1
//     };
//     // console.log(word);
//     term.forEach(t => {
//         values.forEach(value => {
//             if (_.contains(value.letters, t)) {
//                 results.value += value.value
//                 // console.log(`\t${t}(${value.value}):${results.value}`);
//             }
//         })
//     })
//     return results;
// });

// const fs = require('fs');

// let writeStream = fs.createWriteStream(file);
// writeStream.on('pipe', (src) => {
//     console.log('.');
// });

// writeStream.on('finish', () => {
//     console.log('DONE!');
// });
// writeStream.write(JSON.stringify(temp));
// writeStream.end();