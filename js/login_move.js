const signUpButton = document.getElementById('sign_up_2');
const signInButton = document.getElementById('sign_in_2');
const main = document.getElementById('main');

signUpButton.addEventListener('click', () => {
    main.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    main.classList.remove("right-panel-active");
});