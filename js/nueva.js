const title = document.getElementById('h-titulo');
const form = document.getElementById('form');
const archivo = document.getElementById('archivo');
const fileStatus = document.getElementById('file_status');

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

    if (queryString == '') {
        title.innerHTML = 'Subir propuesta';
    } else {

        const urlParams = new URLSearchParams(queryString);
        let id = urlParams.get('id');

        title.innerHTML = `Editar propuesta #${id}: `;

        loadInfo(id);
    }
}


function loadInfo(id) {
    fetch('../js/tests/propuestas.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderInfo(data[id - 1]); //La posición id - 1 
        })
        .catch(error => {
            console.log(error);
        });
}

function renderInfo(data) {
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

    if (confirm('¿Desea guardar los cambios hechos?')) {
        console.log('Ok!');
    }
});

archivo.addEventListener('change', () => {
    const file = archivo.files[0];
    let data = new FormData();
    data.append('files[]', file);

    fileStatus.innerHTML = `
    <div class="spinner-border text-success loading" role="status">
        <span class="sr-only">Loading...</span>
    </div>`;

    fetch('http://127.0.0.1:5000/api/v0/admin/files', {
        method: 'POST',
        body: data
    }).then(res => res.json())
        .then(resp => {
            console.log(resp);
            if (resp['code'] == 'ok') {
                fileStatus.innerHTML = `<i class="fas fa-check-circle text-success"></i>`;
                form.contenido.value = resp['extract'] || 'N/A';
                form.contenido.scrollTop = form.contenido.scrollHeight;

            } else if (resp['code'] == 'fail') {
                alert('Lectura de archivo no completada');
                fileStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i>`;
            } else {
                alert('Error en el servidor');
                fileStatus.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i>`;
            }
        }).catch(error => {
            fileStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i>`;
            alert('No se pudo establecer conexión al servidor');
        })
});