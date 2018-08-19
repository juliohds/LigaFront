$(document).ready(function() {
     
    setDinamic();
 
    $("#btnCadastrarUsuario").click(function() {
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
    });

});

function logout(){
     // Armazenar
     localStorage.setItem("id", "");
     localStorage.setItem("nome", "");
     localStorage.setItem("email", "");

     $("#btnLogin").show();
     $("#btnLogout").hide();

}  

function setDinamic(){
    $("#txtInicio").html(localStorage.getItem("nome") ? "Seja Bem Vindo! "+localStorage.getItem("nome") : "Seja Bem Vindo!");
}