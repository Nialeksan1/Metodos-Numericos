import * as readline from 'readline';

// Clase para manejar el input
export class InputHandler {
    // Se declara la propiedad rl del tipo readline.Interface, que es privada
    private static rl: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // La funcion recibe un string y retorna un Promise donde se imprime un question y espera el input
    // para ser resuelto
    public static async getInput(question: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.rl.question(question, answer => {
                if (answer === null || answer === undefined) {
                    reject(new Error('No se recibio ninguna respuesta.'));
                } else {
                    resolve(answer);
                }
            });
        });
    }

    // Se cierra rl
    public static close(): void {
        if(this.rl) {
            this.rl.close();
        }
    }
}
