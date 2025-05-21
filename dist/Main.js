"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Menu_1 = require("./Menu");
const Options_1 = require("./Options");
const options = [Options_1.option1, Options_1.option2, Options_1.option3, Options_1.option4];
const menu = new Menu_1.Menu(options);
menu.display().then(() => {
    console.log('\nPrograma Terminado.');
});
