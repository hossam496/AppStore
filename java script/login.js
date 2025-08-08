let UserName = document.getElementById('UserName')
let password = document.getElementById('password')
let loginBtn = document.getElementById('sign_In')

let getUserName = localStorage.getItem("UserName")
let getPassword = localStorage.getItem("password")

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


loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(UserName.value == "" || password.value == ""){
        alert("Please fill in all data")
    }else{
        if(getUserName === UserName.value.trim() && getPassword === password.value){
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("currentUser", UserName.value)
            
            setTimeout(() => {
                window.location = "index.html"
            }, 1000)
        }else{
            alert("Username or Password is wrong!")
        }
    }
})
