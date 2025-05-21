"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoSecante = exports.MetodoNewtonRaphson = exports.MetodoPosicionFalsa = exports.MetodoBiseccion = exports.data = void 0;
const math = __importStar(require("mathjs"));
exports.data = [];
function anadirObjetos(...params) {
    const item = {};
    params.forEach(([key, value]) => {
        item[key] = value;
    });
    exports.data.push(item);
}
function parseIntervalo(input) {
    const inputLimpio = input.replace(/\[|\]/g, '').trim();
    const intervalos = inputLimpio.split(',').map(interval => parseFloat(interval.trim()));
    if (intervalos.length != 2 || intervalos.some(isNaN)) {
        throw new Error('Formato de intervalo invalido. Asegurate de usar [a,b]');
    }
    return intervalos;
}
// Declaracion de Clases
class Metodos {
    constructor(expression, delimitador) {
        this.intervalos = [];
        this.expression = expression;
        this.delimitador = delimitador;
        this.inicializarIntervalos();
    }
    inicializarIntervalos() {
        if (typeof this.delimitador === 'string') {
            this.intervalos = parseIntervalo(this.delimitador);
        }
    }
}
class MetodoBiseccion extends Metodos {
    constructor(expression, delimitador) {
        super(expression, delimitador);
    }
    execute(r_anterior, i) {
        i++;
        var a = this.intervalos[0];
        var b = this.intervalos[1];
        var r = (a + b) / 2;
        var f_a = math.evaluate(this.expression, { x: a });
        var f_r = math.evaluate(this.expression, { x: r });
        var error = (math.abs(r - r_anterior) / r) * 100;
        if (f_r == 0 || (error < 0.0001 && i > 1) || i > 100) {
            console.log('La raiz aproximada calculada es:', r_anterior.toFixed(4));
            return exports.data;
        }
        else {
            anadirObjetos(['a', a], ['b', b], ['raiz', r], ['f(a)', f_a], ['f(r)', f_r], ['Error', error]);
            (f_a * f_r < 0) ? b = r : a = r;
            this.intervalos[0] = a;
            this.intervalos[1] = b;
            return this.execute(r, i);
        }
    }
}
exports.MetodoBiseccion = MetodoBiseccion;
class MetodoPosicionFalsa extends Metodos {
    constructor(expression, delimitador) {
        super(expression, delimitador);
    }
    execute(r_anterior, i) {
        i++;
        var a = this.intervalos[0];
        var b = this.intervalos[1];
        var f_a = math.evaluate(this.expression, { x: a });
        var f_b = math.evaluate(this.expression, { x: b });
        var r = b - ((f_b * (a - b)) / (f_a - f_b));
        var f_r = math.evaluate(this.expression, { x: r });
        var error = (Math.abs(r - r_anterior) / r) * 100;
        if (f_r == 0 || (error < 0.0001 && i > 1) || i > 100 || r == r_anterior) {
            console.log('La raiz es aproximadamente:', r.toFixed(4));
            return exports.data;
        }
        else {
            anadirObjetos(['a', a], ['b', b], ['raiz', r], ['f(a)', f_a], ['f(b)', f_b], ['f(r)', f_r], ['Error', error]);
            if (f_a * f_r < 0) {
                b = r;
            }
            else {
                a = r;
            }
            this.intervalos[0] = a;
            this.intervalos[1] = b;
        }
        return this.execute(r, i);
    }
}
exports.MetodoPosicionFalsa = MetodoPosicionFalsa;
class MetodoNewtonRaphson extends Metodos {
    constructor(expression, delimitador) {
        super(expression, delimitador);
    }
    obtenerDerivada(funcion, a) {
        const h = 0.0000000001;
        const dx = (math.evaluate(funcion, { x: a + h }) - math.evaluate(funcion, { x: a })) / h;
        return dx;
    }
    execute(i) {
        i++;
        var f_xn = math.evaluate(this.expression, { x: this.delimitador });
        var df_xn = this.obtenerDerivada(this.expression, this.delimitador);
        var dx = f_xn / df_xn;
        var x_n1 = this.delimitador - dx;
        var error = (Math.abs(x_n1 - this.delimitador) / x_n1) * 100;
        if (dx <= .00001 && i > 1 || i > 100) {
            console.log("La raiz es", this.delimitador.toFixed(4));
            return exports.data;
        }
        else {
            this.delimitador = x_n1;
            anadirObjetos(['x_n', this.delimitador], ['f(x)_n', f_xn], ['df(x)_n', df_xn], ['x_n+1', x_n1], ['Error', error]);
            return this.execute(i);
        }
    }
}
exports.MetodoNewtonRaphson = MetodoNewtonRaphson;
class MetodoSecante extends Metodos {
    constructor(expression, delimitador) {
        super(expression, delimitador);
    }
    execute(x_n_anterior, i) {
        i++;
        var f_xn = math.evaluate(this.expression, { x: this.delimitador });
        var f_xn_anterior = math.evaluate(this.expression, { x: x_n_anterior });
        var dx = (f_xn * (x_n_anterior - this.delimitador)) / (f_xn_anterior - f_xn);
        var x_n1 = this.delimitador - dx;
        var error = (Math.abs(x_n1 - this.delimitador) / x_n1) * 100;
        if ((dx <= .0000001 && i > 1) || i > 100) {
            console.log("La raiz es", this.delimitador.toFixed(4));
            return exports.data;
        }
        else {
            var xn_anterior = this.delimitador;
            this.delimitador = x_n1;
            anadirObjetos(['raiz', this.delimitador], ['f(x)_n', f_xn], ['dx', dx], ['x_n+1', x_n1], ['Error', error]);
            return this.execute(xn_anterior, i);
        }
    }
}
exports.MetodoSecante = MetodoSecante;
