export function getAboutMe() {
    const main = document.getElementById('main');
    main.innerHTML = getMyInfo();
    document.getElementById("myInfo").style.cssText = "text-align: center; font-family: cursive; color: #597da3;";
    document.getElementById("name").style.cssText = "font-size: 50px;";
    let text = document.getElementsByClassName("text");
    for (let i = 0; i < text.length; i++) {
        text[i].style.cssText = "font-size: 30px;";
    }
    document.getElementById("maintab").style.cssText = "background-color: white; color: #597da3;";
    document.getElementById("pokemontab").style.cssText = "background-color: #597da3; color: white;";
}

function getMyInfo() {
    return '<section id = "myInfo"> <h2 id = "name">Alexander Rusanov</h2> <span class = "text">Current city: Saint Petersburg</span> <br> <span class = "text">Birthday: February 20</span> <br> <span class = "text">University: ITMO</span> <br> <span class ="text">Group: M3300</span> </section>';
}
