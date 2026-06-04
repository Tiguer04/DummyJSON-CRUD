
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  login(email, password);
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
    alert(data.message);
  }
}