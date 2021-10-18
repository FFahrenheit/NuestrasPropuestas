const searchTitle = document.getElementById('search-title');
const propuestas = document.getElementById('propuestas');

window.onload = () =>{
    const queryString = window.location.search;
    console.log(queryString);

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
    console.log(keywords);
    fetch('js/tests/propuestas.json')
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
                <a href="propuesta.html?id=${ d.id }" class="card-link text-danger">
                    Ver detalles
                </a>
            </div>
        </div>`;
        propuestas.innerHTML += html;
    });
}