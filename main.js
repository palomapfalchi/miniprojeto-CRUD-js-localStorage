'use strict'
//MODAL É A CAIXINHA DE CADASTRAR CLIENTE

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

//INFORMACOES DO FORMULARIO (variavel com array)
const tempClient = {
    nome: "naa",
    email: "ana@hotmail.com",
    celular: "(11)99999-9988",
    cidade: "São Roque"
}
//CRUD - Create Read Update Delete    

//CREATE
const createClient = (client) => {
    //pega o que ta em localstorage (bd), transforma em JSON e armazena em db_client
    const db_client = JSON.parse(localStorage.getItem("db_client"))
    //adiciona mais 1 client (createClient(tempClient))
    db_client.push(client)
    //manda o novo cliente para o localstorage(db) 
    localStorage.setItem("db_client", JSON.stringify(db_client))
}

//EVENTOS

//QUANDO CLICA EM CADASTRAR CLIENTE, ABRE A CAIXINHA MODAL
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
//QUANDO CLICA NO "X", FECHA A CAIXINHA MODAL
document.getElementById('modalClose')
    .addEventListener('click', closeModal)