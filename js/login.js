const userForm = document.getElementById('username');
const passForm = document.getElementById('password');
const form = document.getElementById('login');
const remember = document.getElementById('remember');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submit...');

    const data = {
        username: userForm.value,
        password: passForm.value
    };

    console.log(data);

    if (data.username == 'admin' && data.password == '1234') {
        localStorage.setItem('logged', 'true');
        if (remember.value) {
            localStorage.setItem('username', data.username);
        } else {
            localStorage.setItem('username', data.username);
        }
        window.location.assign('dashboard.html');
    } else {
        alert('Credenciales incorrectas');
    }
})


window.onload = () => {
    const logged = localStorage.getItem('logged') || 'false';

    if (logged == 'true') {
        console.log('A dashboard');
        window.location.assign('dashboard.html');
    }

    const username = localStorage.getItem('username') || '';
    userForm.value = username;

}