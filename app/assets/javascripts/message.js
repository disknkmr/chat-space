$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html = `<div class="MessageBox">
          <div class="main-chat__info">
            <div class="main-chat__info-userName">
              ${message.user_name}
            </div>
            <div class="main-chat__info-day">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`;
      return html;
    } else {
      let html = `<div class="MessageBox">
        <div class="main-chat__info">
          <div class="ain-chat__info-userName">
            ${message.user_name}
          </div>
          <div class="main-chat__info-day">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`;
      return html;
    }
  }

  $(".main-chat__form").on("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        let html = buildHTML(data);
        $(".main-chat__message").append(html);
        $("form")[0].reset();
        $(".submit-btn").prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
      });

    $(".main-chat__message-list").animate({
      scrollTop: $(".main-chat__message-list")[0].scrollHeight,
    });
  });
});
