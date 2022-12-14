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
            <div class="pokemon_listed" id="listado" onclick="getPokemon('${pokemonData.name}')">
            <div class="imagen">
                <img src="${pokemonData.sprites.front_default}" width=110px" height="90px">
            </div>
            <div class="info">
                    <p class="name">${pokemonData.name}</p>
                    <p class="weight">Peso:${pokemonData.weight}</p>
                    <p class="height">Altura:${pokemonData.height}</p>
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

function getPokemon(name){
    const pageWidth  = document.documentElement.scrollWidth;
    if(pageWidth <=769){
        pokedex = $(".pokedex img")[0]
        pokedex.src = "../images/pokedexmobile.jpg"
        $(".contenedor-pokedex").css("display", "block")
    }else{
        $(".contenedor").animate({right: '670px'}, 'slow');
        $(".contenedor-pokedex").animate({right: '10px'}, 'slow');
    }
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/pokemon/"+ name,
        data: "",
        dataType: "json",
    }).done(function(pokemonData){
        $.ajax({
            type: "GET",
            url: pokemonData.species.url,
            data: "",
            dataType: "json",
        }).done(function(species){
            nombre = pokemonData.name;
            descripcion = "";
            experiencia = pokemonData.base_experience;
            categoria = "";
            species.genera.forEach(gen => {
                if(gen.language.name === "es"){
                    categoria = gen.genus;
                    
                }
            })
            textos = species.flavor_text_entries;
            for(let i=0; i<textos.length; i++){
                if(textos[i].language.name === "es"){
                    descripcion = textos[i].flavor_text;
                    break;
                }
            }
            altura = pokemonData.height;
            peso = pokemonData.weight;
            felicidad = species.base_happiness;
            captura = species.capture_rate;
            $("#nombre").text(nombre);
            $("#Descripcion").text(descripcion);
            $("#experiencia").text(experiencia);
            $("#categoria").text("Categoria: "+categoria);
            $("#altura").text("Altura: "+altura);
            $("#peso").text("Peso: "+peso);
            $("#felicidad").text(felicidad);
            $("#captura").text(captura);
            $("#sprite").attr("src", pokemonData.sprites.other.dream_world.front_default);
            tipos = document.getElementById("tipos");
            estadisticas = document.getElementById("estadisticas"); 
            estadisticas.innerHTML = "";
            tipos.innerHTML = "";

            pokemonData.types.forEach(tp =>{
                tipos.innerHTML +=`<li>${tp.type.name} </li>`
            });
            pokemonData.stats.forEach(stats =>{
                estadisticas.innerHTML +=`<li><b>${stats.stat.name}</b>: ${stats.base_stat}</li>`
            })
        })
    })
}

$(".close").click(function (e) {
    const pageWidth  = document.documentElement.scrollWidth;
    if(pageWidth <=769){
        $(".contenedor-pokedex").css("display", "none")
    }else{
        $(".contenedor").animate({right: '0'}, 'slow');
        $(".contenedor-pokedex").animate({right: '-1000px'}, 'slow');
    } 
});

$("#buscar").click(function(){
    param = $("#param").val();
    console.log(param)
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/pokemon/" + param,
        data: "",
        dataType: "json"
    }).done(function(pokemonData){
        $("#pokemon-list").html(`
        <div class="pokemon_listed" id="listado" onclick="getPokemon('${pokemonData.name}')">
            <div class="imagen">
            <img src="${pokemonData.sprites.front_default}" width=110px" height="90px">
            </div>
        <div class="info">
            <p class="name">${pokemonData.name}</p>
            <p class="weight">Peso:${pokemonData.weight}</p>
            <p class="height">Altura:${pokemonData.height}</p>
        </div>
        <audio src="../audio/menu-efect.mp3" id="menu-audio-efecto"></audio>
    </div>
        `)
    }).fail(function(){
        alert("no se encontro: " + param)
    })
})

$(".search_button").hover(function () {
        // over
        img = $(".search_button img")[0];
        img.src = "./img/lupa.png";
    }, function () {
        // out
        img = $(".search_button img")[0];
        img.src = "./img/lupa black.png";
    }
);