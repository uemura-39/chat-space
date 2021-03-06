$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="message__list__post" data-message-id=${message.id}>
        <div class="message__list__post--name">
          ${message.user_name}
        </div>
        <div class="message__list__post--time">
          ${message.created_at}
        </div>
      </div>
      <div class="message__list__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message__list__post" data-message-id=${message.id}>
        <div class="message__list__post--name">
          ${message.user_name}
        </div>
        <div class="message__list__post--time">
          ${message.created_at}
        </div>
      </div>
      <div class="message__list__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
   .done(function(data){
     var html = buildHTML(data);
     $('.message__list').append(html);
     $('form')[0].reset();
     $('.message__list').animate({ scrollTop: $('.message__list')[0].scrollHeight});
     $('.form__submit').prop('disabled', false)
   })
   .fail(function() {
     alert("メッセージ送信に失敗しました");
   });
 })
var reloadMessages = function() {
  var last_message_id = $('.message__list__post:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.message__list').append(insertHTML);
      $('.message__list').animate({ scrollTop: $('.message__list')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  })
 };
 if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 3000);
 }
});