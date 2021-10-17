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
        console.log(keywords);

        searchTitle.innerHTML = `Búsqueda de propuestas con respecto a "${ keywords }:"`;
        
        searchInput.value = keywords;
    }
}