const userForm = document.getElementById('username');
const passForm = document.getElementById('password');
const form = document.getElementById('login');
const remember = document.getElementById('remember');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submit...');

    const data = JSON.stringify({
        username: userForm.value,
        password: passForm.value
    });

    console.log(data);

    fetch('http://127.0.0.1:5000/api/v0/admin/sesion', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(res => res.json())
        .then(resp => {
            console.log(resp);
            if (resp['code'] == 'ok') {

                if (remember.checked) {
                    localStorage.setItem('username', username.value);
                } else {
                    localStorage.setItem('username', '');

                }
                localStorage.setItem('logged', 'true');
                localStorage.setItem('id', resp['id']);
                window.location.assign('dashboard.html');
            } else if (resp['code'] == 'noexiste') {
                alert('Credenciales incorrectas');
            } else {
                alert('Error se servidor');
            }
        })
        .catch(error => {
            console.log(error);
            alert('No se pudo establecer conexión al servidor');
        });

});


(() => {
    const logged = localStorage.getItem('logged') || 'false';

    if (logged == 'true') {
        console.log('A dashboard');
        window.location.assign('dashboard.html');
    }

    const username = localStorage.getItem('username') || '';
    userForm.value = username;

})();