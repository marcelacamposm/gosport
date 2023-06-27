import { getUsers, setUsers } from "./Usuarios.js";

function recuperarSenha() {
  const emailRequest = document.getElementById("input");
  const newSenhaRequest = document.getElementById("senha");
  const newSenhaConfirmaRequest = document.getElementById("senha2");

  if (
    emailRequest.value === "" ||
    newSenhaRequest.value === "" ||
    newSenhaConfirmaRequest.value === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  let users = getUsers();

  let result = users.filter((p) => p.email == emailRequest.value);

  if (result.length == 1) {
    if (newSenhaRequest.value == newSenhaConfirmaRequest.value) {
      var user = users.filter((u) => u.email == emailRequest.value);

      const index = users.map((u) => u.email).indexOf(user[0].email);

      result[0].senha = newSenhaRequest.value;

      users[index] = result[0];

      setUsers(users)
      alert("Senha atualizada com sucesso! Confira no console!");

      emailRequest.value = "";
      newSenhaRequest.value = "";
      newSenhaConfirmaRequest.value = "";
    } else {
      alert("senha sao diferentes!");
    }
  } else {
    alert("usuario não encontrado. Vai no json");
  }
}

document.querySelector("#recuperarSenha").addEventListener("click", (event) => {
  event.preventDefault();
  recuperarSenha();
});
