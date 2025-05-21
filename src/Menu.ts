import {InputHandler} from "./InputHandler";

export interface MenuOption {
    label: string;
    action: () => Promise<void>;
}

export class Menu {
    private options: MenuOption[];
    private static exitOptionIndex: number = -1;

    constructor(options: MenuOption[]) {
        this.options = options;
    }

    public async display(): Promise<void> {
        while(true) {
            console.clear();
            console.log('Parcial 1\nA continuacion se muestran los metodos vistos \
                en clase\nElige una opcion o ingresa -1 para salir: ');
            this.options.forEach((option: MenuOption, index: number) => {
                console.log(`${index + 1}. ${option.label}`);
            });

            try {
                const input = await InputHandler.getInput('Opcion: ');
                if(await this.handleChoice(input)) {
                    break;
                }
            } catch (error: unknown) {
                console.error("Error al obtener o procesar la entrada:", error);
            }
        }
        InputHandler.close();
    }
    
    private async handleChoice(input: string): Promise<boolean> {
        try {
            const choice = parseInt(input);
            if(isNaN(choice) || choice === 0 || choice > this.options.length || choice < -1) {
                console.log("Opcion invalida\nIntenta nuevamente. . .");
                await InputHandler.getInput("");
                return false;
            }

            try {
                if(choice === Menu.exitOptionIndex) {
                    console.log("\nGracias por usar el programa.");
                    return true;
                }
                await this.options[choice - 1].action(); // Ejecutar metodo numerico
                await InputHandler.getInput("\nPresiona Enter para continuar . . .");
            } catch (error: unknown) {
                console.error("Error al ejecutar la accion:", error);
            }
        } catch (error: unknown) {
            console.error("Error al procesar la opcion:", error)
        } 
        return false;
    }
}