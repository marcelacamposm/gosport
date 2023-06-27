const dbUsuarios = "db_usuarios";
const dbUsuarioCorrente = "usuarioCorrente";

function generateUUID() {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const usuariosIniciais = [
  {
    id: generateUUID(),
    senha: "123",
    nome: "Administrador do Sistema",
    email: "admin@abc.com",
    cpf: 12345678,
    cep: 12345678,
  },
  {
    id: generateUUID(),
    senha: "123",
    nome: "Usuario Comum",
    email: "user@abc.com",
    cpf: 12345678,
    cep: 12345678,
  },
];

export function getUsers() {
  return JSON.parse(localStorage.getItem(dbUsuarios)) || [];
}

export function setUsers(usuarios) {
  return localStorage.setItem(dbUsuarios, JSON.stringify(usuarios));
}

export function getUsuarioCorrente() {
  return (
    JSON.parse(
      (usuarioCorrenteJSON = sessionStorage.getItem(dbUsuarioCorrente))
    ) || null
  );
}

export function setUsuarioCorrente(usuario) {
  sessionStorage.setItem(dbUsuarioCorrente, JSON.stringify(usuario));

  return true;
}
