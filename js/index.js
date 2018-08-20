$(document).ready(function() {
  socio = [];

  $(".sidenav").sidenav();
  $(".modal").modal();
  $('.tabs').tabs();

  $("#btnCadStartup").click(function() {
    if (
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") != null
    ) {
      M.toast({
        html: "Voce precisa fazer login antes!",
        classes: "rounded red accent-3"
      });
      return false;
    } else {
      var elem = $("#modalCadastroStartup");
      var instance = M.Modal.getInstance(elem);
      instance.open();
      socio = [];
    }
  });

    
  $("#btnCadEmpresa").click(function() {  
    if (
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") != null
    ) {
      M.toast({
        html: "Voce precisa fazer login antes!",
        classes: "rounded red accent-3"
      });
      return false;
    } else {
      var elem = $("#modalCadastroEmpresa");
      var instance = M.Modal.getInstance(elem);
      instance.open();
      socio = [];
    }
});

  $("#btnCadastrarNegocio").click(function() {
    cadastrarNegocio();
  });

  $("#btnCadastrarNegocio1").click(function() {
    cadastrarNegocioBigEmpresa();
  });

  $("#addSocioBigEmpresa").click(function() {
    var txt_socio = $("#inputSocioNameBigEmpresa").val();
    if (txt_socio != null && txt_socio != "") {
      $("#divSociosBigEmpresa").append(
        "<a href='#!' class='collection-item'>" + txt_socio + "</a>"
      );
      var obj = {
        nome: txt_socio
      };
      socio.push(obj);
    }
    $("#inputSocioNameBigEmpresa").val("");
    M.toast({
      html: "Sócio adicionado confira a lista abaixo",
      classes: "rounded green accent-3"
    });
    console.log(socio);
  });

  
  $("#addSocio").click(function() {
    var txt_socio = $("#inputSocioName").val();
    if (txt_socio != null && txt_socio != "") {
      $("#divSocios").append(
        "<a href='#!' class='collection-item'>" + txt_socio + "</a>"
      );
      var obj = {
        nome: txt_socio
      };
      socio.push(obj);
    }
    $("#inputSocioName").val("");
    M.toast({
      html: "Sócio adicionado confira a lista abaixo",
      classes: "rounded green accent-3"
    });
    console.log(socio);
  });
});

function cadastrarNegocioBigEmpresa(){
  var elem = $("#modalCadastroEmpresa");
  var instance = M.Modal.getInstance(elem);

  var endereco = {
    cidade: $("#EndcidadeBigEmpresa").val(),
    rua: $("#EndruaBigEmpresa").val(),
    numero: $("#EndnumeroBigEmpresa").val()
  };
  var data = {
    nome: $("#nomeBigEmpresa").val(),
    ramo: $("#ramoBigEmpresa").val(),
    email: $("#cadEmpresaEmailBigEmpresa").val(),
    telefone: $("#cadEmpresaTelefoneBigEmpresa").val(),
    socio: socio,
    endereco: endereco
  };

  console.log(data);
  
  axios
    .post(url + "grande-empresa", data)
    .then(function(response) {
      M.toast({
        html: "Cadastrado com Sucesso, entraremos em contato!",
        classes: "rounded green accent-3"
      });
      instance.close();
      console.log(response);
      socio = [];
    })
    .catch(function(error) {
      console.log(error);
    });
}

function cadastrarNegocio() {
  var elem = $("#modalCadastroStartup");
  var instance = M.Modal.getInstance(elem);

  var endereco = {
    cidade: $("#Endcidade").val(),
    rua: $("#Endrua").val(),
    numero: $("#Endnumero").val()
  };
  var data = {
    nome: $("#nome").val(),
    ramo: $("#ramo").val(),
    temEmpresa: $("#inputEhEmpresa").is(":checked"),
    email: $("#cadEmpresaEmail").val(),
    telefone: $("#cadEmpresaTelefone").val(),
    socio: socio,
    endereco: endereco
  };

  console.log(data);
  
  axios
    .post(url + "startup", data)
    .then(function(response) {
      M.toast({
        html: "Cadastrado com Sucesso, entraremos em contato!",
        classes: "rounded green accent-3"
      });
      instance.close();
      console.log(response);
      socio = [];
    })
    .catch(function(error) {
      console.log(error);
    });
}
