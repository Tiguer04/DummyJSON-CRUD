
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
});

async function login(email, password) {

  const respuesta = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await respuesta.json();

  if (respuesta.ok) {

    localStorage.setItem('my_jwt', data.token);
    
    window.location.href = '/index.html';
  } else {
    emailInput.value = '';
    passwordInput.value = '';
    
    Swal.fire({
      icon: "warning",
      text: data.message,
    });

  }
}