const propuesta = {
    titulo: document.getElementById('p-titulo'),
    contenido: document.getElementById('p-contenido'),
    fecha: document.getElementById('p-fecha'),
    partido: document.getElementById('p-partido'),
    autor: document.getElementById('p-autor'),
    link: document.getElementById('p-descarga')
}

window.onload = () =>{
    const queryString = window.location.search;
    console.log(queryString);

    if(queryString == ''){
        window.location.assign('busqueda.html');
    }else{
        const urlParams = new URLSearchParams(queryString);
        let id = urlParams.get('id');
        loadInfo(id);
    }
}

function loadInfo(id){
    fetch('http://127.0.0.1:5000/api/v0/propuesta/' + id)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        if(data['propuesta']['id'] == id){
            renderInfo(data['propuesta']); //La posición id - 1 
        }else{
            alert('No se encontró la propuesta solicitada');
            window.location.assign('busqueda.html');
        }
    })
    .catch(error=>{
        console.log(error);
    });
}

function renderInfo(data){
    console.log(data);
    propuesta.titulo.innerHTML = data.titulo;
    propuesta.contenido.innerHTML = data.extracto + '[...]';
    propuesta.partido.innerHTML = data.partido;
    propuesta.fecha.innerHTML = data.fecha.substring(0, getPosition(data.fecha, ' ', 4));
    propuesta.autor.innerHTML = data.autor;
    propuesta.link.href = 'http://127.0.0.1:5000/api/v0/file/' + data.archivo;
    propuesta.link.target = '_blank';
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}