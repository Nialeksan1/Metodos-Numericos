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
exports.Menu = void 0;
const InputHandler_1 = require("./InputHandler");
class Menu {
    constructor(options) {
        this.options = options;
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                console.clear();
                console.log('Parcial 1\nA continuacion se muestran los metodos vistos en clase\nElige una opcion o ingresa -1 para salir: ');
                this.options.forEach((option, index) => {
                    console.log(`${index + 1}. ${option.label}`);
                });
                try {
                    const input = yield InputHandler_1.InputHandler.getInput('Opcion: ');
                    if (yield this.handleChoice(input)) {
                        break;
                    }
                }
                catch (error) {
                    console.error("Error al obtener o procesar la entrada:", error);
                }
            }
            InputHandler_1.InputHandler.close();
        });
    }
    handleChoice(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const choice = parseInt(input);
                if (isNaN(choice) || choice === 0 || choice > this.options.length || choice < -1) {
                    console.log("Opcion invalida\nIntenta nuevamente. . .");
                    yield InputHandler_1.InputHandler.getInput("");
                    return false;
                }
                try {
                    if (choice === Menu.exitOptionIndex) {
                        console.log("\nGracias por usar el programa.");
                        return true;
                    }
                    yield this.options[choice - 1].action(); // Ejecutar metodo numerico
                    yield InputHandler_1.InputHandler.getInput("\nPresiona Enter para continuar . . .");
                }
                catch (error) {
                    console.error("Error al ejecutar la accion:", error);
                }
            }
            catch (error) {
                console.error("Error al procesar la opcion:", error);
            }
            return false;
        });
    }
}
exports.Menu = Menu;
Menu.exitOptionIndex = -1;
