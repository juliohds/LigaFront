$(document).ready(function() {
  setDinamic();
  
  $("#forgetPassword").click(function() {
    forgotPass();
  });

  $("#btnLogout").click(function() {
    logout();
  });

  $("#btnLogar").click(function() {
    login();
  });

  $("#btnCadastrarUsuario").click(function() {
    cadastrarLogin();
  });
});

function login() {
  var email = $("#inputEmail").val();
  var senha = $("#inputSenha").val();

  var data = {
    email: email,
    senha: senha
  };

  axios
    .post(url + "user/login", data)
    .then(function(response) {
        console.log(response)
      if(response.data !=  ""){
        M.toast({
            html: "Usuário Logado com Sucesso!",
            classes: "rounded green accent-3"
        });

        // Armazenar
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("nome", response.data.nome);
        localStorage.setItem("email", response.data.email);

        $("#btnLogin").hide();
        $("#btnLogout").show(); 

        setDinamic();
      }else{
        M.toast({
            html: "Login ou senha inválidos!",
            classes: "rounded red accent-3"
          });
      }      
    })
    .catch(function(error) {
      M.toast({
        html: "Login ou senha inválidos!",
        classes: "rounded red accent-3"
      });
    });
}

function cadastrarLogin() {
  var elem = $("#modalCadastro");
  var instance = M.Modal.getInstance(elem);

  var nome = $("#nomeCad").val();
  var email = $("#emailCad").val();
  var senha = $("#senhaCad").val();

  if (nome == "" || email == "" || senha == "") {
    M.toast({
      html: "Preecha todos os campos obrigatórios!",
      classes: "rounded red accent-3"
    });
    return false;
  }

  var data = {
    nome: nome,
    email: email,
    senha: senha
  };

  axios
    .post(url + "user", data)
    .then(function(response) {
      M.toast({
        html: "Usuário Cadastrado com Sucesso!",
        classes: "rounded green accent-3"
      });
      instance.close();
      console.log(response);

      // Armazenar
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("nome", response.data.nome);
      localStorage.setItem("email", response.data.email);

      $("#btnLogin").hide();
      $("#btnLogout").show(); 

      setDinamic();
    })
    .catch(function(error) {
      console.log(error);
    });
}


function forgotPass(){

  var email = $("#inputEmail").val();

  if(email == "" || email == null){
    M.toast({
      html: "Preencha o campo de email para redefinição!",
      classes: "rounded red accent-3"
  });
    return false;
  }
  var data = {
    email: email,
    senha: "semsenha",
    nome: "vazio",
  };

  axios
    .post(url + "user/forgot-password", data)
    .then(function(response) {
        console.log(response)
      if(response.data ==  "ok"){
        M.toast({
            html: "Senha enviada para email!",
            classes: "rounded green accent-3"
        });
      }else{
        M.toast({
            html: "Erro ao enviar email de senha!",
            classes: "rounded red accent-3"
          });
      }      
    })
    .catch(function(error) {
      M.toast({
        html: "Erro ao enviar email de senha!",
        classes: "rounded red accent-3"
      });
    });
}

function logout() {
  // Armazenar
  localStorage.setItem("id", "");
  localStorage.setItem("nome", "");
  localStorage.setItem("email", "");

  $("#btnLogin").show();
  $("#btnLogout").hide();
  
  setDinamic();

  M.toast({
    html: "Volte sempre :)",
    classes: "rounded green accent-3"
  });
}

function setDinamic() {
    
  $("#txtInicio").html(
    localStorage.getItem("nome")
      ? "Pagina Inicial > Seja Bem Vindo " + localStorage.getItem("nome")
      : "Pagina Inicial"
  );
}

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '209479316592448',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

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

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      console.log(response)
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
