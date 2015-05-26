// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require handlebars
//= require_tree .


$(document).on("page:change", function(){

  $('body').on('click', '.login-link', function(event) {
    event.preventDefault();
    $('.login-form').css('display','block')
    $('.form').css('display','block')
  });
  $('body').on('click', '.cancel-login-link', function(event) {
    event.preventDefault();
    $('.login-form').css('display','none')
    $('.form').css('display','none')
  });

  $('header').on('click', '.comm-drop-link', function(event) {
    event.preventDefault();
    $("#comm-drop").slideDown('700', function() {});
    // $("#comm-drop").on('click', function(event) {
    //   event.preventDefault();
    //   $(this).slideUp("700")
    // });
  $("#comm-drop").on('mouseleave', function(event) {
    event.preventDefault();
    $(this).slideUp("700")
  });
});



  $('body').on('click', '.signup-link', function(event) {
    event.preventDefault();
    $('.signup-form').css('display','block')
    $('.form').css('display','block')
  });
  $('body').on('click', '.cancel-signup-link', function(event) {
    event.preventDefault();
    $('.signup-form').css('display','none')
    $('.form').css('display','none')
  });


  $('body').on('click', '.read-more-link', function(event) {
    event.preventDefault();
    var id = $(this).attr('deck_id')
    $('#whole-story-display'+id).css('display','block')
  });

  $('body').on('click', '.hide-story-link', function(event) {
    event.preventDefault();
    var id = $(this).attr('deck_id')
    $('#whole-story-display'+id).css('display','none')
  });


  $('body').on('click', '.create-new-character', function(event) {
    event.preventDefault();
    $("#create-a-card").css("display","block");
  });

  $('body').on('click', '.hide-char-create-box', function(event) {
    event.preventDefault();
    $("#create-a-card").css("display","none");
  });

//actions for create-story card select
$('body').on('click', '.inspect-this-card', function(event) {
  event.preventDefault();
  var id = $(this).attr("href");
  $("#inspect-card-box"+id).css("display","block")
});

$('body').on('click', '.close-this-card', function(event) {
  event.preventDefault();
  var id = $(this).attr("href");
  $("#inspect-card-box"+id).css("display","none")

});

var current_cast=[]

$('body').on('click', '.select-this-card', function(event) {
  event.preventDefault();
  var id = $(this).attr("href");
  var name = $("#character-selection-box"+id).find('h2')[0];
  var type = $("#character-selection-box"+id).find('h4')[0];
  // debugger
  var that = '<div class="inspect-card-box" id="inspect-card-box'+id+'"><h2>Mrs. Devan Maggio</h2><h4>Lead Male</h4><i>by: Lonzo Terry</i><p>Harum consequatur earum totam dolorem rerum error aut. Et vel quibusdam delectus. Est quae reprehenderit. Quod incidunt in dolor dicta.</p><a href="'+id+'" class="close-this-card">close</a></div>'
  $("#character-selection-box"+id).css('display','none');
  $('#current-deck-cards').append('<div class="card-display-template create-new-story-cast-template" id="cast'+id+'">'+that+'<h3>'+name.innerHTML+'</h3>'+type.innerHTML+'<br><a href="'+id+'" class="inspect-this-card">[inspect]</a><a href="'+id+'" class="remove-this-card">[x]</a></div>');
//.fadeIn('2000', function() {})  use this on those item just appended
$("#inspect-card-box"+id).css("display","none");
$('.char-select-box-wrapper').fadeOut('2000', function() {});
current_cast.push(id);
// debugger
});

$('body').on('click', '.remove-this-card', function(event) {
  event.preventDefault();
  var id = $(this).attr('href')
  $('#cast'+id).remove()
  $("#character-selection-box"+id).css('display','block')
  var space = current_cast.indexOf(id)
  current_cast.splice(space,space+1)
  // debugger
});

//sends a new story to the DB
$('body').on('submit', '.create-new-deck', function(event) {
  event.preventDefault();
  var that = $(this)
  var send_data = ""
  for(var t in current_cast){
    send_data+=current_cast[t]+","
  }
  // debugger
$.ajax({
  url: '/decks',
  type: 'POST',
  data: {current_chars:send_data, name:$(this).find('input[name="title"]').val(), story:$(this).find('textarea[name="content"]').val(), category:$(this).find('input[name="genre"]').val(), tag_line:$(this).find('input[name="tag_line"]').val(), setting:$(this).find('input[name="setting"]').val(), genre:$(this).find('input[name="genre"]').val()},
})
.done(function() {
  that.trigger('reset')
  $("#story-created-notification").fadeIn(700, function() {
    $("#story-created-notification").fadeOut(700, function() {

    });
  });
  // setTimeout(700,$("#story-created-notification").fa)
})


});

//send a new character to the DB



//makes a deck public

$('body').on('click', '.publish-current-deck-link', function(event) {
  event.preventDefault();
  var id = $(this).attr('href');
  $.ajax({
    url: '/deck_publish/'+id,
    type: 'PATCH',
  })
  .done(function(data) {
$('#story-status-notification').html('This story has been published. <a href="'+id+'" class="unpublish-current-deck-link">Click here to unpublish this</a><br>')
  })
});

//makes a deck private
$('body').on('click', '.unpublish-current-deck-link', function(event) {
  event.preventDefault();
    var id = $(this).attr('href');
  $.ajax({
    url: '/deck_unpublish/'+id,
    type: 'PATCH',
  })
  .done(function(data) {
$('#story-status-notification').html('This story has not been published to the comunity yet. <a href="'+id+'" class="publish-current-deck-link">Click here to publish this</a>')
  })
});

//makes a card availiable to others

//destroys a card

//destroys a deck
  //confirms with the user first

  //deletes upon confirmation

//destroys a passage
})

