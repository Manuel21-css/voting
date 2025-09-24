const hamburger = document.querySelector(".ham");
const navlink = document.querySelector("#navlink");
const navlist = document.querySelectorAll(".nav-list li");  // Fixed selector to target each <li>

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("active");
    navlink.classList.toggle("active");
    // navlist.classList.toggle("active");  // Still commented out, as it's not needed
})
navlist.forEach(n => n.addEventListener("click", ()=>{
    hamburger.classList.remove("active");
    navlink.classList.remove("active");
}))