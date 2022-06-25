const $time = document.querySelector('#time');
const $submit = document.querySelector('#submit');
const $timeForm = document.querySelector('#time-form');
const $pedido = document.querySelector('#form');
const $horas = document.querySelector('#mostrarHoras');
const $minutos = document.querySelector('#mostrarMinutos');
const $segundos = document.querySelector('#mostrarSegundos');
const $check = document.querySelector('#check');
const $numeros = document.querySelectorAll('.numero');
const $audio = document.querySelector('#myAlert');

function calcularTiempoDeEjecucion(horas, minutos, segundos) {
    segundos += horas * 3600;
    segundos += minutos * 60;
    
    return segundos;
};

function calcularUnidadesFinales(horas, minutos, segundos){
    if(segundos>60){
        minutos += Math.trunc(segundos/60);
        segundos = Math.trunc(segundos % 60);
    }
    
    if(minutos>60){
        horas += Math.trunc(minutos / 60);
        minutos = Math.trunc(minutos % 60);
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

function mostrarReloj(horas, minutos, segundos){
    if (horas < 10){
        $horas.innerHTML = `0${horas} `;
    }else{
        $horas.innerHTML = `${horas} `;
    }

    if(minutos < 10){
        $minutos.innerHTML = `:0${minutos} `;
    }else{
        $minutos.innerHTML = `:${minutos} `;
    }

    if(segundos < 10){
        $segundos.innerHTML = `:0${segundos}`;
    }else{
        $segundos.innerHTML = `:${segundos}`;
    }
}

function ocultarPedido(){
    $pedido.style.left = '800%';
    $timeForm.style.left = '50%';
}

function tocarAlarma(){
    $audio.play();
    setTimeout(() =>{
        alert('End !!')
    }, 1000);
}

$pedido['submit'].addEventListener('click', () => {
    let horas = Number($pedido['horas'].value);
    let minutos = Number($pedido['minutos'].value);
    let segundos = Number($pedido['segundos'].value);
    const $playAudio = document.querySelector('#check');

    if ((horas >= 0 || minutos >= 0 || segundos > 0) && !(horas < 0 || minutos < 0 || segundos < 0)) {
        ocultarPedido();
    
        const segundosTotales = calcularTiempoDeEjecucion(horas, minutos, segundos);

        const tiempo = calcularUnidadesFinales(horas, minutos, segundos);
        horas = tiempo['horas'];
        minutos = tiempo['minutos'];
        segundos = tiempo['segundos'];

        for (i = 0; i <= segundosTotales; i++) {
            setTimeout(() => {
                mostrarReloj(horas, minutos, segundos);
                segundos--;
                const nuevoValor = actualizarValor(horas, minutos, segundos) 
                horas = nuevoValor['horas'];
                minutos = nuevoValor['minutos'];
                segundos = nuevoValor['segundos'];

                if((horas === 0 && minutos === 0 && segundos === 0) && $playAudio.checked){
                    tocarAlarma();
                };

            }, (i + 1) * 1000);
        }
    }    
})


$numeros.forEach((value, index) => {
    value.addEventListener('change', () => {
        if (value.valueAsNumber < 0) {
            $numeros[index].value = 0;
        }
    })
})
