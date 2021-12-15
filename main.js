'use strict'
//MODAL É A CAIXINHA DE CADASTRAR CLIENTE

/*____________________PARTE 1_______________________________________*/

//FUNCAO ABRIR CAIXINHA
const openModal = () => document.getElementById('modal')
    .classList.add('active')

//FUNCAO FECHAR CAIXINHA
const closeModal = () => {
    clearFields() //limpa
    document.getElementById('modal').classList.remove('active') //fecha
}

/*____________________PARTE 2 _______________________________________*/

//pega o que ta em localstorage (bd), transforma em JSON e armazena em db_client
//SE FOR NULO, SE NÃO TIVER NADA NO BD. RETORNA ARRAY VAZIO
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []

//manda o novo cliente para o localstorage(db) 
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

/*____________________PARTE 3 _______________________________________*/

//CRUD - Create Read Update deleteCliente    

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

//CRUD - deleteClientE
const deleteClient = (index) => {
    const dbClient = readClient()
    // Slice (fatiar) -> posição (index) e coloca 1 pra excluir "1 linha"
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//PEGA O FORM E VERIFICA SE TODOS CAMPOS SEGUEM REGRAS DO HTML
const isValidFields = () => {
    return document.getElementById("form").reportValidity()
}

/*____________________PARTE 4 _______________________________________*/

//INTERAÇÃO COM O USUARIO

//FUNCAO LIMPAR CAMPOS
const clearFields = () => {
    const fields = document.querySelectorAll(".modal-field")
    //ForEach(verifica todos os campos) e deixa o valor vazio
    fields.forEach(field => field.value = "") 
}

//FUNCAO SALVAR CLIENTE
const saveClient = () => {
    //SE INFORMACOES DOS CAMPOS NO HTML FOREM VALIDAS
    if (isValidFields()) {
        //CLIENTE VAI RECEBER AS SEGUINTES INFORMACOES
        const client = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value
        }

        const index = document.getElementById("nome").dataset.index

        //SE FOR UM NOVO CLIENTE
        if (index == "new") {
            
            //CLICA EM CRIAR CLIENTE
            createClient(client)
            //ATUALIZA A TABELA COM OS DADOS ATUALIZADOS DO CLIENTE
            updateTable()
            //FECHA A CAIXINHA
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

//CRIAR LINHA 
const createRow = (client, index) => {
    //CRIAR LINHA VAZIA (TR)
    const newRow = document.createElement("tr")
    //INFORMACOES DA LINHA
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" >editar</button>
        <button type="button" class="button red" id="deleteCliente-${index}">excluir</button>
    </td>
    `
    //SELECIONA OS DADOS E INSERE ELES NO TBODY COMO UM FILHO 
    document.querySelector("#tableClient>tbody").appendChild(newRow)
}

//LIMPAR TABELA
const clearTable = () => {
    //VARIAVEL ROWS (LINHAS) PEGA OS TR
    const rows = document.querySelectorAll("#tableClient>tbody tr") 
    //VERIFICA LINHA POR LINHA, E APAGA LINHA POR LINHA
    rows.forEach(row => row.parentNode.removeChild(row))
}

//ATUALIZAR TABELA
const updateTable = () => {
    //ler os dados do banco 
    const dbClient = readClient()
    clearTable()
    //cada cliente do banco vai ser lido e armazenado em uma linha
    dbClient.forEach(createRow)
}

//FUNCAO PREENCHER OS CAMPOS COM AS INFORMACOES DISPONIVEIS DO CLIENTE
const fillFields = (client) => {
    document.getElementById("nome").value = client.nome
    document.getElementById("email").value = client.email
    document.getElementById("celular").value = client.celular
    document.getElementById("cidade").value = client.cidade
    document.getElementById("nome").dataset.index = client.index
}

//FUNCAO PRA ABRIR AS INFORMACOES QUANDO EDITAR UM CLIENTE
const editClient = (index) => {
    //MOSTRA O CLIENTE QUE FOI CLICADO NO EDITAR
    const client = readClient()[index]
    client.index = index
    //PREENCHER CAMPOS
    fillFields(client)
    //ABRIR CAIXINHA
    openModal()
}

//BOTAO EDITAR, DELETAR ASSOCIADO A UM EVENTO
const editDelete = (event) => {
    //SE TIVER UM EVENTO DO TIPO BOTAO
    if (event.target.type == "button") {
        //ESCREVE UM EVENTO RELACIONADO A ID DOS BOTOES E O 
        //SPLIT MOSTRA A POSICAO JUNTO A FUNCAO DO BOTAO
        const [action, index] = event.target.id.split("-")

        //SE QUISER EDITAR
        if (action == "edit") {
            editClient(index)
            //SE QUISER DELETAR
        } else {
            //VAI LER O CLIENTE PELO INDEX
            const client = readClient()[index]
            //ABRE JANELA PEDINDO SE TEM CERTEZA QUE QUER DELETAR
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}?`)
            //SE RESPONSE É VERDADEIRA, DELETA
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}


//EVENTOS

//QUANDO CLICA EM CADASTRAR CLIENTE, ABRE A CAIXINHA MODAL
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
//QUANDO CLICA NO "X", FECHA A CAIXINHA MODAL
document.getElementById('modalClose')
    .addEventListener('click', closeModal)
//QUANDO CLICAR EM SALVAR, SALVA NOVO CLIENTE
document.getElementById("salvar")
    .addEventListener("click", saveClient)
//QUANDO CLICA EM EDITAR, DELETAR
document.querySelector("#tableClient>tbody")
    .addEventListener("click", editDelete)