$(document).ready(function() {

  $('.gitprofile').on('submit', function(e) {

    e.preventDefault();

    var access_token = '6d812745a245e14c43618c07705dc0d1e42b3145';
    var url = 'https://api.github.com/users/' + $('input.username').val() + "?access_token=" + access_token;

    var template = $('template').html();

    $.get(url, function(info){
      $('.container').prepend(Mustache.render(template, info));
    }).fail(userNotFound).always(clearUserName);

    function userNotFound (){
      $('.container').prepend("User not found");
    }

    function clearUsername (){
      $('input.username').val('');
    }
  });
});
