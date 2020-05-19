(function () {
  let values = {};
  $.getJSON('./data/values.json', function(obj) {
    values = obj;
  });

  $('body').on('click', '.words', function (e) {
    e.preventDefault();
    let word = $(this).attr('data-word');
    let value = $(this).attr('data-value')

    const splitWord = word.split('').map(r=>`<letter>${r}<sub>${values[r] || 0}</sub></letter>`).join('');
    $(".modal-title").html(`${word} (${value} points)`);
    $("#letterizer").html(splitWord);
    $("#word-modal").modal();
  });

})();