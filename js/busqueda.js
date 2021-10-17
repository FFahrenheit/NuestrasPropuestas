const searchTitle = document.getElementById('search-title');

window.onload = () =>{
    const queryString = window.location.search;
    console.log(queryString);

    if(queryString == ''){
        searchTitle.innerHTML = 'Propuestas del congreso: ';
        //No hay query, mostrar default
    }else{

        const urlParams = new URLSearchParams(queryString);
        let keywords = urlParams.get('busqueda');

        searchTitle.innerHTML = `Búsqueda de propuestas con respecto a "${ keywords }:"`;
        
        searchInput.value = keywords;
        searchWithKeywords(keywords);
    }
}

function searchWithKeywords(keywords){
    console.log(keywords);
    fetch('js/tests/propuestas.json')
    .then(res => res.json())
    .then(data =>{
        console.log("aqui llega js");
        console.log(data);
    })
    .catch(error=>{
        console.log(error);
    });
}