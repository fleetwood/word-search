let _ = require('underscore');
// const _ = require('underscore');

// var dictionary = require('./dictionary.json');
// var tmp = require('./dictionary.tmp.json');

// console.log(`${dictionary.length} : ${tmp.length}`);

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

// Object.defineProperty(String.prototype, 'stripSearch', {
//     value() {
//         let exp = new RegExp(/([\[\]\(\)\"\*])+/);
//         let result = this;
//         while (exp.test(result)) {
//             result = result.replace(exp, '');
//         }
//         return result;
//     }
// });

// Object.defineProperty(String.prototype, 'contains', {
//     value(search) {
//         if (Array.isArray(search)) {
//             let res = search.filter(r => this.contains(r));
//             return res.length == search.length;
//         }
//         return this.indexOf(search)>=0;
//     }
// });

// Object.defineProperty(String.prototype, 'matches', {
//     value(search) {
//         let requires = [];
//         let start = false;
//         let base = {
//             index: -1,
//             val: ''
//         }
//         , seek = base;
//         let results = true;

//         for (let i = 0; i < search.length; i++) {
//             let r = search[i];
//             if (r == '(') {
//                 start = true;
//                 seek.index = i;
//             }
//             else if (r == ')') {
//                 requires.push(seek);
//                 seek = base;
//                 start = false;
//             }
//             else if (start) {
//                 seek.val += r;
//             }
//         }
//         console.log(JSON.stringify(requires));
//         requires.forEach(r => {
//             if (this.indexOf(r.val) != r.index) {
//                 console.log(`Failed match ${this} ? ${r.val} at ${r.index}`)
//                 results = false;
//             }
//         });
//         console.log(results ? 'Nothing failed' : 'Failed');
//         return results;
//     }
// });

let jeerefel = 'je(er)"ef"(el)';
let blerk = '(bler)k';
let clerk = 'clerkel';

let match = /\((.*?)\)/g
let search = /\"(.*?)\"/g
let comp = 'a(compar)t(men)taliz"at"ion';
let matches = [...comp.matchAll(match)].map((m,i) => {
    m.start = m.index - (i*2);
    m.end = m.start + m[1].length;
    return m;
  });

// matches.forEach(m => console.log(m))
console.log(matches);

console.log('DONE');