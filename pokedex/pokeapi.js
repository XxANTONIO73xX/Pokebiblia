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
                <img src="${pokemonData.sprites.front_default}" width=110px" height="90px">
                <div class="info">
                    <p>Nombre:${pokemonData.name}</p>
                    <p>Peso:${pokemonData.weight}</p>
                    <p>Altura:${pokemonData.height}</p>
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