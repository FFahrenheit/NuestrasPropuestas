const form = document.getElementById('contact-form');
const message = document.getElementById('message');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');


form.onsubmit = (e) =>{
    e.preventDefault();
    const data = {
        message: `${ message.value }\n\n-${ nombre.value }`,
        email: email.value
    };
    const body = JSON.stringify(data);

    console.log({body, data, target: e.target.action});  

    fetch(e.target.action,{
        method: 'POST',
        body: body,
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp=>{
        console.log(resp);
        form.reset();
        alert('¡Feedback recibido!')
    }).catch(error=>{
        console.log(error);
        alert('No pudimos enviar el feedback');
    });
}