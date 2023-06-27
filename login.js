import { getUsers, setUsuarioCorrente, setUsers } from "./Usuarios.js";
import { initLoginApp } from "./initialLoad.js";

const LOGIN_URL = "login.html";

function loginUser(email, senha) {
  const usuarios = getUsers();

  for (var i = 0; i < usuarios.length; i++) {
    var usuario = usuarios[i];

    if (email == usuario.email && senha == usuario.senha) {
      setUsuarioCorrente(usuario);
      return true;
    }
  }

  return false;
}

// Declara uma função para processar o formulário de login
function processaFormLogin(event) {
  // Cancela a submissão do formulário para tratar sem fazer refresh da tela
  event.preventDefault();

  // Obtem os dados de login e senha a partir do formulário de login
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Valida login e se estiver ok, redireciona para tela inicial da aplicação
  const resultadoLogin = loginUser(email, password);
  if (resultadoLogin) {
    window.location.href = "index.html";
  } else {
    // Se login falhou, avisa ao usuário
    alert("Usuário ou senha incorretos");
  }
}

function logoutUser() {
  sessionStorage.removeItem("usuarioCorrente");
  window.location = LOGIN_URL;
  window.location.reload();
}

initLoginApp();

document
  .getElementById("login-form")
  .addEventListener("submit", processaFormLogin);
