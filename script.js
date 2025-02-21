const API_URL = "https://script.google.com/macros/s/AKfycbxVhcT2Om5YGhCAUe9uwJIq19VdO3Lq1iRkgV-ziPW5TBeNUT54dSJrDN9baaOydg/exec"; 

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('reset-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function showResetForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('reset-form').classList.remove('hidden');
}

function sendOTP(type) {
    let value;
    if (type === 'mobile') value = document.getElementById('reg-mobile').value;
    else if (type === 'email') value = document.getElementById('reg-email').value;
    else if (type === 'aadhar') value = document.getElementById('reg-aadhar').value;
    
    fetch(`${API_URL}?action=sendOTP&type=${type}&value=${value}`)
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error sending OTP:", error));
}

function register() {
    const userData = {
        action: "register",
        username: document.getElementById("reg-username").value,
        mobile: document.getElementById("reg-mobile").value,
        email: document.getElementById("reg-email").value,
        aadhar: document.getElementById("reg-aadhar").value,
        password: document.getElementById("reg-password").value
    };

    fetch(API_URL, { method: "POST", body: new URLSearchParams(userData) })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error registering:", error));
}

function login() {
    const loginData = {
        action: "login",
        mobile: document.getElementById("login-mobile").value,
        password: document.getElementById("login-password").value
    };

    fetch(API_URL, { method: "POST", body: new URLSearchParams(loginData) })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login Successful!");
                window.location.href = "home.html"; // Redirect to home page
            } else {
                alert("Invalid Mobile Number or Password");
            }
        })
        .catch(error => console.error("Error logging in:", error));
}

function recoverCredentials() {
    const aadhar = document.getElementById("reset-aadhar").value;
    fetch(`${API_URL}?action=recover&aadhar=${aadhar}`)
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                document.getElementById("recovered-username").textContent = data.username;
                document.getElementById("recovered-password").textContent = data.password;
                document.getElementById("reset-details").classList.remove("hidden");
            } else {
                alert("Aadhaar not found!");
            }
        })
        .catch(error => console.error("Error recovering credentials:", error));
}
