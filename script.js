const button = document.querySelector('.btn-add-tarefa');
const input = document.querySelector('.input-tarefa');
const listaDeTarefas = document.querySelector('.lista-de-tarefas');



let minhaLista = [];

function addTarefa() {
    minhaLista.push({
        tarefa: input.value,
        concluida: false
    });
    

    verTarefa();
    input.value = '';
    
}
function verTarefa(){
    
let novaLista = '';
minhaLista.forEach((item, index) =>{
   
    novaLista += `    <li class="tarefa ${item.concluida && "feita"}">
    <img  src="./img/concluir.png" alt="Concluir" onclick="finalizarTarefa(${index})">
    <p>${item.tarefa}</p>
    <img src="./img/apagar.png" alt="Apagar" onclick="deletar(${index})" >
</li>
`

});

listaDeTarefas.innerHTML = novaLista

localStorage.setItem('lista', JSON.stringify(minhaLista))
}
function finalizarTarefa(index){
    minhaLista[index].concluida = ! minhaLista[index].concluida

    verTarefa();
}

function deletar(index){
    minhaLista.splice(index, 1)
    verTarefa();
}

function recarregarLista(){
    const tarfasLocal = localStorage.getItem('lista')
    if(tarfasLocal){
    minhaLista = JSON.parse(tarfasLocal)
    }
  
    verTarefa()
}
recarregarLista()
button.addEventListener('click', addTarefa)