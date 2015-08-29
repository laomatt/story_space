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


  var current_user_id = $("#users_info").attr("user_id")
  var firebase_notes = new Firebase("https://create-a-alot.firebaseIO.com")
  var values= 0
  var firebase_hash={}
  firebase_notes.orderByChild("user_id").on('child_added', function(snapshot){
    if($("#users_info").attr("user_id")==snapshot.val().user_id)
    {
      firebase_hash[snapshot.val().story]=snapshot.ref()
      // console.log(snapshot.ref())
      values+=1
      $("#nav-bar-updates-note").slideDown('800', function() {
        $("#nav-bar-updates-note").text(values)
        $("#note-drop").append('<li class="note-drop-item"><a href="/edit_deck/'+snapshot.val().story+'" story_id="'+snapshot.val().story+'" class="note-story-link-check">'+snapshot.val().note+'</a></li><br><hr>')
      });
    }
  })



  $(function(){
    $("#profile-panel").draggable()

  })

  $('body').on('click', '.note-story-link-check', function(event) {
    var id = $(this).attr('story_id');
    firebase_hash[id].remove();
  });

  $('body').on('click', '.hide-profile-button', function(event) {
    event.preventDefault();
    $("#profile-panel").slideUp(500)
  });

  $('body').on('click', '.show-player-dash', function(event) {
    event.preventDefault();
    $("#profile-panel").slideDown(500, function() {

    });
  });


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
    $("#comm-drop").on('mouseleave', function(event) {
      event.preventDefault();
      $(this).slideUp("700")
    });
  });

  $('header').on('click', '.note-drop-link', function(event) {
    event.preventDefault();
    if($(".note-drop-item").length > 0){
      $("#note-drop").slideDown('700', function() {});
    }
    $("#note-drop").on('mouseleave', function(event) {
      event.preventDefault();
      $(this).slideUp(700)
    });
  });

  $('header').on('click', '.information-drop-link', function(event) {
    event.preventDefault();
    $("#info-drop").slideDown('700', function() {});
    $("#info-drop").on('mouseleave', function(event) {
      event.preventDefault();
      $(this).slideUp(700)
    });
  });

  $('header').on('click', '.control-panel-link', function(event) {
    $(this).css('backgroundColor', '#F5DA81');
  });

  $('header').on('mouseleave', '.drop-list', function(event) {
    event.preventDefault();
    $(this).slideUp(500, function(){
      $('.control-panel-link').css('backgroundColor', 'transparent');
    })
  });

  $('header').on('mouseleave', '.control-panel-link', function(event) {
    event.preventDefault();
    $('.drop-list').slideUp(500, function(){
    $('.control-panel-link').css('backgroundColor', 'transparent');
    })
  });

  $('body').on('click', '.signup-link', function(event) {
    event.preventDefault();
    $('.form').slideDown('500', function() {
      $(".signup-form").fadeIn(600, function() {
      });
    });
  });
  $('body').on('click', '.cancel-signup-link', function(event) {
    event.preventDefault();
    $('.signup-form').fadeOut(600, function() {

    $('.form').slideUp(700)
    });
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
    // $("#create-a-card").css("display","block");
    $("#create-a-card").slideDown('700', function() {});
  });

  $('body').on('click', '.hide-char-create-box', function(event) {
    event.preventDefault();
    // $("#create-a-card").css("display","none");
    $("#create-a-card").slideUp(700)
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




//makes a deck public or private

$('body').on('click', '#story-status-notification', function(event) {
  event.preventDefault();
  var mode = $(this).attr('public');
  var id = $(this).attr('storyid');
  if(mode == 'true'){
     $.ajax({
    url: '/deck_unpublish/'+id,
    type: 'PATCH',
  })
  .done(function(data) {
    $('#story-status-notification').attr('public', 'false');
    // $(".new-link-char").css('display','block')
    $(".new-link-char").slideDown('800', function() {
    // $(".options-box").css('display','block')
    $(".options-box").fadeIn('700', function() {
      document.getElementById("story-container").className="whole-story-display non-published-story"
      document.getElementById("story-status-notification").className="story-status-notification non-published-story"
    });
  });

  })
  }
  else{
  $.ajax({
    url: '/deck_publish/'+id,
    type: 'PATCH',
  })
  .done(function(data) {
    $('#story-status-notification').attr('public', 'true');
    $(".new-link-char").slideUp('800', function() {
      $(".options-box").fadeOut('700', function() {
        document.getElementById("story-container").className="whole-story-display published-story"
        document.getElementById("story-status-notification").className="story-status-notification published-story"
      });
    });
  })
  }

});

//send a new character to the DB (create new card)

$('body').on('submit', '.new-card-form', function(event) {
  event.preventDefault();
  var that = $(this)
  $.ajax({
    url: '/cards',
    type: 'POST',
    data: that.serialize(),
  })
  .done(function(data) {
    $('#create-a-card').slideUp(700)

    var context = { cards: data};

    var source = $("#user-card-template").html();
    var source2 = $("#cast-card-template").html();

    var template = Handlebars.compile(source);
    var template2 = Handlebars.compile(source2);

    var html = template(context);
    var html2 = template(context2);


    $('#current-cards').append(html)
    $("#char-select-box").append(html2)
    $(".card-display-template"+data[0].card.id).css('display','none')
    $(".card-display-template"+data[0].card.id).fadeIn(700, function() {});
    that.trigger('reset')
    // debugger
  })
});


//send a new character to the DC and send it back to the


//pops up char select modal
$('body').on('click', '.pop-up-char-select-modal', function(event) {
  event.preventDefault();
  $("#char-select-modal").slideDown(500, function() {});
});

//close char select modal
$('body').on('click', '.close-char-select-modal', function(event) {
  event.preventDefault();
  $("#char-select-modal").slideUp(500);
});

//inspects card in edit page
$('body').on('click', '.inspect-card-in-edit-page', function(event) {
  event.preventDefault();
  var id=$(this).attr('href');
  $("#inspect-edit-card-box"+id).slideDown('700', function() {});

});
$('body').on('click', '.hide-inspect-card-in-edit-page', function(event) {
  event.preventDefault();
  var id=$(this).attr('href');
  $("#inspect-edit-card-box"+id).slideUp('700')
});
$('body').on('click', '.remove-inspect-card-in-edit-page', function(event) {
  event.preventDefault();
  var id = $(this).attr('href');
  $.ajax({
    url: '/card_remove_from_story/'+id,
    type: 'PATCH',
  })
  .done(function(data) {
    $("#inspect-edit-card-box"+id).slideUp('700')
    $("#story-cast-list"+id).fadeOut('600', function() {});
  })
});


//inspects card in char select modal
$('body').on('click', '.inspect-card-in-char-select-modal', function(event) {
  event.preventDefault();
  var id=$(this).attr('href');
  $("#inspect-card-box"+id).slideDown('700', function() {});
});

$('body').on('click', '.hide-inspect-card-in-char-select-modal', function(event) {
  event.preventDefault();
  var id=$(this).attr('href');
  $("#inspect-card-box"+id).slideUp('700')
});

$('body').on('click', '.add-inspect-card-in-char-select-modal', function(event) {
  event.preventDefault();
  var card_id = $(this).attr('href')
  var deck_id = $("#story_id_info").attr('id2')
  // var deck_id = $(this).attr('deck_id')
  $.ajax({
    url: '/decks/'+deck_id+'/cards/'+card_id,
    type: 'PATCH',
  })
  .done(function(data) {
    console.log(data);
    var context = { cards: data};
    var source = $("#edit-page-character-list-template").html();
    var template = Handlebars.compile(source);
    var html = template(context);
    $("#current-cast-of-characters").append(html)
    // $("#aloted-card-display-template"+card_id).fadeOut('500', function() {});
    $("#aloted-card-display-template"+card_id).css('display','none');
    $("#char-select-modal").slideUp(500)
  })

});

//pops up modal to inspects card in the edit page
$('body').on('click', '.inspect-card-in-edit-page', function(event) {
  event.preventDefault();
  $("#inspect-card-box-edit")
  /* Act on the event */
});

//selects a char for a story from the char select modal


//pops up claim card modal

$('body').on('click', '.pop-up-claim-card-modal', function(event) {
  event.preventDefault();

  var id = $(this).attr('href');
  // $("#claim-card-modal"+id).css('display','block')
  $("#claim-card-modal"+id).slideDown('500', function() {});
});

$('body').on('click', '.hide-claim-modal', function(event) {
  event.preventDefault();
  var id = $(this).attr('href');
  $("#claim-card-modal"+id).slideUp('500')
});

//claims a card from the community selection

$('body').on('submit', '.claim-this-card-from-community', function(event) {
  event.preventDefault();
  var id = $(this).attr('action');
  $.ajax({
    url: '/claim_card_for_deck',
    type: 'PATCH',
    data: $(this).serialize(),
  })
  .done(function(data) {
    $("#claim-card-modal"+id).slideUp('500')
    $('#community-card-display'+id).fadeOut('500', function() {});
  })
});

//claims card from the public page
  //pops up modal from public page
  $('body').on('click', '.claim-from-public-page', function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $("#claim-card-from-public-page-modal"+id).slideDown('500', function() {});
  });

  //hides modal from public page
  $('body').on('click', '.hide-claim-modal-in-public-page', function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $("#claim-card-from-public-page-modal"+id).slideUp('500')
  });

  //submit the form to the DB

  $('body').on('submit', '.claim-this-card-from-public', function(event) {
    event.preventDefault();
    var id = $(this).attr('action');
    $.ajax({
      url: '/claim_card_for_deck_from_public',
      type: 'PATCH',
      data: $(this).serialize(),
    })
    .done(function(data) {
      $("#claim-card-from-public-page-modal"+id).slideUp('500')
      // $('#community-card-display'+id).fadeOut('500', function() {});
      $("#what-story-associated-with").html('<b>Current story: </b><a href="/decks/'+data.id+'">'+data.name+'</a>')
    })
  });




