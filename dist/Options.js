"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.option4 = exports.option3 = exports.option2 = exports.option1 = void 0;
const InputHandler_1 = require("./InputHandler");
const Metodos_1 = require("./Metodos");
const mensaje1 = "Instrucciones:\n\
Ingresa una funcion y un intervalo con las siguientes caracteristicas:\n\
El intervalo debe ser de la forma [a,b]\n\
La funcion usara x como variable\n\
Si es necesario sqrt(contenido) para la raiz, exp(contenido) para e^contenido\n\
Solo es posible usar parentesis\n\n\
";
const mensaje2 = "Instrucciones:\n\
Ingresa una funcion y una semilla con las siguientes caracteristicas:\n\
La semilla debe ser un valor numerico\n\
La funcion usara x como variable\n\
Si es necesario sqrt(contenido) para la raiz, exp(contenido) para e^contenido\n\
Solo es posible usar parentesis\n\n\
";
function getAnswer(option) {
    return __awaiter(this, void 0, void 0, function* () {
        Metodos_1.data.length = 0;
        let expresion = yield InputHandler_1.InputHandler.getInput('Introduce una funcion matematica (usa x para la variable): ');
        expresion = expresion.toString();
        let delimitador;
        if (option === "option1&2") {
            delimitador = yield InputHandler_1.InputHandler.getInput('Introduce un intervalo de la forma [a,b]: ');
            delimitador = delimitador.toString();
        }
        else {
            delimitador = parseFloat(yield InputHandler_1.InputHandler.getInput('Introduce una semilla: '));
        }
        return { expresion, delimitador };
    });
}
exports.option1 = {
    label: 'Metodo de Biseccion',
    action: () => __awaiter(void 0, void 0, void 0, function* () {
        // Buscar Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(exports.option1.label);
            console.log();
            console.log(mensaje1);
            // Preguntar con InputHandler
            const respuestas = yield getAnswer("option1&2");
            const expresion = respuestas.expresion;
            const intervalo = respuestas.delimitador.toString();
            // Ejecutar metodo
            const metodoBiseccion = new Metodos_1.MetodoBiseccion(expresion, intervalo);
            console.table(metodoBiseccion.execute(0, 0));
            /*const respuesta = await InputHandler.getInput('Introduce una función matemática: ');
            console.log('Respuesta recibida:', respuesta);*/
        }
        catch (err) {
            console.error("Error en option 1", err);
        }
    })
};
exports.option2 = {
    label: 'Metodo de Posicion Falsa',
    action: () => __awaiter(void 0, void 0, void 0, function* () {
        // Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(exports.option2.label);
            console.log();
            console.log(mensaje1);
            // Preguntar con InputHandler
            const respuestas = yield getAnswer("option1&2");
            const expresion = respuestas.expresion;
            const intervalo = respuestas.delimitador.toString();
            // Ejecutar metodo
            const metodoPosicionFalsa = new Metodos_1.MetodoPosicionFalsa(expresion, intervalo);
            console.table(metodoPosicionFalsa.execute(0, 0));
        }
        catch (err) {
            console.error("Error en option 2", err);
        }
    })
};
exports.option3 = {
    label: 'Metodo de Newton-Raphson',
    action: () => __awaiter(void 0, void 0, void 0, function* () {
        // Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(exports.option3.label);
            console.log();
            console.log(mensaje2);
            // Preguntar con InputHandler
            const respuestas = yield getAnswer("option3&4");
            const expresion = respuestas.expresion;
            let semilla;
            if (typeof respuestas.delimitador === 'number') {
                semilla = respuestas.delimitador;
            }
            else {
                throw new Error('La semilla tiene caracteres invalidos.');
            }
            // Ejecutar metodo
            const metodoNewtonRaphson = new Metodos_1.MetodoNewtonRaphson(expresion, semilla);
            console.table(metodoNewtonRaphson.execute(0));
        }
        catch (err) {
            console.error("Error en option 3", err);
        }
    })
};
exports.option4 = {
    label: 'Metodo de la Secante',
    action: () => __awaiter(void 0, void 0, void 0, function* () {
        // Funcion autoejecutable asincrona para manejar funciones asincronas mas directamente (async () => {})();
        try {
            console.clear();
            console.log(exports.option4.label);
            console.log();
            console.log(mensaje2);
            // Preguntar con InputHandler
            const respuestas = yield getAnswer("option3&4");
            const expresion = respuestas.expresion;
            let semilla;
            if (typeof respuestas.delimitador === 'number') {
                semilla = respuestas.delimitador;
            }
            else {
                throw new Error('La semilla tiene caracteres invalidos.');
            }
            // Ejecutar metodo
            const metodoSecante = new Metodos_1.MetodoSecante(expresion, semilla);
            console.table(metodoSecante.execute(0, 0));
        }
        catch (err) {
            console.error("Error en option 4", err);
        }
    })
};
