let UserName = document.getElementById('UserName')
let email = document.getElementById('email')
let password = document.getElementById('password')
let registerBtn = document.getElementById('sign_UP')
let togglePassword = document.getElementById('togglePassword')

// وظيفة إظهار/إخفاء كلمة السر
togglePassword.addEventListener('click', function() {
    // تغيير نوع حقل كلمة السر بين text و password
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
    password.setAttribute('type', type)
    
    // تغيير الأيقونة بين العين المفتوحة والمغلقة
    this.classList.toggle('fa-eye-slash')
    this.classList.toggle('fa-eye')
})

registerBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(UserName.value == "" || email.value == "" || password.value == ""){
        alert("Please enter all data")
    }else{
        localStorage.setItem("UserName", UserName.value) // Fixed key to match login.js
        localStorage.setItem("email", email.value)
        localStorage.setItem("password", password.value)

        setTimeout(() => {
            window.location = "login.html"
        }, 1500)
    }
})