//remove char from a story
$('body').on('click', '.remove-character-from-story', function(event) {
  event.preventDefault();
  var id = $(this).attr('href');
  $.ajax({
    url: '/card_remove_from_story/'+id,
    type: 'PATCH',
  })
  .done(function(data) {
    $("#story-cast-list"+id).fadeOut('600', function() {});
  })
});

//makes a card availiable to others

//destroys a card
  //confirm with the user first
  $('body').on('click', '.initiate-character-deletion', function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $("#delete-character-confirmation"+id).fadeIn(1000, function() {});
  });

  $('body').on('click', '.cancel-character-delete', function(event) {
    event.preventDefault();
    var id = $(this).attr('href')
    $("#delete-character-confirmation"+id).fadeOut(1000, function() {});
  });


  //deletes character upon confirmation
  $('body').on('click', '.confirm-character-delete', function(event) {
    event.preventDefault();
    var id = $(this).attr('href')
    $.ajax({
      url: '/dissmiss_cards/'+id,
      type: 'patch',
    })
    .done(function(data) {
      $('#card-display-template'+id).fadeOut(1000, function() {});
    })
    .always(function() {
      $("#delete-character-confirmation"+id).fadeOut(600, function() {});
    });
  });


//destroys a deck
  //confirms with the user first
  $('body').on('click', '.initiate-story-deletion', function(event) {
    event.preventDefault();
    var id = $(this).attr('href')
    $("#delete-deck-confirmation"+id).fadeIn(1000, function() {});
  });

  $('body').on('click', '.cancel-story-delete', function(event) {
    event.preventDefault();
    var id = $(this).attr('href')
    $("#delete-deck-confirmation"+id).fadeOut(1000, function() {});
  });

  //deletes story upon confirmation
  $('body').on('click', '.confirm-story-delete', function(event) {
    event.preventDefault();
    var id = $(this).attr('href')
    $.ajax({
      url: '/decks/'+id,
      type: 'DELETE',
    })
    .done(function(data) {
      $('#deck-user-display'+id).fadeOut(1000, function() {});
    })
    .always(function() {
      $("#delete-deck-confirmation"+id).fadeOut(600, function() {});
    });
  });

//destroys a passage
$('body').on('click', '.dismiss-passage-link', function(event) {
  event.preventDefault();
  var id = $(this).attr('href')

  $.ajax({
    url: '/passages/'+id,
    type: 'DELETE',
  })
  .done(function(data) {
    console.log("success");
    $('#nonapprovedpassage'+id).fadeOut('600', function() {});
  })

});
})

