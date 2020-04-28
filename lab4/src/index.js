import {getAboutMe} from './info';
import {getPokemon} from './meowth';

document.getElementById('maintab').onclick = getAboutMe;
document.getElementById("pokemontab").onclick = getPokemon;
getAboutMe();