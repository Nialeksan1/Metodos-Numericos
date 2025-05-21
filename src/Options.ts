import {MenuOption} from "./Menu";
import { InputHandler } from "./InputHandler";
import {data, MetodoBiseccion, MetodoNewtonRaphson, MetodoPosicionFalsa, MetodoSecante} from './Metodos';

const mensaje1: string = "Instrucciones:\n\
Ingresa una funcion y un intervalo con las siguientes caracteristicas:\n\
El intervalo debe ser de la forma [a,b]\n\
La funcion usara x como variable\n\
Si es necesario sqrt(contenido) para la raiz, exp(contenido) para e^contenido\n\
Solo es posible usar parentesis\n\n\
";

const mensaje2: string = "Instrucciones:\n\
Ingresa una funcion y una semilla con las siguientes caracteristicas:\n\
La semilla debe ser un valor numerico\n\
La funcion usara x como variable\n\
Si es necesario sqrt(contenido) para la raiz, exp(contenido) para e^contenido\n\
Solo es posible usar parentesis\n\n\
";

async function getAnswer(option: string): Promise<{expresion: string, delimitador: string | number}> {
    data.length = 0;
    let expresion = await InputHandler.getInput('Introduce una funcion matematica (usa x para la variable): ');
    expresion = expresion.toString();
    let delimitador: string | number;
    if(option === "option1&2") {
        delimitador = await InputHandler.getInput('Introduce un intervalo de la forma [a,b]: ');
        delimitador = delimitador.toString();
    } else {
        delimitador = parseFloat(await InputHandler.getInput('Introduce una semilla: '));
    }
    return {expresion, delimitador};
}


export const option1: MenuOption = {
    label:'Metodo de Biseccion',
    action: async () => {
        // Buscar Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(option1.label);
            console.log();
            console.log(mensaje1);
            // Preguntar con InputHandler
            const respuestas = await getAnswer("option1&2");
            const expresion: string = respuestas.expresion;
            const intervalo: string = respuestas.delimitador.toString();
            // Ejecutar metodo
            const metodoBiseccion = new MetodoBiseccion(expresion, intervalo);
            console.table(metodoBiseccion.execute(0, 0));
            /*const respuesta = await InputHandler.getInput('Introduce una función matemática: ');
            console.log('Respuesta recibida:', respuesta);*/
        } catch (err: unknown) {
            console.error("Error en option 1", err);
        }
    }
};

export const option2: MenuOption = {
    label:'Metodo de Posicion Falsa',
    action: async () => {
        // Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(option2.label);
            console.log();
            console.log(mensaje1);
            // Preguntar con InputHandler
            const respuestas = await getAnswer("option1&2");
            const expresion: string = respuestas.expresion;
            const intervalo: string = respuestas.delimitador.toString();
            // Ejecutar metodo
            const metodoPosicionFalsa = new MetodoPosicionFalsa(expresion, intervalo);
            console.table(metodoPosicionFalsa.execute(0, 0));
        } catch (err: unknown) {
            console.error("Error en option 2", err);
        }
    }
};

export const option3: MenuOption = {
    label:'Metodo de Newton-Raphson',
    action: async () => {
        // Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(option3.label);
            console.log();
            console.log(mensaje2);
            // Preguntar con InputHandler
            const respuestas = await getAnswer("option3&4");
            const expresion: string = respuestas.expresion;
            let semilla: number;
            if (typeof respuestas.delimitador === 'number') {
                semilla = respuestas.delimitador;
            } else {
                throw new Error('La semilla tiene caracteres invalidos.');
            }
            // Ejecutar metodo
            const metodoNewtonRaphson = new MetodoNewtonRaphson(expresion, semilla);
            console.table(metodoNewtonRaphson.execute(0));
        } catch (err: unknown) {
            console.error("Error en option 3", err);
        }
    }
};

export const option4: MenuOption = {
    label:'Metodo de la Secante',
    action: async () => {
        // Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(option4.label);
            console.log();
            console.log(mensaje2);
            // Preguntar con InputHandler
            const respuestas = await getAnswer("option3&4");
            const expresion: string = respuestas.expresion;
            let semilla: number;
            if (typeof respuestas.delimitador === 'number') {
                semilla = respuestas.delimitador;
            } else {
                throw new Error('La semilla tiene caracteres invalidos.');
            }
            // Ejecutar metodo
            const metodoSecante = new MetodoSecante(expresion, semilla);
            console.table(metodoSecante.execute(0, 0));
        } catch (err: unknown) {
            console.error("Error en option 4", err);
        }
    }
};