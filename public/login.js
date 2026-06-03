
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  login(email, password);
});

async function login(email, password) {
  // 1. El frontend llama a tu backend
  const respuesta = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  // 2. El frontend recibe el JSON que tú mandaste con res.status(200).json(...)
  const data = await respuesta.json();

  if (respuesta.ok) {
    // 3. ¡AQUÍ SE GUARDA EN EL NAVEGADOR!
    localStorage.setItem('mi_jwt', data.token);
    
    // 4. Lo mandamos a ver los productos
    window.location.href = '/index.html';
  } else {
    alert(data.message); // Si puso mal la contraseña
  }
}