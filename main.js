'use strict'
//MODAL É A CAIXINHA DE CADASTRAR CLIENTE

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

//INFORMACOES DO FORMULARIO (variavel com array)
const tempClient = {
    nome: "nico",
    email: "ana@hotmail.com",
    celular: "(11)99999-9988",
    cidade: "São Roque"
}

//pega o que ta em localstorage (bd), transforma em JSON e armazena em db_client
//SE FOR NULO, SE NÃO TIVER NADA NO BD. RETORNA ARRAY VAZIO
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []

//manda o novo cliente para o localstorage(db) 
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//CRUD - Create Read Update Delete    

//CRUD - CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    //adiciona mais 1 client (createClient(tempClient))
    dbClient.push(client)
    setLocalStorage(dbClient)
}

//CRUD - READ
const readClient =  () => getLocalStorage()


//CRUD - UPDATE 
//atualização dos dados do cliente, localiza o cliente pelo index [0,1..]
const updateClient = (index, client) => {
    //para alterar os dados, precisa ler os dados do cliente
    const dbClient = readClient()
    //localiza qual é o cliente que vai ser alterado pelo index, e vai receber nvas informacoes client.
    dbClient[index] = client
    //localiza o banco de dados e envia as novas informacoes pra ele
    setLocalStorage(dbClient)
}

//CRUD - DELETE
const delet = (index) => {
    const dbClient = readClient()
    // Slice (fatiar) - posição (index) e coloca 1 pra excluir "1 linha"
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
} 

//EVENTOS

//QUANDO CLICA EM CADASTRAR CLIENTE, ABRE A CAIXINHA MODAL
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
//QUANDO CLICA NO "X", FECHA A CAIXINHA MODAL
document.getElementById('modalClose')
    .addEventListener('click', closeModal)