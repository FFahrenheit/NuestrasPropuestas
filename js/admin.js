const logout = () => {
    localStorage.removeItem('logged');
    window.location.assign('login.html');
}

window.onload = () => {
    const logged = localStorage.getItem('logged');

    if (logged == 'false') {
        console.log('A login');
        window.location.assign('login.html');
    }
}