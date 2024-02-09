//game js

startGame();


async function startGame(){
    try{

        var min = 1;
        var max = 1025;
        var randomNum = Math.floor(Math.random() * (max - min+ 1)) + min;
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
        const data = await response.json();
        console.log(data);

        
        
        const randomPokemon = data.name;

        const output = document.getElementById('outputText');

        console.log(randomPokemon);

        let btnSubmit = document.getElementById('btnSubmit');


        btnSubmit.addEventListener('click', function(e){
            e.preventDefault();

            let answer = document.getElementById("answer").value.toLowerCase();



            if (answer == randomPokemon)
            {
                output.innerHTML = "Correct Answer!!!";
            }
            else{
                output.innerHTML = `Incorrect Answer.`;
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