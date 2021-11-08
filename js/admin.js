const logout = () => {
    localStorage.removeItem('logged');
    window.location.href = '/admin';
}

window.onload = () => {
    const logged = localStorage.getItem('logged');

    if (logged == 'false') {
        console.log('A login');
        window.location.href = '/admin/login.html'
    }
}