import { getUsers, setUsers } from "./Usuarios.js";
// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
  $("#msg").html('<div class="alert alert-warning">' + msg + "</div>");
}

function insertContato(contato) {
  const usuarios = getUsers();

  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
  let novoId = usuarios.length + 1;
  if (!usuarios) {
    novoId = 1;
  }

  let novoContato = {
    id: novoId,
    nome: contato.nome,
    email: contato.email,
    telefone: contato.telefone,
    senha: contato.senha,
    cpf: contato.cpf,
    cep: contato.cep,
  };

  // Insere o usuario e atualiza o localstorage
  usuarios.push(novoContato);
  setUsers(usuarios);
  displayMessage("Cadastro inserido com sucesso");
}

function updateContato(id, usuarioAtualizado) {
  const usuarios = getUsers();

  // list de usuarios com usuario que tem o mesmo id alterado
  const usuariosAtualizados = usuarios.map((usuario) => {
    if (usuario.id == id) {
      return usuarioAtualizado;
    }
    return usuario;
  });

  displayMessage("Contato alterado com sucesso");

  // Atualiza os dados no Local Storage
  setUsers(usuariosAtualizados);
}

function deleteContato(id) {
  const usuarios = getUsers();

  // Filtra o array removendo o elemento com o id passado
  const novoUsuarios = usuarios.filter(function (element) {
    return element.id != id;
  });

  displayMessage("Contato removido com sucesso");

  // Atualiza os dados no Local Storage
  setUsers(novoUsuarios);
}

function exibeContatos() {
  const usuarios = getUsers();

  // Remove todas as linhas do corpo da tabela
  $("#table-contatos").html("");

  // Popula a tabela com os registros do banco de dados
  for (let i = 0; i < usuarios.length; i++) {
    let contato = usuarios[i];
    $("#table-contatos").append(`<tr><td scope="row">${contato.id}</td>
                                                <td>${contato.nome}</td>
                                                <td>${contato.email}</td>
                                                <td>${contato.senha}</td>
                                                <td>${contato.cpf}</td>
                                                <td>${contato.cep}</td>
                                            </tr>`);
  }
}

function init() {
  // Adiciona funções para tratar os eventos
  $("#btnInsert").click(function () {
    // Verfica se o formulário está preenchido corretamente
    if (!$("#form-contato")[0].checkValidity()) {
      displayMessage("Preencha o formulário corretamente.");
      return;
    }

    // Obtem os valores dos campos do formulário
    let campoNome = $("#inputNome").val();
    let campoEmail = $("#inputEmail").val();
    let campoSenha = $("#inputSenha").val();
    let campoCpf = $("#inputCpf").val();
    let campoCep = $("#inputCep").val();
    let contato = {
      nome: campoNome,
      email: campoEmail,
      senha: campoSenha,
      cpf: campoCpf,
      cep: campoCep,
    };

    insertContato(contato);

    // Reexibe os contatos
    exibeContatos();

    // Limpa o formulario
    $("#form-contato")[0].reset();
  });

  // Intercepta o click do botão Alterar
  $("#btnUpdate").click(function () {
    // Obtem os valores dos campos do formulário
    let campoId = $("#inputId").val();
    if (campoId == "") {
      displayMessage("Selecione um contato para ser alterado.");
      return;
    }
    let campoNome = $("#inputNome").val();
    let campoTelefone = $("#inputTelefone").val();
    let campoEmail = $("#inputEmail").val();
    let campoSenha = $("#inputSenha").val();
    let campoCpf = $("#inputCpf").val();
    let campoCep = $("#inputCep").val();
    let usuarioAtualizado = {
      id: campoId,
      nome: campoNome,
      telefone: campoTelefone,
      email: campoEmail,
      senha: campoSenha,
      cpf: campoCpf,
      cep: campoCep,
    };

    updateContato(campoId, usuarioAtualizado);

    // Reexibe os contatos
    exibeContatos();

    // Limpa o formulario
    $("#form-contato")[0].reset();
  });

  // Intercepta o click do botão Excluir
  $("#btnDelete").click(function () {
    let campoId = $("#inputId").val();
    if (campoId == "") {
      displayMessage("Selecione um contato a ser excluído.");
      return;
    }

    deleteContato(campoId);

    // Reexibe os contatos
    exibeContatos();

    // Limpa o formulario
    $("#form-contato")[0].reset();
  });

  // Oculta a mensagem de aviso após alguns segundos
  $("#msg").bind("DOMSubtreeModified", function () {
    window.setTimeout(function () {
      $(".alert")
        .fadeTo(500, 0)
        .slideUp(500, function () {
          $(this).remove();
        });
    }, 5000);
  });

  // Preenche o formulário quando o usuario clicar em uma linha da tabela
  $("#grid-contatos").on("click", "tr", function (e) {
    let linhaContato = this;
    let colunas = linhaContato.querySelectorAll("td");

    $("#inputId").val(colunas[0].innerText);
    $("#inputNome").val(colunas[1].innerText);
    $("#inputEmail").val(colunas[2].innerText);
    $("#inputSenha").val(colunas[3].innerText);
    $("#inputCpf").val(colunas[4].innerText);
    $("#inputCep").val(colunas[5].innerText);
  });

  exibeContatos();
}

(() => {
  init();
})();
