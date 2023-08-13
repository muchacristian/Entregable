
const solicitarNumeroCandidatos = () => {
    return parseInt(prompt('Ingrese la cantidad de candidatos a participar en estas elecciones'));
}

const solicitarNombreCandidatos = (numero) => {
    return prompt(`Ingrese el nombre del candidato ${numero}: `);
}

const opcionesCandidatos = (candidatos) => {
    let mensaje = 'Elige un candidato: \n' ;
    contador = 1;
    for (const candidato of candidatos) {
        mensaje += `${contador}. ${candidato.nombre} \n` ;
        contador++;
    }
    mensaje += `0. Mostrar resultados y finalizar`;
    return mensaje;
}

const votar = (candidatos) => {
    const voto = parseInt(prompt(opcionesCandidatos(candidatos)));

    switch (voto) {
        case 0: 
        resultadoElecciones(candidatos);
        break;
    default:
        if (voto >= 1 && voto <= candidatos.length) {
            candidatos[voto -1 ].votos++;
            alert('¡Su voto ah sido registrador correctamente! \n Gracias por ejercer su derecho a votar.');
            votar(candidatos);
        } else {
            alert('Opcion no valida. Por favor ingrese una opcion valida. \n Gracias.')
            votar(candidatos);
        }
        break;
    }
}

const resultadoElecciones = (candidatos) => {
    let resultados = `Resultados: \n `;
    votosMaximos = -1;
    let ganadores = [];
    for ( const candidato of candidatos) {
        resultados += `${candidato.nombre}: ${candidato.votos} votos \n` ;
        
        if (candidato.votos > votosMaximos) {
            votosMaximos = candidato.votos
            ganadores = [candidato];
        } else if (candidato.votos === votosMaximos) {
            ganadores.push(candidato);
        }
    }

    if (ganadores.length === 1) {
        resultados += `Ganador: ${ganadores[0].nombre} con ${ganadores[0].votos} votos \n `;
    } else {
        resultados += `¡Empate! Se iniciara una nueva ronda de votacion para los candidatos en igualdad de votos. \n`;
        for (const ganador of ganadores) {
            ganador.votos = 0;
        }
        alert(resultados);
        votar(ganadores);
        return;
    }
    alert(resultados);
    alert(`El nuevo Presidente de la Republica Argentina es ¡¡¡${ganadores[0].nombre}!!!`);
}

const simuladorElecciones = () => {
    alert('Este es un simulador de Elecciones Electorales. \n A continuación se le pedira ingresar el numero de candidatos y luego el nombre de cada uno.');
    const numeroCandidatos = solicitarNumeroCandidatos();
    const candidatos = [];

    for(let i = 1; i <= numeroCandidatos; i++) {
        const nombre = solicitarNombreCandidatos(i);
        candidatos.push({ nombre: nombre, votos: 0});
    }

    alert('¡Bienvenido! ¡Ahora si! A elegir nuestro futuro Presidente/a');
    votar(candidatos);
}

simuladorElecciones();






