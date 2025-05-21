import { Menu } from "./Menu";
import { option1, option2, option3, option4 } from "./Options";

const options = [option1, option2, option3, option4];

const menu = new Menu(options);

menu.display().then(() => {
    console.log('\nPrograma Terminado.')
});
