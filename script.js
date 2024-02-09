// home page js
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
});

const APIKEY = "65c639c4be534a61aad9f3e9";
getPlayerInfo();

document.getElementById('regi-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Create object to store form data
    let jsondata = {
        "name": name,
        "email": email,
        "password": password
    };

    let settings = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "x-apikey": "65c639c4be534a61aad9f3e9",
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
    }
    
    fetch('https://pokemonguessinggame-6d97.restdb.io/rest/playerinfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response failure');
        }
        return response.json();
    })

.catch(error => {
    console.error('Error fetching leaderboard data:', error);
    // Handle error (e.g., display error message to the user)
});

        
});

//after successful login
localStorage.setItem('isLoggedIn', 'true');

//attempt to play checked if in account
const checkLogin = document.querySelector('.btnPlay');

checkLogin.addEventListener('click', ()=> {
    document.addEventListener('DOMContentLoaded', function() {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'index.html'
            alert('Please log in first.');
        }
    });
})

//leaderboard js

function buildTable(data){
    var table = document.getElementById('leaderboard')

    for (var i = 0; i < data.length; i++){
        var row =   `<tr>
                        <td>${data[i].position}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].score}</td>
                    </tr>`
        table.innerHTML += row
    }
}
//game js

//Initilizing the point for user
var userPoint = 0;
var userPointOutput = document.getElementById("userPoints");

userPointOutput.innerHTML = "Points: ${userPoint}";
startGame();


async function startGame(x){
    try{
        //
        x.style.display = "none";

        //initializing the point for user
        let points = 5;

        //Creating a random number between 1 and 1025
        var min = 1;
        var max = 1025;
        var randomNum = Math.floor(Math.random() * (max - min+ 1)) + min;
        
        //fetch data from api
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
        const data = await response.json();

        //The pokemon name the user need to guess
        const randomPokemon = data.name;
        console.log(randomPokemon);

        //Output of when the user gets the correct answer
        const output = document.getElementById('outputText');
        const pkmSprite = document.getElementById('pokemonSprite');

        //Output for hints given to user
        const dexID = document.getElementById('pokedexID');
        const type = document.getElementById('type');
        const ability = document.getElementById('ability');


        const pkmID = data.id;
        const pkmType1 = data.types["0"];
        const pkmType2 = data.types["1"];
        const pkmAbility1 = data.abilities["0"];
        const pkmAbility2 = data.abilities["1"];
        const pkmAbility3 = data.abilities["2"];

        //Displaying the id of the pokemon
        dexID.innerHTML = `Pokedex ID: ${pkmID}`;

        //Displaying the types of the pokemon
        if (pkmType2 == null)
        {
            type.innerHTML = `Type: ${pkmType1.type["name"]}`;
        }
        else{
            type.innerHTML = `Types: ${pkmType1.type["name"]} + ${pkmType2.type["name"]}`;
        }


        //Displaying the abilities of the pokemon
        if (pkmAbility2 == null)
        {
            ability.innerHTML = `Ability: ${pkmAbility1.ability["name"]}`;
        }
        else if (pkmAbility3 == null)
        {
            ability.innerHTML = `Abilties: ${pkmAbility1.ability["name"]} + ${pkmAbility2.ability["name"]}`
        }
        else
        {
            ability.innerHTML = `Abilities: ${pkmAbility1.ability["name"]} + ${pkmAbility2.ability["name"]} + ${pkmAbility3.ability["name"]}`
        }

        let btnSubmit = document.getElementById('btnSubmit');


        //run this part if user click the submit button
        btnSubmit.addEventListener('click', function(e){
            e.preventDefault();

            //get the input from the user and change it to lower case for comparison purpose
            let answer = document.getElementById("answer").value.toLowerCase();

            //check if user enter the correct answer
            if (answer == randomPokemon)
            {
                output.innerHTML = "Correct Answer!!!";

                //display the pokemon sprite when correct
                pkmSprite.src = data.sprites["front_default"];
                pkmSprite.style.display = "block";

                //Add the gained points
                userPoint += points;

                //Display the points 
                userPointOutput.innerHTML = userPointOutput.innerHTML = `Points: ${userPoint}`;

                x.style.display = "block";
            }
            else{
                points--;
                output.innerHTML = `Incorrect Answer. ${points} points left.`;
            }
        })

    }
    catch(error){
        console.error(error);
    }
}

