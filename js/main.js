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
        window.location.assign('busqueda.html?busqueda=' + searchQuery);
    }else{
        window.location.assign('busqueda.html');
    }
}