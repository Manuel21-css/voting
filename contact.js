const hamburger = document.querySelector(".ham");
const navlink = document.querySelector("#navlink");
const navlist = document.querySelectorAll(".navlist");

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("active");
    navlink.classList.toggle("active");
    // navlist.classList.toggle("active");
})
navlist.forEach(n => n.addEventListener("click", ()=>{
    hamburger.classList.remove("active");
    navlink.classList.remove("active");
}))