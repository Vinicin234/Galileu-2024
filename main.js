import { data } from './data.js';

//Para pegar o elemento na tela
const container = document.getElementById('elemento-pai');
const header = document.getElementById('header');


//Função para criar o HTML de um card
function createCard(item) {

    return `<div class="card_ponto_turistico">
<div class="card_imagem">

    <img src="${item.imagem}"  alt="${item.titulo}">
</div>
<div class="card_detalhes">
    <div class="categorias"> 
    ${item.categorias.map(cat => `<span>${cat}</span>`).join('')}
    </div>
     <h1 class="titulo">${item.titulo}</h1>
    <p>${item.descricao}</p>
</div>
</div>`
}



// container.innerHTML += createCard(data[0]);
// container.innerHTML += createCard(data[1]);
// container.innerHTML += createCard(data[2]);
// container.innerHTML += createCard(data[3]);

function renderCards(data) {
    const cards = data.map(createCard).join('');
    container.innerHTML = cards;

}


function createheadercategories(data) {
    const categoriasUnicas = ['Todas', ...new Set(data.flatMap(item => item.categorias))];
    const categoriasHTML = categoriasUnicas.map(cat => `<button class="categorias-btn">${cat}</button>`).join('');
    header.innerHTML = categoriasHTML;

    const buttons = document.querySelectorAll('.categorias-btn');

    console.log(buttons)

    buttons.forEach((button, index) => {
        if (index === 0) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {

            const categoriasSelecionada = button.textContent;

            filtrarcategorias(categoriasSelecionada);
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

        });
    });
}


function filtrarcategorias(categoria) {
    if (categoria === 'Todas') {
        renderCards(data);
    } else {
        const filteredData = data.filter(item => item.categorias.includes(categoria));
        renderCards(filteredData);
    }
}





renderCards(data);
createheadercategories(data);

