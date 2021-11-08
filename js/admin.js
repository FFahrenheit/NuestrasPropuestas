window.onload = () => {
    const logged = localStorage.getItem('logged');

    if(logged == 'false'){
        console.log('A login');
    }
}