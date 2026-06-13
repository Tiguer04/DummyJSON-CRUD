
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  login(email, password);
});

document.addEventListener('keydown', (event) =>{

  if(event.key == 'Enter'){
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value;
    const password = passwordInput.value;

    login(email, password);

  }

})

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

emailInput.addEventListener('click', () =>{
  emailInput.classList.add('inputhovered');
  passwordInput.classList.remove('inputhovered');
});

passwordInput.addEventListener('click', () =>{
  passwordInput.classList.add('inputhovered');
  emailInput.classList.remove('inputhovered');
});

document.addEventListener('click', (event) => {

  if (event.target !== emailInput && event.target !== passwordInput) {
    emailInput.classList.remove('inputhovered');
    passwordInput.classList.remove('inputhovered');
  }

  if(event.target.className == "form-auth-link"){
    emailInput.value = '';
    passwordInput.value = '';
  }

});

const eye = document.getElementById('eye');

eye.addEventListener('click', () =>{

  if(eye.src.includes('eye-solid')){
    eye.src = './images/eye-slash-solid.png';
    passwordInput.type = 'text';
  }else{
    eye.src = './images/eye-solid.png';
    passwordInput.type = 'password';
  }

})

async function login(email, password) {
  

  const respuesta = await fetch('https://dummyjson-crud.onrender.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
/*
 --> Para pruebas con Docker

  const respuesta = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
 */
  const data = await respuesta.json();

  if (respuesta.ok) {

    localStorage.setItem('my_jwt', data.token);
    
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    }).fire({
      icon: "success",
      text: "You're in! Redirecting..."
    });

    setTimeout(() =>{
      window.location.href = '/index.html';
    }, 3000)

  } else if(data.message.startsWith("Invalid")){
    passwordInput.value = '';

    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  }else {

    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  }
}