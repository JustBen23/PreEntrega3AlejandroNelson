window.addEventListener("scroll", function(){{
    let navBar = document.querySelector("nav");
    navBar.classList.toggle("sticky_navbar", window.scrollY > 0);
}})

