const title = document.getElementById('h-titulo');
const form = document.getElementById('form');
const archivo = document.getElementById('archivo');
const fileStatus = document.getElementById('file_status');
let pdfFile = '';

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

        const data = {
            titulo: propuesta.titulo.value,
            pdf: pdfFile,
            estado: propuesta.estado.value,
            partido: propuesta.partido.value,
            fecha: propuesta.fecha.value,
            autor: propuesta.autor.value,
            subido: localStorage.getItem('id'),
            extracto: propuesta.contenido.value
        }

        const body = JSON.stringify(data);

        console.log({ data });

        fetch('http://127.0.0.1:5000/api/v0/admin/propuesta', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(res => res.json())
            .then(resp => {
                console.log(resp);
                if (resp['code'] == 'ok') {
                    alert('Propuesta subida');
                    Object.keys(propuesta).forEach(k => {
                        propuesta[k].value = '';
                    });

                } else {
                    alert('No se pudo subir la propuesta');
                }

            }).catch(error => {
                console.log(error);
                alert('No se pudo establecer conexión al servidor');
            });
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
                pdfFile = resp['pdf'];

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