const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const browserSync = require('browser-sync')
const path = require('path')
const _ = require('underscore')
const helpers = require('./helpers')
const port = 8080;

const values = require('./data/values.json');
const words = require('./data/dictionary.json');
let terms = {
  search: ''
  , length: -1
  , points: -1
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

// serve static files form /public
app.use(express.static(path.resolve(__dirname, 'public'))) // serve static files
const routes = [
  ['/buttons', 'buttons']
  , ['/containers', 'containers']
  , ['/dialogs', 'dialogs']
  , ['/forms', 'forms']
  , ['/home', 'home']
  , ['/indicators', 'indicators']
  , ['/navs', 'navs']
  , ['/progress', 'progress']
  , ['/tables', 'tables']
  , ['/typography', 'typography']
  , ['/', 'home']
];

const mapTerm = () => {
  let word = terms.search.toUpperCase();
  let current = word.split('').sort();
  let count = _.countBy(current, a => a);
  return { word, count };
};

const d = [
  {
    "word": "AAH",
    "value": 5,
    "count": {
      "A": 2,
      "H": 1
    }
  }
];

const filterByLetterCount = (results) => {
  let search = mapTerm();
  let start = results.length;
  results = results.filter(w => {
    let found = true;
    // console.log(`${w.word} ? ${search.word}`);
    Object.keys(w.count).every(o => {
      let wc = w.count[o]
        , sc = search.count[o] || null;
      let r = sc !== null && sc >= wc;
      // console.log(`\t${o} : ${wc} <= ${sc} = ${r}`)
      if (!r) {
        found = false;
      }
      return found;
    });
    return found;
  });
  console.log(`Found ${results.length} matches of ${start} words searched`);
  return results;
}

const getValues = (results) => {
  results.forEach(r => {
    r.value = 0;
    r.word.split('').forEach(l => {
      r.value += values[l];
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

  results = getValues(results);

  results = _.sortBy(results, 'value').reverse();

  let final = [
    { words: results.filter(w => w.word.length >= 8), label: '8 letter words', listId: 'eight-list' }
    , { words: results.filter(w => w.word.length == 7), label: '7 letter words', listId: 'seven-list' }
    , { words: results.filter(w => w.word.length == 6), label: '6 letter words', listId: 'six-list' }
    , { words: results.filter(w => w.word.length == 5), label: '5 letter words', listId: 'five-list' }
    , { words: results.filter(w => w.word.length == 4), label: '4 letter words', listId: 'four-list' }
    , { words: results.filter(w => w.word.length == 3), label: '3 letter words', listId: 'three-list' }
    , { words: results.filter(w => w.word.length == 2), label: '2 letter words', listId: 'two-list' }
  ]
  return { words: final, total: results.length };
}

const setTerms = (req) => {
  terms = _.extend(terms, {
    search: req.body.search || ''
    , points: req.body.points || -1
    , length: req.body.length || -1
  });
}

routes.forEach(r => {
  app.get(r[0], ((req, res, next) => {
    setTerms(req);
    let results = getWords('');
    res.render(r[1], {
      words: results.words
      , total: results.total
      , terms
    })
  }))
  app.post(r[0], ((req, res, next) => {
    setTerms(req);
    let results = getWords('');
    res.render(r[1], {
      words: results.words
      , total: results.total
      , terms
      , terms
    })
  }))
})

// Start the server
const listening = () => {

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
    port: Number(port) + 1,
    proxy: `localhost:${port}`,
    ui: {
      port: Number(port) + 2
    }
  });
}

app.listen(port, listening);
