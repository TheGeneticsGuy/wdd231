// Footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

// HAMBURGER BUTTON LOGIC
const icons = document.querySelectorAll('.icon-menu');
const nav = document.querySelector(".navigation");

icons.forEach(hamburger => {
    hamburger.addEventListener('click', (event) => {
        nav.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});
