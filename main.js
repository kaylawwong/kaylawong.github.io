// basic interactivity for links
document.addEventListener("DOMContentLoaded", () => {

    // example: highlight nav links on hover
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#4f4f4fff"; // pink highlight
        });
        link.addEventListener("mouseout", () => {
            link.style.color = "#0F0F0F"; // default
        });
    });

});