const formContainer = document.getElementById('formContainer')
const formTitle = document.getElementById('formTitle')
const loginForm = document.getElementById('loginForm')
const toggleForm = document.getElementById('toggleForm');

toggleForm.addEventListener('click',(e) =>{
    e.preventDefault();
    if(formTitle.innerText === 'Login'){
        formTitle.innerText = 'sign Up';
        loginForm.innerHTML = `<input type="text" class="inp" id="signupEmail" placeholder= "Email" required>
        <p id="error1"></p> 
       <input type ="Password" class="inp" id="signupPassword" placeholder= "Password" required>
       <p id="error3"></p>
        <input type ="Password" class="inp" id="confirmPassword" placeholder= "confirm Password" required>
        <p id="error2"></p> 
       <button type= "submit"> Sign Up </button>`;
       toggleForm.innerText = 'Login';
    }else{
        formTitle.innerText = 'Login';
        loginForm.innerHTML = `<input type="text" id="loginEmail" class="inp" placeholder="Email" required>
            <input type="password" id="loginPassword" class="inp" placeholder="Password" required>
            <button type="submit">Login</button>`;
            toggleForm.innerText = 'sign Up';
    }
})

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if (formTitle.innerText === 'Login'){
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const loginSuccess = document.getElementById('loginSuccess')

        if(userData[email] && userData[email].password === password){
           loginSuccess.style.display = 'block'
        }else{
            alert('Invalid email or password!')
        }
    }else{
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const error1 = document.getElementById('error1')
        const error2 = document.getElementById('error2')
        const signupSuccess = document.getElementById('signupSuccess')
        const closeBtn = document.getElementById('closeBtn')
        const error3 = document.getElementById('error3')
        let specialCharacters = /[!@#$^&*-_/?\:;<>+]/
        error3.innerHTML="";
        error3.style.color = "red"
        error3.style.fontSize = "13px"
        error3.style.marginBottom = "3px"
        error2.innerHTML="";
        error2.style.color = "red"
        error2.style.fontSize = "13px"
        error2.style.marginBottom = "3px"
        error1.innerHTML="";
        error1.style.color = "red"
        error1.style.fontSize = "13px"
        error1.style.margin = "0px"
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
     if (!email.includes("@")){
    error1.innerHTML = "Email doesn't have the @ sign"
    return false;
    } if(!confirmPassword.includes(password)){
    error2.innerHTML = "Password doesn't match"
    return false;
    }if(!specialCharacters.test(password)){
         error3.innerHTML = "password must include a special character"
        return false;
    }else if (!userData[email]) {
        userData[email] = { password };
        localStorage.setItem('userData', JSON.stringify(userData));
        signupSuccess.style.display = 'block';
        closeBtn.addEventListener('click', () => {
        signupSuccess.style.display = 'none';
        });
        toggleForm.click(); // Switch to login form after sign up
    }else {
        alert('Email already exists!');
        }
    }
})

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



