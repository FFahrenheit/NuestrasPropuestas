const logout = () => {
    localStorage.setItem('logged', 'false');
    localStorage.setItem('id','');
    window.location.assign('login.html');
}

(() => {
    const logged = localStorage.getItem('logged') || 'false';
    const user = localStorage.getItem('id') || '0';

    console.log({ logged });
    if ((logged == 'false' || user == '0') && !window.location.href.includes('login')) {
        console.log('A login');
        window.location.assign('login.html');
    }
})();