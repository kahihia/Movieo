/**
 * Created by umeshksingla on 20/11/15.
 */

//App.controller('facebookLoginController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state, responseCode) {

function statusChangeCallback(response) {

    console.log('inside statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {

        logged_in_user.accessToken = response.authResponse.accessToken;


        // Logged into your app and Facebook
        loginAPI();
        createCookie("accessToken", logged_in_user.accessToken, false);
        logged_in_user.id = 14;

        // sending request to movieo database and confirming whether user already exists or not
        /*$.ajax({
            type: "POST",
            url: baseURL + '/check-login',
            data: 'email=' + logged_in_user.email + 'accessToken=' + logged_in_user.accessToken,
            success: function (response) {
                if(response.data.existingUser){
                    createCookie("accessToken", logged_in_user.accessToken, false);
                    logged_in_user.id = response.data.id;
                }
                else {

                    // save his facebook details in database
                    var dataString = '';

                    console.log(logged_in_user);
                    for(var key in logged_in_user){
                        console.log(key);
                        console.log(logged_in_user[key]);
                        dataString = i + '=' + logged_in_user[key];
                    }
                    console.log(dataString);

                    $.ajax({
                        type: "POST",
                        url: baseURL + '/add-user',
                        data: dataString,
                        success: function (response) {
                            // log him
                            console.log(response);
                            createCookie("accessToken", logged_in_user.accessToken, false);
                            logged_in_user.id = response.data.id;
                        },
                        error: function (response) {
                            console.log(response);
                            console.log("in inner login api call");
                            eraseCookie("accessToken");
                        }

                    });
                }
            },
            error: function (response) {
                console.log(response);
                console.log("in outer login api call");
            }

        });*/

    }
    else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById("profile-image").src = 'app/img/default_profile.jpg';
        document.getElementById("profile-link").href = '';
        document.getElementById('status').innerHTML = '';
        eraseCookie("accessToken");
    }
    else {
        // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        document.getElementById("profile-image").src = 'app/img/default_profile.jpg';
        document.getElementById("profile-link").href = '';
        document.getElementById('status').innerHTML = '';
        eraseCookie("accessToken");
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {

    FB.init({
        appId      : '907778205958098',     // my ddiary app id
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.2' // use version 2.2
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// See statusChangeCallback() for when this call is made.
function loginAPI() {

    console.log('Welcome!  Fetching your information.... ');

    // get user details
    FB.api('/me?fields=email,picture,link,name,bio,gender,hometown,birthday', function (response) {
            console.log(response);
            if (response && !response.error) {

                console.log('Successful login for: ' + response.name);

                document.getElementById('status').innerHTML = response.name;
                document.getElementById("profile-image").src = response.picture.data.url;
                document.getElementById("profile-link").href = response.link;

                logged_in_user.name = response.name;
                logged_in_user.profile_image = response.picture.data.url;
                logged_in_user.email = response.email;
                logged_in_user.hometown = response.hometown.name;
                logged_in_user.birthday = response.birthday;
                logged_in_user.gender = response.gender;
                logged_in_user.bio = response.bio;
                logged_in_user.profile_link = response.link;
            }
        }
    );
}