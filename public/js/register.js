
const registerButton = document.getElementById('login-button');

registerButton.addEventListener('click', () => {

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  register(username, email, password);
});

document.addEventListener('keydown', (event) =>{

  if(event.key == 'Enter'){
    
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    register(username, email, password);

  }

})

const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

usernameInput.addEventListener('click', () =>{
  usernameInput.classList.add('inputhovered');
  emailInput.classList.remove('inputhovered');
  passwordInput.classList.remove('inputhovered');
});

emailInput.addEventListener('click', () =>{
  emailInput.classList.add('inputhovered');
  usernameInput.classList.remove('inputhovered');
  passwordInput.classList.remove('inputhovered');
});

passwordInput.addEventListener('click', () =>{
  passwordInput.classList.add('inputhovered');
  usernameInput.classList.remove('inputhovered');
  emailInput.classList.remove('inputhovered');
});

document.addEventListener('click', (event) => {
  if (event.target !== emailInput && event.target !== passwordInput && event.target !== usernameInput) {
    usernameInput.classList.remove('inputhovered');
    emailInput.classList.remove('inputhovered');
    passwordInput.classList.remove('inputhovered');
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

async function register(username, email, password) {

  const respuesta = await fetch('https://dummyjson-crud.onrender.com/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  
  /*
 --> Para pruebas con Docker

  
  const respuesta = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
   */

  const data = await respuesta.json();

  if (respuesta.ok) {

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
      text: "Registered successfully"
    });

    setTimeout(() =>{
      window.location.href = '/login.html';
    }, 3000)

  } else if(data.message.startsWith("Username")){
    usernameInput.value = '';

    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  } else if(data.message.startsWith("Password")){
    passwordInput.value = '';

    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  } else if(data.message.startsWith("Invalid") || data.message.startsWith("Email")){
    emailInput.value = '';     

    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  } else {
    
    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  }
}