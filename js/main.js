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
