import * as math from 'mathjs';

interface DataItem<T = any> {
    [key: string]: T
}

export const data: DataItem[] = [];

function anadirObjetos(...params: [string, any][]): void {
    const item: DataItem<string | number> = {};
    params.forEach(([key, value]) => {
        item[key] = value;
    });
    data.push(item);
}

function parseIntervalo(input:string): number[] {
    const inputLimpio: string = input.replace(/\[|\]/g, '').trim();
    const intervalos: number[] = inputLimpio.split(',').map(interval => parseFloat(interval.trim()));
    if (intervalos.length != 2 || intervalos.some(isNaN)) {
        throw new Error('Formato de intervalo invalido. Asegurate de usar [a,b]');
    }
    return intervalos;
}

// Declaracion de Clases

abstract class Metodos {
    protected expression: string;
    protected delimitador: string | number; // Este sera la semilla o el intervalo
    protected intervalos: number[] = []; 

    constructor(expression: string, delimitador: string | number) {
        this.expression = expression;
        this.delimitador = delimitador;
        this.inicializarIntervalos();
    }

    private inicializarIntervalos(): void {
        if(typeof this.delimitador === 'string') {
            this.intervalos = parseIntervalo(this.delimitador);
        }
    }

    public abstract execute(...params: any[]): DataItem[];
}

export class MetodoBiseccion extends Metodos {
    constructor(expression: string, delimitador: string) {
        super(expression, delimitador);
    }

    public execute(r_anterior: number, i:number): DataItem<string | number>[] {
        i++;
        var a: number = this.intervalos[0];
        var b: number = this.intervalos[1];
        var r: number = (a+b)/2;
        var f_a: number = math.evaluate(this.expression, {x: a});
        var f_r: number = math.evaluate(this.expression, {x: r});
        var error = (math.abs(r-r_anterior)/r)*100;
    
        if(f_r == 0 || (error < 0.0001 && i > 1) || i>100) {
            console.log('La raiz aproximada calculada es:', r_anterior.toFixed(4))
            return data;
        } else {
            anadirObjetos(['a', a], ['b', b], ['raiz', r], ['f(a)', f_a], ['f(r)', f_r], ['Error', error]);
            (f_a*f_r < 0)?b=r:a=r;
            this.intervalos[0] = a;
            this.intervalos[1] = b;
            return this.execute(r, i);
        }
    }
}

export class MetodoPosicionFalsa extends Metodos {
    constructor(expression: string, delimitador: string) {
        super(expression, delimitador);
    }
    
    public execute(r_anterior: number, i: number): DataItem<string | number>[] {
        i++;
        var a: number = this.intervalos[0];
        var b: number = this.intervalos[1];
        var f_a: number = math.evaluate(this.expression, {x: a});
        var f_b: number = math.evaluate(this.expression, {x: b});
        var r: number = b - ((f_b*(a-b))/(f_a-f_b));
        var f_r: number = math.evaluate(this.expression, {x: r});
        var error: number = (Math.abs(r - r_anterior)/r)*100;
        
        if(f_r == 0 || (error < 0.0001 && i > 1) || i > 100 || r == r_anterior) {
            console.log('La raiz es aproximadamente:', r.toFixed(4));
            return data;
        } else {
            anadirObjetos(['a', a], ['b', b], ['raiz', r], ['f(a)', f_a], ['f(b)', f_b], ['f(r)', f_r], ['Error', error]);
            if (f_a * f_r < 0) {
                b = r;
            } else {
                a = r;
            }
            this.intervalos[0] = a;
            this.intervalos[1] = b;
        }
        return this.execute(r, i);
    }
}

export class MetodoNewtonRaphson extends Metodos {
    constructor(expression: string, delimitador: number) {
        super(expression, delimitador);
    }

    private obtenerDerivada(funcion:string, a: number): number {
        const h: number = 0.0000000001;
        const dx = (math.evaluate(funcion, {x: a + h}) - math.evaluate(funcion, {x: a}))/h;
        return dx;
    }

    public execute(i: number): DataItem<string | number>[] {
        i++;
        var f_xn: number = math.evaluate(this.expression, {x: this.delimitador as number});
        var df_xn: number = this.obtenerDerivada(this.expression, this.delimitador as number);
        var dx: number = f_xn/df_xn;
        var x_n1: number = (this.delimitador as number) - dx;
        var error: number = (Math.abs(x_n1 - (this.delimitador as number))/x_n1)*100;
        
        if(dx <= .00001 && i > 1 || i > 100) {
            console.log("La raiz es", (this.delimitador as number).toFixed(4));
            return data;
        } else {
            this.delimitador = x_n1;
            anadirObjetos(['x_n', this.delimitador], ['f(x)_n', f_xn], ['df(x)_n', df_xn], ['x_n+1', x_n1], ['Error', error]);
            return this.execute(i);
        }
    }
}

export class MetodoSecante extends Metodos {
    constructor(expression: string, delimitador: number) {
        super(expression, delimitador);
    }

    public execute(x_n_anterior: number, i: number): DataItem<string | number>[] {
        i++;
        var f_xn: number = math.evaluate(this.expression, {x: this.delimitador as number});
        var f_xn_anterior: number = math.evaluate(this.expression, {x: x_n_anterior});
        var dx: number = (f_xn*(x_n_anterior-(this.delimitador as number)))/(f_xn_anterior-f_xn);
        var x_n1: number = (this.delimitador as number) - dx;
        var error: number = (Math.abs(x_n1 - (this.delimitador as number))/x_n1)*100;
    
    
        if((dx <= .0000001 && i > 1) || i > 100) {
            console.log("La raiz es", (this.delimitador as number).toFixed(4));
            return data;
        } else {
            var xn_anterior = this.delimitador as number;
            this.delimitador = x_n1;
            anadirObjetos(['raiz', this.delimitador], ['f(x)_n', f_xn], ['dx', dx], ['x_n+1', x_n1], ['Error', error]);
            return this.execute(xn_anterior, i);
        }
    }
}