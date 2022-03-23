const cronometer = document.getElementById('cronometer')
const pedido = document.querySelector('#form')
const tiempo = document.querySelector('#tiempo')

function calcularTiempoDeEjecucion(horas, minutos, segundos) {
    while (horas) {
        minutos --;
        horas --;
    }
    while (minutos) {
        segundos += 60;
        minutos --;
    }

    return segundos;
};

function calcularUnidadesFinales(horas, minutos, segundos){
    
    while (segundos > 60) {
        minutos += 1;
        segundos -= 60;
    }
    while (minutos > 60) {
        minutos -= 60;
        horas += 1;
    }

    return {'horas': horas, 'minutos' : minutos, 'segundos' : segundos};
}

function actualizarValor(horas, minutos, segundos){
    if (segundos === -1 && minutos) {
        segundos = 59;
        minutos--;
    }
    if (minutos === -1 && horas) {
        minutos = 59;
        horas--;
    }
    if (segundos === -1 && minutos === 0 && horas) {
        minutos = 59;
        segundos = 59;
        horas--;
    }

    return {'horas': horas, 'minutos' : minutos, 'segundos' : segundos};
}

pedido.addEventListener('click', () => {
    let horas = document.querySelector('#horas').value
    let minutos = document.querySelector('#minutos').value
    let segundos = document.querySelector('#segundos').value

    const segundosTotales = calcularTiempoDeEjecucion(horas, minutos, segundos);

    const tiempo = calcularUnidadesFinales(horas, minutos, segundos);
    horas = tiempo['horas'];
    minutos = tiempo['minutos'];
    segundos = tiempo['segundos'];

    for (i = 0; i <= segundosTotales; i++) {

        setTimeout(() => {
            
            document.querySelector('#tiempo').innerHTML = `${horas} || ${minutos} || ${segundos}`

            segundos--;

            const nuevoValor = actualizarValor(horas, minutos, segundos) 
            horas = nuevoValor['horas'];
            minutos = nuevoValor['minutos'];
            segundos = nuevoValor['segundos'];

        }, (i + 1) * 1000);

        
    }
})
