//Este es un simulador de elecciones para presidente.

//Esta funcion cuando se llama, retorna un prompt que le pide al usuario la cantidad de candidatos para la eleccion.
const solicitarNumeroCandidatos = () => {
    return parseInt(prompt('Ingrese la cantidad de candidatos a participar en estas elecciones'));
}

//Esta funcion solicita nombre de los candidatos, con un parametro que ennumera los candidatos.
const solicitarNombreCandidatos = (numero) => {
    return prompt(`Ingrese el nombre del candidato ${numero}: `);
}

//esta funcion arma el mensaje que aparecera dentro de la funcion votar para que el usuario pueda elegir un candidato.
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
    //En esta variable se guarda el voto llamando la funcion de opcionesCandidatos.
    const voto = parseInt(prompt(opcionesCandidatos(candidatos)));

    //En este switch se le da las condiciones al voto ingresado.
    switch (voto) {
        case 0: 
        resultadoElecciones(candidatos);
        break;
    default:
        if (voto >= 1 && voto <= candidatos.length) {
            //Aca el voto es -1 por que si el usuario eligio al candidato número 2 por ejemplo, en el arrays va a ser en el indice el 1
            //entonces restandole uno, me aseguro que sea el candidato que el usario eligio.
            candidatos[voto -1 ].votos++;
            alert('¡Su voto ah sido registrador correctamente! \n Gracias por ejercer su derecho a votar.');
            votar(candidatos);
        } else {
            //Este else nos sirve por si el usuario ingresa un numero que no esta dentro de la cantidad de numeros de candidatos o el "0".
            alert('Opcion no valida. Por favor ingrese una opcion valida. \n Gracias.')
            votar(candidatos);
        }
        break;
    }
}
//Funcion que muestra el resultado de las elecciones cuando el usuario asi lo decida.
const resultadoElecciones = (candidatos) => {
    let resultados = `Resultados: \n `;
    //creo esta variable que va servir para seguir los candidatos con mas votos.
    let votosMaximos = -1;
    //creo un array que va a incluir a los ganadores en caso de empate.
    let ganadores = [];
    //este for recorre el arrays candidatos 
    for ( const candidato of candidatos) {
        //en el recorrido concatena el nombre y los votos.
        resultados += `${candidato.nombre}: ${candidato.votos} votos \n` ;
        
        //En este control de flujo si los votos son mayores a la variable votos Maximos, la misma pasa a tener el valor del candidato con mas votos.
        if (candidato.votos > votosMaximos) {
            votosMaximos = candidato.votos
            //Y el candidato se guarda en el siguiente arrays.
            ganadores = [candidato];
            //Y en este else if, si tenemos un candidato que tenga la misma cantidad de votos que el que tiene mayor votos, lo agrega al arrays de ganadores.
        } else if (candidato.votos === votosMaximos) {
            ganadores.push(candidato);
        }
    }

    //En este if si la longitud del arrays ganadores es 1, entonces en resultados concatenamos un ganador.
    if (ganadores.length === 1) {
        resultados += `Ganador: ${ganadores[0].nombre} con ${ganadores[0].votos} votos \n `;
    } else {
        resultados += `¡Empate! Se iniciara una nueva ronda de votacion para los candidatos en igualdad de votos. \n`;
        //en caso de empate recorremos el arrays con los ganadores y reiniciamos los votos a "0".
        for (const ganador of ganadores) {
            ganador.votos = 0;
        }
        alert(resultados);
        //llamamos la funcion votar para que se elija entre los candidatos empatados.
        votar(ganadores);
        return;
    }
    alert(resultados);
    alert(`El nuevo Presidente de la Republica Argentina es ¡¡¡${ganadores[0].nombre}!!!`);
}


//Primera funcion
const simuladorElecciones = () => {
    alert('Este es un simulador de Elecciones Electorales. \n A continuación se le pedira ingresar el numero de candidatos y luego el nombre de cada uno.');
    //Aca creo una variable que guarda la cantidad de candidatos que van a participar 
    const numeroCandidatos = solicitarNumeroCandidatos();
    //En este Array es donde se van a incluir los candidatos con los votos. 
    const candidatos = [];

    //Este for en cada vuelta va a solicitar los nombres segun el numero de candidatos que el usuario alla elegido.
    for(let i = 1; i <= numeroCandidatos; i++) {
        //En la variable nombre se guardan los nombres ingresados por el usuario y se agrega un valor al parametro de la funcion solicitarNombreCandidatos en cada vuelta que nos permite tener los candidatos ennumerados.
        const nombre = solicitarNombreCandidatos(i);
        //Aca estamos agregando al arrays de objetos, el nombre en cada vuelta y la clave votos con un valor de 0.
        candidatos.push({ nombre: nombre, votos: 0});
    }

    alert('¡Bienvenido! ¡Ahora si! A elegir nuestro futuro Presidente/a');
    //Luego de tener los candidatos llamamos la funcion votar.
    votar(candidatos);
}

//Aca arranca el simulador de Elecciones electorales.
simuladorElecciones();






