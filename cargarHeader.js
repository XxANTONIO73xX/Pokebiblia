document.body.innerHTML = `
<link rel="stylesheet" href="../estilos.css">
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"> 
<audio id="musicaRomantica" src="/audio/Pokeintro.mp3" autoplay="autoplay" loop="loop"></audio>

<header>
    <nav>
        <div class="hamburger-button">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="nav-bar">
            <img src="/images/pokeLogo2.png" alt="">
            <ul>
                <li><a href="/anime/anime.html">Anime</a></li>
                <li><a href="/videojuegos/videojuegos.html">Videojuegos</a></li>
                <li><a href="/pokedex/index.html">PokeDex</a></li>
                <li><a href="/Historia/index.html">Historia</a></li>
                <li><a href="/Juego/index.html">Juego</a></li>
            </ul>
        </div>
    </nav>
</header>`;

window.addEventListener('load', function(){
    musicaRomantica = document.getElementById("musicaRomantica");
    musicaRomantica.volume = 0.2;
})

hamburguesa = document.querySelector(".hamburger-button");
hamburguesa.onclick = function() {
    navBar = document.querySelector(".nav-bar ul");
    navBar.classList.toggle("active");
}