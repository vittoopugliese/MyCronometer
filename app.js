const cronometer = document.getElementById('cronometer')
const pedido = document.querySelector('#form')
const tiempo = document.querySelector('#tiempo')

function calcularTiempoDeEjecucion(horas, minutos, segundos) {
    while (horas) {
        minutos++;
        horas--
    }
    while (minutos) {
        segundos += 60;
        minutos--;
    }

    return segundos;
};

pedido.addEventListener('click', () => {
    let horas = document.querySelector('#horas').value
    let minutos = document.querySelector('#minutos').value
    let segundos = document.querySelector('#segundos').value

    if (horas >= 0 && minutos >= 0 && segundos > 0) {
        segundosTotales = calcularTiempoDeEjecucion(horas, minutos, segundos);
        while (segundos > 60) {
            minutos += 1;
            segundos -= 60;
        }
        while (minutos > 60) {
            minutos -= 60;
            horas += 1;
        }
        for (i = 0; i <= segundosTotales; i++) {
            setTimeout(() => {
                tiempo.innerHTML = `${horas} || ${minutos} || ${segundos}`

                segundos--;
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
            }, (i + 1) * 1000);
        }
        console.log(segundosTotales)
    }
})