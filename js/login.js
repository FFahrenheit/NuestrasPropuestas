const userForm = document.getElementById('username');
const passForm = document.getElementById('password');
const form = document.getElementById('login');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submit...');
})


window.onload = () => {
    const username = localStorage.getItem('username') || '';

    userForm.value = username
}