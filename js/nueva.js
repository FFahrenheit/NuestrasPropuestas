const title = document.getElementById('h-titulo');
const form = document.getElementById('form');
const archivo = document.getElementById('archivo');
const fileStatus = document.getElementById('file_status');
const fileLink = document.getElementById('link');

let pdfFile = '';
let id = '';

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
        id = urlParams.get('id');

        title.innerHTML = `Editar propuesta #${id}: `;

        loadInfo(id);
    }
}


function loadInfo(id) {
    fetch('http://127.0.0.1:5000/api/v0/propuesta/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data['propuesta']['id'] == id){
                renderInfo(data['propuesta']); //La posición id - 1 
            }else{
                alert('No se encontró la propuesta');
                window.location.assign('dashboard.html');
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function renderInfo(data) {
    console.log(data);
    propuesta.titulo.value = data.titulo;
    propuesta.contenido.value = data.extracto;
    propuesta.estado.value = data.estado;
    propuesta.partido.value = data.partido;
    propuesta.fecha.valueAsDate = new Date(data.fecha);
    propuesta.autor.value = data.autor;
    archivo.required = false;
    fileLink.innerHTML = '<i class="fas fa-file-pdf mx-2"></i> Ver documento';
    fileLink.href = 'http://127.0.0.1:5000/api/v0/file/' + data.archivo;
    pdfFile = data.archivo;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(id === ''){
        if (confirm('¿Desea subir esta propuesta?')) {

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
    }else{
        if (confirm('¿Desea guardar los cambios hechos a esta propuesta?')) {

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
    
            fetch('http://127.0.0.1:5000/api/v0/admin/propuesta/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            }).then(res => res.json())
                .then(resp => {
                    console.log(resp);
                    if (resp['code'] == 'ok') {
                        alert('Propuesta modificada');
                        window.location.assign('dashboard.html');
                    } else {
                        alert('No se pudo modificar la propuesta');
                    }
    
                }).catch(error => {
                    console.log(error);
                    alert('No se pudo establecer conexión al servidor');
                });
        }
    }


});

archivo.addEventListener('change', () => {
    const file = archivo.files[0];
    let data = new FormData();
    data.append('files[]', file);
    console.log({file});

    fileStatus.innerHTML = `
    <div class="spinner-border text-success loading" role="status">
        <span class="sr-only">Loading...</span>
    </div>`;

    fileLink.innerHTML = '<i class="fas fa-file-pdf mx-2"></i> Ver documento';
    fileLink.href = 'http://127.0.0.1:5000/api/v0/file/' + file.name;

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
                fileLink.href = 'http://127.0.0.1:5000/api/v0/file/' + resp['pdf'];

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