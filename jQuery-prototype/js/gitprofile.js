$(document).ready(function() {

  $('.gitprofile').on('submit', function(e) {

    e.preventDefault();

    var access_token = '<access_token>' // Replace this with a Github access token that you can generate as explained here https://help.github.com/articles/creating-an-access-token-for-command-line-use/
    var url = 'https://api.github.com/users/' + $('input.username').val() + "?access_token=" + access_token;

    var template = $('template').html();

    $.get(url, function(info) {
      $('.container').prepend(Mustache.render(template, info));
    }).fail(userNotFound()).always(clearUserName());

    function userNotFound () {
        $('.container').prepend("User not found")
      };

    function clearUserName () {
        $('input.username').val('');
        }

  });
});
