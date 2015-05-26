$(document).on("page:change", function(){

  $('body').on('click', '.cast-a-character', function(event) {
    event.preventDefault();
    $(".char-select-box-wrapper").slideDown(700, function() {});
  });

  $('body').on('click', '.hide-char-select-box', function(event) {
    event.preventDefault();
    $(".char-select-box-wrapper").slideUp(700, function() {});
  });



//stuff for people to read and add passages to your stories

$('body').on('click', '.add-passage-to-story', function(event) {
  event.preventDefault();
  $(".new-passage-container").fadeIn(2000, function() {});
  $(this).fadeOut(400, function() {
  });
});

$('body').on('submit', '.new-passage-form', function(event) {
  event.preventDefault();
  var story_id=$("#story-info").attr("story_id")
  $.ajax({
    url: '/passages',
    type: 'POST',
    data: $(this).serialize(),
  })
  .done(function(data) {
    debugger
    console.log(data)
    $(".new-passage-container").fadeOut(1000, function() {});
    $(".add-passage-to-story").fadeIn(400, function() {});
  })

});


        //approve a passage
$('body').on('click', '.approve-passage-link', function(event) {
  event.preventDefault();
  $.ajax({
    url: '/passage/approve_passage/'+$(this).attr('href'),
    type: 'PATCH',
  })
  .done(function(data) {
    $("#nonapprovedpassage"+data.id).css('display','none');
    $("#app_pass").append('<div id="approved_pass'+data.id+'" class="passage approved">'+data.content+'<a href="'+data.id+'" class="cancel-approval-link">[Cancel]</a></div>')
  })
});


          //cancell the approval of a passage
$('body').on('click', '.cancel-approval-link', function(event) {
  event.preventDefault();
  $.ajax({
    url: '/passage/disapprove_passage/'+$(this).attr('href'),
    type: 'PATCH',
  })
  .done(function(data) {
    $("#nonapprovedpassage"+data.id).css('display','block');
    $("#approved_pass"+data.id).remove()
  })
});

})