// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

FBF = {
	setup: function() {
		FBF.init_fb();
	},
  init_fb: function() {
    window.fbAsyncInit = function() {
      // init the FB JS SDK
      FB.init({
        appId      : '176701892517049',                    // App ID from the app dashboard
        status     : true,                                 // Check Facebook Login status
        xfbml      : false                                 // Look for social plugins on the page
      });

      // Additional initialization code such as adding Event Listeners goes here
      FBF.list_friends();
    };

    // Load the SDK asynchronously
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  list_friends: function() {
    FB.api('/me/friends', {access_token: token}, function(response) {
      $(response.data).each(FBF.display_friend);
      $(".friend-div:even").css("background-color", "gainsboro");
    });
  },
  display_friend: function() {
    var friend_div = $("<div>").addClass("friend-div");
    $("<img>").attr("src", "https://graph.facebook.com/" + this.id + "/picture?width=150&height=150").addClass("friend-image").appendTo(friend_div);
    $("<p>").text(this.name).addClass("friend-name").appendTo(friend_div);
    $("<br>").attr("clear", "both").appendTo(friend_div);
    friend_div.appendTo("#fb_friends");
  }
}