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

//pega o que ta em localstorage (bd), transforma em JSON e armazena em db_client
//SE FOR NULO, SE NÃO TIVER NADA NO BD. RETORNA ARRAY VAZIO
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []

//manda o novo cliente para o localstorage(db) 
const setLocalStorage = (novoClient) => localStorage.setItem("db_client", JSON.stringify(novoClient))

//CRUD - Create Read Update Delete    

//CRUD - CREATE
const createClient = (client) => {
    const novoClient = getLocalStorage()
    //adiciona mais 1 client (createClient(tempClient))
    novoClient.push(client)
    setLocalStorage(novoClient)
}

//CRUD - READ
const readClient =  () => getLocalStorage();



//EVENTOS

//QUANDO CLICA EM CADASTRAR CLIENTE, ABRE A CAIXINHA MODAL
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
//QUANDO CLICA NO "X", FECHA A CAIXINHA MODAL
document.getElementById('modalClose')
    .addEventListener('click', closeModal)