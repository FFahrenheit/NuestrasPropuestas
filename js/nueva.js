const title = document.getElementById('h-titulo');
const form = document.getElementById('form');

const propuesta = {
    titulo: document.getElementById('titulo'),
    contenido: document.getElementById('contenido'),
    estado: document.getElementById('estado'),
    fecha: document.getElementById('fecha'),
    partido: document.getElementById('partido'),
    autor: document.getElementById('autor'),
}

window.onload = () => {
    const queryString = window.location.search;
    console.log(queryString);

    if(queryString == ''){
        title.innerHTML = 'Subir propuesta';
    }else{

        const urlParams = new URLSearchParams(queryString);
        let id = urlParams.get('id');

        title.innerHTML = `Editar propuesta #${ id }: `;        

        loadInfo(id);
    }
}


function loadInfo(id){
    fetch('../js/tests/propuestas.json')
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
    console.log(propuesta.titulo);
    propuesta.titulo.value = data.titulo;
    propuesta.contenido.value = data.contenido;
    propuesta.estado.value = data.estado || 'No disponible';
    propuesta.partido.value = data.partido;
    propuesta.fecha.value = data.fecha;
    propuesta.autor.value = data.autor;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(confirm('¿Desea guardar los cambios hechos?')){
        console.log('Ok!');
    }
})