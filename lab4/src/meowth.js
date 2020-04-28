async function getAbility(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json.effect_entries[0].effect;
}

export async function getPokemon() {
    const main = document.getElementById("main");
    await getPokemonInfo('meowth').then(pokemonInfo => main.innerHTML = pokemonInfo);
    document.getElementById("pokemontab").style.cssText = "background-color: white; color: #597da3;";
    document.getElementById("maintab").style.cssText = "background-color: #597da3; color: white;";
    document.getElementById("pokemonInfo").style.cssText = "text-align: center; font-family: cursive; color: #597da3;";
    document.getElementById("name").style.cssText = "font-size: 50px;";

    let names = document.getElementsByClassName("abilityName");
    for (let i = 0; i < names.length;i++) {
        names[i].style.cssText = "font-size: 30px; font-weight: bolder;";
    }
    let texts = document.getElementsByClassName("text");
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.cssText = "font-size: 25px;";
    }
    document.getElementById('abilities').style.cssText = "display: block; width: 70%; margin: 0 auto 0 auto; ";
    let ability = document.getElementsByClassName('ability');
    for (let i = 0; i < ability.length; i++) {
        ability[i].style.cssText = "border: 3px solid #597da3; border-radius: 50px; margin: 50px;";
    }
}

const pokemonName = "meowth";
async function getPokemonInfo(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    let response = await fetch(url);

    let pokemonInfo = `<section id = "pokemonInfo"> <h2 id = "name">${(pokemonName)} info: </h2><div id="abilities">`;

    let json = await response.json();

    for (let i = 0; i < json.abilities.length; i++) {
        let ability = json.abilities[i].ability;
        let name = ability.name;
        let abilURL = ability.url;
        let abilityDescription = await getAbility(abilURL);

        pokemonInfo += `<div class="ability"><span class="abilityName">${(name)}</span><br><span class="text">${abilityDescription}</span></div>`;
    }
    pokemonInfo += `</div></section>`;
    return pokemonInfo;
}
