const dbEvento = "dbEvento";

export const eventosIniciais = [
  {
    id: 1,
    esporte: "Futebol",
    quantidadeMax: "10",
    quantidadeMin: "5",
    preco: "10",
    local: "Belo Horizonte",
    sexo: "feminino",
  }
]

export function getEventos() {
  return JSON.parse(localStorage.getItem(dbEvento)) || [];
}

export function setEventos(eventos) {
  return localStorage.setItem(dbEvento, JSON.stringify(eventos));
}

// Exibe mensagem em um elemento de ID msg
export function displayMessage(msg) {
  $("#msg").html('<div class="alert alert-warning">' + msg + "</div>");
}

export function insertEvento(evento) {
  const eventos = getEventos();
  // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
  let novoId = 1;
  if (eventos.length != 0) novoId = eventos[eventos.length - 1].id + 1;
  let NewEvent = {
    id: novoId,
    esporte: evento.esporte,
    quantidadeMax: evento.quantidadeMax,
    quantidadeMin: evento.quantidadeMin,
    preco: evento.preco,
    local: evento.local,
    sexo: evento.sexo,
  };

  // Insere o novo objeto no array
  eventos.push(NewEvent);
  displayMessage("Evento inserido com sucesso");

  // Atualiza os dados no Local Storage
  setEventos(eventos);
}

export function updateEvento(id, evento) {
  const eventos = getEventos();

  // Localiza o indice do objeto a ser alterado no array a partir do seu ID
  let index = eventos.map((obj) => obj.id).indexOf(id);

  // Altera os dados do objeto no array
  (eventos[index].esporte = evento.esporte),
    (eventos[index].quantidadeMax = evento.quantidadeMax),
    (eventos[index].quantidadeMin = evento.quantidadeMin),
    (eventos[index].preco = evento.preco),
    (eventos[index].local = evento.local),
    (eventos[index].sexo = evento.sexo);

  displayMessage("Evento alterado com sucesso");

  // Atualiza os dados no Local Storage
  setEventos(eventos);
}

export function deleteEvento(id) {
  let eventos = getEventos();

  // Filtra o array removendo o elemento com o id passado
  eventos = eventos.filter(function (element) {
    return element.id != id;
  });

  displayMessage("Evento removido com sucesso");

  // Atualiza os dados no Local Storage
  setEventos(eventos);
}
