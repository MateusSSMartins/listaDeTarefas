// Selecionando os elementos principais
const inputAddLista = document.querySelector('.input-add-lista');
const buttonAddLista = document.querySelector('.btn-add-lista');
const container = document.querySelector('.container');

// Variável para armazenar as listas de tarefas
let myBox = [];

// Função para carregar as listas e tarefas do localStorage
function carregarListas() {
    const tarefasLocal = localStorage.getItem('tarefas');
    if (tarefasLocal) {
        myBox = JSON.parse(tarefasLocal);
    }
    renderizarListas();
}

// Função para salvar as listas no localStorage
function salvarListas() {
    localStorage.setItem('tarefas', JSON.stringify(myBox));
}

// Função para adicionar uma nova lista
function adicionarLista() {
    const nomeLista = inputAddLista.value.trim();
    if (nomeLista === "") return; // Se o campo estiver vazio, não adicionar

    myBox.push({
        nome: nomeLista,
        tarefas: []
    });

    inputAddLista.value = ''; // Limpar o campo de entrada
    salvarListas();
    renderizarListas();
}

// Função para adicionar uma tarefa a uma lista
function adicionarTarefa(indexBox) {
    const inputTarefa = document.querySelectorAll('.input-tarefa')[indexBox];
    const tarefaValue = inputTarefa.value.trim();

    if (tarefaValue === "") return; // Não adiciona tarefa vazia

    myBox[indexBox].tarefas.push({
        descricao: tarefaValue,
        concluida: false
    });

    inputTarefa.value = ''; // Limpar o campo de entrada
    salvarListas();
    renderizarListas();
}

// Função para finalizar uma tarefa (marcar como concluída)
function finalizarTarefa(indexBox, indexTarefa) {
    myBox[indexBox].tarefas[indexTarefa].concluida = !myBox[indexBox].tarefas[indexTarefa].concluida;
    salvarListas();
    renderizarListas();
}

// Função para excluir uma tarefa
function excluirTarefa(indexBox, indexTarefa) {
    myBox[indexBox].tarefas.splice(indexTarefa, 1);
    salvarListas();
    renderizarListas();
}

// Função para excluir uma lista inteira
function excluirLista(indexBox) {
    myBox.splice(indexBox, 1);
    salvarListas();
    renderizarListas();
}

// Função para renderizar as listas e suas tarefas
function renderizarListas() {
    container.innerHTML = ''; // Limpa a área de exibição

    myBox.forEach((box, indexBox) => {
        // Criando a estrutura HTML da lista
        let listaHTML = `
            <div class="box">
                <h1>${box.nome} <img class="apagarBox" src="./img/apagar.png" alt="Apagar" onclick="excluirLista(${indexBox})"></h1>
                <input class="input-tarefa" placeholder="Adicionar tarefa...">
                <button class="btn-add-tarefa" onclick="adicionarTarefa(${indexBox})">Adicionar</button>
                <ul class="lista-de-tarefas">
        `;

        // Adicionando as tarefas
        box.tarefas.forEach((tarefa, indexTarefa) => {
            listaHTML += `
                <li class="tarefa ${tarefa.concluida ? 'feita' : ''}">
                    <img src="./img/concluir.png" alt="Concluir" onclick="finalizarTarefa(${indexBox}, ${indexTarefa})">
                    <p>${tarefa.descricao}</p>
                    <img class="apagarTarefa" src="./img/apagar.png" alt="Apagar" onclick="excluirTarefa(${indexBox}, ${indexTarefa})">
                </li>
            `;
        });

        listaHTML += `</ul></div>`;
        container.innerHTML += listaHTML; // Adiciona a lista na página
    });
}

// Evento para adicionar uma nova lista ao clicar no botão
buttonAddLista.addEventListener('click', adicionarLista);

// Carregar as listas ao carregar a página
carregarListas();
