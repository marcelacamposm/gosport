import { getUsers, usuariosIniciais, setUsers } from "./Usuarios.js";
import { eventosIniciais, getEventos, setEventos } from "./eventos.js";

export function initLoginApp() {
  var usuarios = getUsers();
  var eventos = getEventos();

  if (usuarios.length === 0) {
    console.log(
      "Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial."
    );
    setUsers(usuariosIniciais);
  }

  if (eventos.length === 0) {
    console.log(
      "Dados de eventos não encontrados no localStorage. \n -----> Fazendo carga inicial."
    );
    setEventos(eventosIniciais);
  }
}

initLoginApp()