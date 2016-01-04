//Variável global do usuário logado em redes sociais. Valor é {} para usuários não logados.
var oauth_user = {};

/*function setUser(data){
    oauth_user = data;
    if(oauth_user.email){
        $('#nav #user').text(oauth_user.name);
        $('#nav #logout').show();
    } else {
        $('#nav #user').text("Login");
        $('#nav #logout').hide();
    }   
}*/

function loginFacebook(){
    FB.login(function(response){ 
        statusChangeCallback(response) 
    }, {scope: 'email, public_profile'})
}

function logOutSocial(){
    if(oauth_user.origin === "facebook"){
        logoutFB();
        // console.log('user logged out (facebook)');
    } else if (oauth_user.origin === "Google") {
        logoutGoogle(oauth_user.access_token);
        // console.log('user logged out (Google)');
    } else {
        //Logout default
    }
    oauth_user = {};
    return true
}



// Facebook Auth

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    //console.log('statusChangeCallback');
    //console.log(response);

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        loginFB();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        //document.getElementById('status').innerHTML = 'Please log ' +
        //    'into this app.';
        // console.warn('Please log ' + 'into this app (facebook).');
        oauth_user = {}
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        //document.getElementById('status').innerHTML = 'Please log ' +
        //    'into Facebook.'; 
        // console.warn('Please log ' + 'into (facebook).');
        oauth_user = {}
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        //console.log(response);
    });
}



window.fbAsyncInit = function() {
    FB.init({
        appId: '400609520141203',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.4', // use version 2.4,
        display: 'page'
    });
    // console.log('connected to facebook SDK');
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};




// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function loginFB() {
 
    // console.log('Welcome!  Fetching your information.... ');

    FB.api('/me', {fields: 'last_name, name, email'}, function(response) {
        


        oauth_user = response;
        oauth_user.origin = "facebook";
        
        getLogUser({BASE:"FACEBOOK", DATA: oauth_user})

        //location.href = "index.php";
        //document.getElementById('status').innerHTML =
        //'Thanks for logging in, ' + response.name + '!';
    });
}

function logoutFB(){
    FB.logout(function(response) {
        //location.href = "login.php";
        oauth_user = {};
        return true
    });
}




// Google Auth

function renderGoogleButton(){
    
    gapi.signin.render('google', {
    
        'callback': 'loginGoogle',
        'clientid': '984855192218-9snm1aookj81k853aug08rh14chl26du.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'requestvisibleactions': 'http://schemas.google.com/AddActivity',
        'scope': 'https://www.googleapis.com/auth/plus.login  https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    })
    
    // console.log('connected to Google API')
}

function loginGoogle(authResult) {
    //console.log((authResult['access_token']);
        // console.log('loginGoogle()')
    if (authResult['access_token']) {
     
        $.get('https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + authResult['access_token'], function(data){
            oauth_user = data;
            oauth_user.origin = "Google";
            oauth_user.access_token = authResult['access_token'];

            getLogUser({BASE:"GOOGLE", DATA: oauth_user})
            //location.href = "index.php";
        })
        //console.log(authResult);
        //var oauth_user = authResult;
        //oauth_user.origin = "Google";
        // Autorizado com sucesso
        // Ocultar o botão de login agora que o usuário está autorizado, por exemplo:
        
        //document.getElementById('signinButton').setAttribute('style', 'display: none');
    } else if (authResult['error']) {
        // console.warn('Please log ' + 'into this app (Google).');
        
        // Ocorreu um erro.
        // Possíveis códigos de erro:
        //  "access_denied" - o usuário negou o acesso a seu aplicativo
        //   "immediate_failed" - não foi possível fazer o login do usuário automaticamente
        // console.log('There was an error: ' + authResult['error']);
    }
}

function logoutGoogle(access_token) {



    if(access_token){
        
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;
        // Realizar uma solicitação GET assíncrona.
        $.ajax({
            type: 'GET',
            url: revokeUrl,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(nullResponse) {
                // Fazer algo agora que o usuário está desconectado
                // A resposta é sempre indefinida.
                oauth_user = {};
                return true
            },
            error: function(e) {
                // Gerenciar o erro
                // console.error(e);
                // Você pode apontar usuários para desconectar manualmente se não for bem-sucedido
                // https://plus.google.com/apps
                return false
            }
        });

    } else {
        console.error('Faltando access_token');
    }

}



