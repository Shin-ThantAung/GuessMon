


async function getPokemon(){
    try{
        var min = 1;
        var max = 1025;
        var randomNum = Math.floor(Math.random() * (max - min+ 1)) + min;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)

        const data = await response.json();
        const randomPokemon = data.name;

        
    }

    catch(error){
        console.error(error);
    }
}