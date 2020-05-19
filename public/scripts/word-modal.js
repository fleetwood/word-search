(function () {
  let values = {};
  $.getJSON('./data/values.json', function(obj) {
    values = obj;
  });

  $('body').on('click', '.words', function (e) {
    e.preventDefault();
    let word = $(this).attr('data-word');
    let value = $(this).attr('data-value');
    let values = JSON.parse($(this).attr('data-values'));

    const splitWord = values.map(r=>`<letter ${r.value == '?' ? 'class="variable"' : ''}>${r.letter}<sub>${r.value || '?'}</sub></letter>`).join('');
    $(".modal-title").html(`${word} (${value} points)`);
    $("#letterizer").html(splitWord);
    $("#word-modal").modal();
  });

})();