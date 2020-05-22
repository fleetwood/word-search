(function () {
  let values = {};
  $.getJSON('./data/values.json', function (obj) {
    values = obj;
  });

  let matches = (term) => {
    let match = [...term.matchAll(/\((.*?)\)/g)].map((m, i) => {
      m.start = m.index - (i * 2);
      m.end = m.start + m[1].length;
      return m;
    });
    return match;
  }

  let searches = (term, word, values) => {
    term = term.replace(/[\(\)]/g,''); // get rid of ()
    let search = [...term.matchAll(/\"(.*?)\"/g)]
      .map((m, i) => {
        m.start = m.index - (i * 2);
        m.end = m.start + m[1].length;
        return m;
    });
  
    for(var s = 0; s < search.length; s++) {
      let current = search[s];
      if (!current) {
        break;
      }
      console.log(`Searching through ${word} to find ${current[1]}`);
      word = word.slice(0,current.start) + word.slice(current.end);
      for(let v = current.start; v < current.end; v++) {
        values[v].style = 'search';
      }
    }
  };

  $('body').on('click', '.words', function (e) {
    e.preventDefault();

    let word = $(this).attr('data-word');
    let value = $(this).attr('data-value');
    let wordValues = JSON.parse($(this).attr('data-values'));
    let term = $(this).attr('data-search-term').toUpperCase();

    searches(term, word, wordValues);

    let style = (letter, index) => {
      let match = matches(term);
      return letter.style ||
        match.filter(m => index >= m.start && index < m.end).length > 0
        ? 'match'
        : letter.value == '?'
          ? 'variable'
          : '';
    }

    const splitWord = wordValues.map((l, i) => `<letter>${l.letter}<sub>${l.value || '?'}</sub></letter>`).join('');
    $(".modal-title").html(`${word} (${value} points)`);
    $("#search-term").html(term);
    $("#letterizer").html(splitWord);
    $("#word-modal").modal();
  });

})();