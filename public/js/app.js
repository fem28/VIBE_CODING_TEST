$(function () {
  var $serverStatus = $('#serverStatus');
  var $serverUrl = $('#serverUrl');
  var $resultBox = $('#resultBox');
  var $itemForm = $('#itemForm');
  var $searchForm = $('#searchForm');

  $serverUrl.text(window.location.origin);

  checkHealth();

  $itemForm.on('submit', function (event) {
    event.preventDefault();

    var payload = {
      name: $('#name').val(),
      description: $('#description').val()
    };

    request({
      url: '/api/items',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(payload)
    });
  });

  $searchForm.on('submit', function (event) {
    event.preventDefault();

    request({
      url: '/api/items',
      method: 'GET',
      data: {
        keyword: $('#keyword').val()
      }
    });
  });

  function checkHealth() {
    $.ajax({
      url: '/api/health',
      method: 'GET',
      dataType: 'json'
    })
      .done(function (data) {
        $serverStatus
          .text(data.ok ? '정상 작동' : '확인 필요')
          .removeClass('is-ok is-error')
          .addClass(data.ok ? 'is-ok' : 'is-error');
      })
      .fail(function () {
        $serverStatus
          .text('연결 실패')
          .removeClass('is-ok is-error')
          .addClass('is-error');
      });
  }

  function request(options) {
    $resultBox.text('요청 중...');

    $.ajax(options)
      .done(function (data, textStatus, jqXHR) {
        var result = {
          status: jqXHR.status,
          body: data
        };

        $resultBox.text(JSON.stringify(result, null, 2));
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        var response = jqXHR.responseJSON || {
          ok: false,
          message: errorThrown || textStatus
        };

        $resultBox.text(JSON.stringify({
          status: jqXHR.status,
          body: response
        }, null, 2));
      });
  }
});
