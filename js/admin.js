const logout = () => {
    localStorage.setItem('logged', 'false');
    localStorage.setItem('id','');
    window.location.assign('login.html');
}

(() => {
    const logged = localStorage.getItem('logged') || 'false';
    console.log({ logged });
    if (logged == 'false' && !window.location.href.includes('login')) {
        console.log('A login');
        window.location.assign('login.html');
    }
})();