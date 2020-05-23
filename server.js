require('./utils');
const ENV = process.env.ENV || null;
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const isDev = ENV === 'development';

const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const browserSync = require('browser-sync')
const path = require('path')
const _ = require('underscore')
const helpers = require('./views/scripts/helpers')

const values = require('./public/data/values.json');
const words = require('./public/data/dictionary.json');
let terms = {
  search: ''
  , length: -1
  , points: -1
  , original: ''
  , info: ''
};

const app = express()

app.use(function (req, res, next) {
  req.rawBody = '';
  req.on('data', (chunk) => req.rawBody += chunk);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use express-handlebars view engine and set views template directory
const hbs = exphbs.create({
  partialsDir: __dirname + '/views/partials',
  helpers: helpers()
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// serve static files
app.use(express.static(path.resolve(__dirname, 'public'))) // serve public files
app.use(express.static(path.resolve(__dirname, 'data'))) // serve json files

const mapTerm = () => {
  let word = terms.search.toUpperCase();
  let current = word.split('').sort();
  if (_.contains(current, '?')) {
    // move ? to the end
    let c = current.shift();
    current.push(c);
  }
  let count = _.countBy(current, a => a);
  return { word, count };
};

const compareWords = (dict, search) => {
  let found = true;
  let varNum = search.count['?'] || 0;
  let variable = varNum;
  Object.keys(dict.count).every(o => {
    let numInEntry = dict.count[o]
      , numInSearch = search.count[o] || 0
      , diff = numInSearch - numInEntry;
    // console.log(`\t${o} : ${numInEntry} in ${dict.word}, ${numInSearch} in ${search.word} = ${diff} (${variable} available)`)
    if (diff < 0) {
      diff *= (-1);
      // console.log(`\tNot found, ${variable} available, ${diff} needed`);
      variable -= diff;
      if (variable < 0) {
        // console.log(`\tNope on ${dict.word}. ${variable} available...`);
        found = false;
        return found;
      }
    }
    return found;
  });
  // console.log(search.word,found ? 'Adding' : 'Ignoring', dict.word)
  variable = varNum;
  return found;
}

const filterByLetterCount = (results) => {
  let search = mapTerm();
  let start = results.length;
  results = results.filter(dict => compareWords(dict, search));
  terms.info = `Found ${results.length} matches from ${start} words searched`;
  return results;
}

const getValues = (results) => {
  results.forEach(dict => {
    dict.value = 0;
    dict.values = [];
    let search = mapTerm();
    let dictLetters = dict.word.split('');
    dictLetters.forEach(letter => {
      let index = search.word.indexOf(letter);
      let value = values[letter];
      dict.original = terms.original;
      if (index > -1) {
        search.word = search.word.slice(0, index) + search.word.slice(index + 1);
        dict.values.push({ letter, value });
        dict.value += value;
      }
      else {
        dict.values.push({ letter, value: '?', style: "variable" });
      }
    });
  });
  return results;
}

const getWords = () => {
  let length = terms.search.length;

  let results = words.filter(w => w.word.length <= length);
  if (terms.length < length) {
    results = results.filter(w => w.word.length >= terms.length);
  }

  results = results.filter(w => w.value >= terms.points);

  results = filterByLetterCount(results);

  let original = terms.original.toUpperCase();
  results = results.filter(r => r.word.matchSearch(original, '()'));
  results = results.filter(r => r.word.containSearch(original, '""'));

  results = getValues(results);

  results = _.sortBy(results, 'value').reverse();

  let final = [
    , { words: results.filter(w => w.word.length >= 8), label: '8 letter words', listId: 'eight-list' }
    , { words: results.filter(w => w.word.length == 7), label: '7 letter words', listId: 'seven-list' }
    , { words: results.filter(w => w.word.length == 6), label: '6 letter words', listId: 'six-list' }
    , { words: results.filter(w => w.word.length == 5), label: '5 letter words', listId: 'five-list' }
    , { words: results.filter(w => w.word.length == 4), label: '4 letter words', listId: 'four-list' }
    , { words: results.filter(w => w.word.length == 3), label: '3 letter words', listId: 'three-list' }
    , { words: results.filter(w => w.word.length == 2), label: '2 letter words', listId: 'two-list' }
  ]
  return { words: final, total: results.length };
}

const setTerms = (params) => {
  let search = params.search || '';
  terms = _.extend(terms, {
    search: search.stripSearch() || ''
    , original: search || ''
    , points: params.points || -1
    , length: params.length || -1
  });
}

if (isDev) {
  helpers().routes.forEach(r => {
    app.get(`/${r}`, ((req, res, next) => {
      res.render(r, {
        layout: 'lux',
        title: `LUX ${r}`
      })
    }))
  })
}

const renderHome = (props) => {
  setTerms(props);
  let words = getWords('');
  let title = 'Word Search';
  if (terms.search != '') {
    title += ` (${terms.search} : ${words.total} found!)`;
    terms.info += ` (Filtered to ${words.total} total results)`
  }
  let results = _.extend({
    layout: 'main',
    title,
    isDev
  }, _.extend(terms, words)
  );
  return results;
};

app.get('/', (req, res, next) => res.render('home', renderHome(req.query)));
app.post('/', (req, res, next) => res.render('home', renderHome(req.body)));

// Start the server
const devServer = () => {
  console.log('Starting browserSync....');
  browserSync({
    files: [
      'public/**/*.{html,js,css}',
      'public/**/**/*.{js}',
      'comp/**/*.{js}',
      '**/*.{js}',
      '*.{js}',
      'views/**/*.{html,hbs}'
    ],
    online: false,
    open: false,
    port: Number(PORT) + 1,
    proxy: `${HOST}:${PORT}`,
    ui: {
      port: Number(PORT) + 2
    }
  });
}

app.listen(PORT,
  isDev
    ? devServer
    : console.log('Running in production mode')
);
