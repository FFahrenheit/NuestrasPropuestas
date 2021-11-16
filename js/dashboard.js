
const searchTitle = document.getElementById('search-title');
const propuestas = document.getElementById('propuestas');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('submit', handleSearch);

function handleSearch(e){
    e.preventDefault();
    let searchQuery = searchInput.value;
    console.log(encodeURIComponent(searchQuery));
    if(searchQuery.length > 0){
        searchQuery = encodeURIComponent(searchQuery);
        window.location.assign('dashboard.html?busqueda=' + searchQuery);
    }else{
        window.location.assign('dashboard.html');
    }
}

window.onload = () =>{
    const queryString = window.location.search;
    console.log({ queryString });

    if(queryString == ''){
        searchTitle.innerHTML = 'Propuestas del congreso: ';
        searchWithKeywords('');
    }else{

        const urlParams = new URLSearchParams(queryString);
        let keywords = urlParams.get('busqueda');

        searchTitle.innerHTML = `Búsqueda de propuestas con respecto a "${ keywords }": `;
        
        searchInput.value = keywords;
        searchWithKeywords(keywords);
    }
}

function searchWithKeywords(keywords){
    console.log({ keywords });
    fetch('../js/tests/propuestas.json')
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        generateCards(data);
    })
    .catch(error=>{
        console.log(error);
    });
}

function generateCards(data){
    propuestas.innerHTML = '';
    data.forEach(d =>{
        let html = `
        <div class="card m-3">
            <div class="card-body">
                <h5 class="card-title">${ d.titulo }</h5>
                <h6 class="card-subtitle text-muted">
                    <i class="fas fa-user-alt mx-3"></i> ${ d.autor }
                    <i class="fas fa-clock mx-3"></i> ${ d.fecha }
                    <i class="fas fa-vote-yea mx-3"></i> ${ d.partido }
                </h6>
                <p class="card-text my-1">
                    ${ d.contenido }
                </p>
                <a href="nueva.html?id=${ d.id }" class="btn btn-primary card-link">
                    Modificar detalles
                </a>
                <a onclick="deletePropuesta(${ d.id })" class="btn btn-danger card-link text-light" style="cursor:pointer;">
                    Eliminar propuesta
                </a>
            </div>
        </div>`;
        propuestas.innerHTML += html;
    });
}

function deletePropuesta(id){
    if(confirm('¿Desea eliminar la propuesta con ID ' + id +'?')){
        console.log('Eliminado');
    }else{
        console.log('No eliminado');
    }
}