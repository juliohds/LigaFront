$(document).ready(function() {
  socio = [];

  $(".sidenav").sidenav();
  $(".modal").modal();
  $('select').formSelect();
  $('.tabs').tabs();
  carregarSelectMentor();

  carregarTabs();

  $("#btnCadStartup").click(function() {
    if (
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") == null
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
      localStorage.getItem("id") == null
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
    carregarTabs();
  });

  $("#btnCadastrarNegocio1").click(function() {
    cadastrarNegocioBigEmpresa();
    carregarTabs();
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

function carregarSelectMentor() {

  var elem = $("#mentores");
  var instance = M.FormSelect.getInstance(elem);
  
  axios
    .get(url + "mentor")
    .then(function(response) {
      console.log(response);
      response.data.map(mentor =>{
        $("#mentores").append(
          "<option value="+mentor.id+">"+(mentor.tipo?mentor.tipo:'VAZIO')+"</option>"
          )
        });
    })
    .catch(function(error) {
      console.log(error);
    });
    
}

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
    endereco: endereco,
    mentor: mentor
  };

  if($("#mentores").val() != null){ 
    var mentor = {
      id: $("#mentores").val()
    }
    data.mentor = mentor;
  }

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

function carregarTabs(){
  carregarStartups();
  carregarUsers();
  carregarSocios();
  carregarGe();
}

function carregarSocios(){
  axios
    .get(url + "socio")
    .then(function(response) {
      console.log(response);
      response.data.map(startup =>{
        $("#tabelaSocios").append(
          "<tr>"+
          "<td>"+startup.id+"</td>"+
          "<td>"+startup.nome+"</td>"+
          "<td>"+((startup.startup != null)? startup.startup.nome: "Nome não Informado")+"</td>"+
          "<td>"+((startup.startup != null)? startup.startup.ramo: "Area não Informada")+"</td>"+
          "</tr>"
        )
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function carregarUsers(){
  axios
    .get(url + "user")
    .then(function(response) {
      console.log(response);
      response.data.map(startup =>{
        $("#tabelaUsers").append(
          "<tr>"+
          "<td>"+startup.id+"</td>"+
          "<td>"+startup.nome+"</td>"+
          "<td>"+startup.email+"</td>"+
          "</tr>"
        )
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function carregarGe(){
  axios
    .get(url + "grande-empresa")
    .then(function(response) {
      console.log(response);
      response.data.map(startup =>{
        $("#tabelaGe").append(
          "<tr>"+
          "<td>"+startup.nome+"</td>"+
          "<td>"+startup.ramo+"</td>"+
          "<td>"+startup.telefone+"</td>"+
          "<td>"+startup.email+"</td>"+
          "</tr>"
        )
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function carregarStartups(){
  axios
    .get(url + "startup")
    .then(function(response) {
      console.log(response);
      response.data.map(startup =>{
        $("#tabelaStartup").append(
          "<tr>"+
          "<td>"+startup.nome+"</td>"+
          "<td>"+startup.ramo+"</td>"+
          "<td>"+startup.telefone+"</td>"+
          "<td>"+startup.email+"</td>"+
          "<td>"+(startup.temEmpresa==true?'Sim':'Não')+"</td>"+
          "</tr>"
        )
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}