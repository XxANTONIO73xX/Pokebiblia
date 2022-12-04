$.ajax({
    type: "GET",
    url: "https://pokeapi.co/api/v2/pokemon/",
    data: "",
    dataType: "json"
}).done(function(data){
    console.log(data)
})