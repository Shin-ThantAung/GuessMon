//game js

//Initilizing the point for user
var userPoint = 0;
var userPointOutput = document.getElementById("userPoints");

userPointOutput.innerHTML = `Points: ${userPoint}`;
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

/*

// floating login page js
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

Document.addEventListener('DOMContentLoaded', function() {
    // Check if data exists in local storage
    if (localStorage.getItem('formData')) {
        // If data exists, populate form fields
        var formData = JSON.parse(localStorage.getItem('formData'));
        document.getElementById('name').value = formData.name;
        document.getElementById('email').value = formData.email;
        document.getElementById('password').value = formData.password;
    }

    // Add event listener for form submission
    document.getElementById('regi-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Create object to store form data
        var formData = {
            name: name,
            email: email,
            password: password
        };

        // Store form data in local storage
        localStorage.setItem('formData', JSON.stringify(formData));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if data exists in local storage
    if (localStorage.getItem('formData')) {
        var formData = JSON.parse(localStorage.getItem('formData'));

        // Add event listener for form submission
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            // Check if the provided email and password match the stored data
            if (email === formData.email && password === formData.password) {
                alert('Login successful!');
                // Redirect the user to another page or perform other actions
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    } else {
        alert('No user data found. Please sign up first.');
        // Redirect the user to the sign-up page or perform other actions
    }
});

*/