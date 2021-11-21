
const searchTitle = document.getElementById('search-title');
const propuestas = document.getElementById('propuestas');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let listaPropuestas;

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('submit', handleSearch);

function handleSearch(e) {
    e.preventDefault();
    let searchQuery = searchInput.value;
    console.log(encodeURIComponent(searchQuery));
    if (searchQuery.length > 0) {
        searchQuery = encodeURIComponent(searchQuery);
        window.location.assign('dashboard.html?busqueda=' + searchQuery);
    } else {
        window.location.assign('dashboard.html');
    }
}

window.onload = () => {
    const queryString = window.location.search;
    console.log({ queryString });

    if (queryString == '') {
        searchTitle.innerHTML = 'Propuestas del congreso: ';
        searchWithKeywords('');
    } else {

        const urlParams = new URLSearchParams(queryString);
        let keywords = urlParams.get('busqueda');

        searchTitle.innerHTML = `Búsqueda de propuestas con respecto a "${keywords}": `;

        searchInput.value = keywords;
        searchWithKeywords(keywords);
    }
}

function searchWithKeywords(keywords) {
    console.log({ keywords });
    fetch('http://127.0.0.1:5000/api/v0/propuestas/' + keywords, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generateCards(data['propuestas']);
    })
    .catch(error => {
        console.log(error);
    });
}

function generateCards(data) {
    propuestas.innerHTML = '';
    listaPropuestas = data;
    data.forEach((d, index) => {
        let html = `
        <div class="card m-3">
            <div class="card-body">
                <h5 class="card-title">${ d.titulo }</h5>
                <h6 class="card-subtitle text-muted">
                    <i class="fas fa-user-alt mx-3"></i> ${ d.autor }
                    <i class="fas fa-clock mx-3"></i> ${ d.fecha.substring(0, getPosition(d.fecha, ' ', 4)) }
                    <i class="fas fa-vote-yea mx-3"></i> ${ d.partido }
                </h6>
                <p class="card-text my-1">
                    ${ d.extracto.substring(0, 1024) } [...]
                </p>
                <a href="nueva.html?id=${ d.id }" class="btn btn-primary card-link">
                    Modificar detalles
                </a>
                <a onclick="deletePropuesta(${ d.id }, ${ index })" class="btn btn-danger card-link text-light" style="cursor:pointer;">
                    Eliminar propuesta
                </a>
            </div>
        </div>`;
        propuestas.innerHTML += html;
    });
}

function deletePropuesta(id, index) {
    const p = listaPropuestas[index];
    if (confirm(`¿Desea eliminar la propuesta con ID ${id} titulada "${p.titulo}"`)) {
        fetch('http://127.0.0.1:5000/api/v0/propuesta/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(resp => {
            if (resp['code'] == 'ok') {
                alert('Propuesta eliminada');
            } else {
                alert('La propuesta ya no existe');
            }
            listaPropuestas.splice(index, 1);
            generateCards(listaPropuestas);
        })
        .catch(error => {
            alert('Error de servidor');
        });
    }
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}