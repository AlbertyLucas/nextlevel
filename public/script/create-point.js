

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then( res => res.json() )
    .then( state => {

        for( state of state ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text




    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( city => {
        for( city of city ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}




 document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// itens de coleta
// buscar os li's
const itemsCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")


let selectedItems = []

function handleSelectedItem() {
    // add or remove whith javascript
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log("ITEM ID: ", itemId)



    // verificar se tem itens selecionados, se sim
    // pegar os itens selecionados


    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso é para true or false 
        return itemFound
    })

    //  se já estiver selecionado
    if( alredySelected >= 0 ) {
        // tirar/add da seleção

        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    }else {

        // se não estiver selecionado adicionar a seleção.
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os itens selecionados 
    collectedItems.value = selectedItems

}

// verificar se existem itens selecionados 
// se sim pegar os selecionados

// se já estiver selecionado retirar da seleção

// se não estiver selecionado adicionar a seleção

// atualizar o campo escondido com os itens selecionados

