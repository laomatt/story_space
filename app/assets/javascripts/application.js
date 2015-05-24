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





})

