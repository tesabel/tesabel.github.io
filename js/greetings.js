const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const greeting = document.getElementById("greeting");
const app = document.getElementById("app");
const welcomeMessage = document.getElementById("welcome-message");

const USERNAME_KEY = "username";

function paintGreeting(username) {
    greeting.innerText = `Hello! ${username}`;
    greeting.classList.remove("hidden");
    app.classList.remove("hidden");
}

function onNameSubmit(event) {
    event.preventDefault();
    const username = nameInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreeting(username);
    nameForm.classList.add("hidden");
    welcomeMessage.classList.add("hidden");
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    nameForm.classList.remove("hidden");
    welcomeMessage.classList.remove("hidden");
    nameForm.addEventListener("submit", onNameSubmit);
} else {
    paintGreeting(savedUsername);
    nameForm.classList.add("hidden");
    welcomeMessage.classList.add("hidden");
    app.classList.remove("hidden");
}
