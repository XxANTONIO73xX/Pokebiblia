$.ajax({
    type: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/",
    data: "",
    dataType: "json"
}).done(function(data){
    data.results.forEach(pokemon => {
        let url = pokemon.url;
        $.ajax({
            type: "GET",
            url: url,
            data: "",
            dataType: "json",
        }).done(function(pokemonData){
            $("#pokemon-list").append(`
            <div class="pokemon_listed" id="listado">
                <div class="imagen">
                    <img src="${pokemonData.sprites.front_default}" width=110px" height="90px">
                </div>
                <div class="info">
                    <p class="name">${pokemonData.name}</p>
                    <p class="weight">Peso: ${pokemonData.weight}</p>
                    <p class="height">Altura: ${pokemonData.height}</p>
                </div>
                <audio src="../audio/menu-efect.mp3" id="menu-audio-efecto"></audio>
            </div>`)
        });
    });
})

$(document).on('mouseenter', "#listado", function(){
    audio = $(this).find("#menu-audio-efecto");
    audio[0].play();
})