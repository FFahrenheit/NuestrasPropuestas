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
    fetch('js/tests/propuestas.json')
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        renderInfo(data[id - 1]); //La posición id - 1 
    })
    .catch(error=>{
        console.log(error);
    });
}

function renderInfo(data){
    console.log(data);
    propuesta.titulo.innerHTML = data.titulo;
    propuesta.contenido.innerHTML = data.contenido;
    propuesta.partido.innerHTML = data.partido;
    propuesta.fecha.innerHTML = data.fecha;
    propuesta.autor.innerHTML = data.autor;
    propuesta.link.href = 'assets/tests/propuesta-test.pdf'
    propuesta.link.target = '_blank';
}