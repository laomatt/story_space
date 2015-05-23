$(document).on('page:change', function() {

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



  // $('body').on('submit', '.login-form', function(event) {

  // });

});