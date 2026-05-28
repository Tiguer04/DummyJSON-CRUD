const baseURL = 'https://dummyjson.com/products';

let products = [];

function getProducts(){

  fetch(baseURL)
  .then(res => res.json())
  .then(data => {

  products = data.products;
  
  renderProducts();

  })
  .catch(error => 
    console.error('Hubo un error al llamar a la api: ', error)
  )

}

getProducts();  

function renderProducts(){

  const productList = document.getElementById('productList');

  productList.innerHTML = '';

  products.forEach(product =>{
    const listItem = document.createElement('li')
    
    listItem.classList.add('productItem')

    listItem.innerHTML = `
      
        <strong>${product.title}</strong>
        <p><strong>Price:</strong> $ ${product.price}</p>
        <p>${product.description}</p>
        <div class="buttonContainer">
          <button onclick="editProduct(${product.id})">Edit</button>
          <button onclick="deleteProduct(${product.id})">Delete</button>
        </div>

        <div id="editForm-${product.id}" class="editForm">

        <div class="form-group">
          <label for="editTitle" class="editLabel">Title: </label>
          <input type="text" id="editTitle-${product.id}" value="${product.title}"
          class="editInput">
        </div>

        <div class="form-group">
          <label for="editPrice" class="editLabel">Price: </label>
          <input type="number" id="editPrice-${product.id}" value="${product.price}"
          class="editInput">
        </div>

        <div class="form-group">  
          <label for="editDescription" class="editLabel">Description: </label>
          <textarea id="editDescription-${product.id}" class="editTextarea">${product.description}</textarea>
        </div>
          
          <div class="buttonContainer">
            <button onclick="uploadProduct(${product.id})">Upload</button>
          </div>

        </div>

      `;

  productList.appendChild(listItem)

  })

}

function postProduct(){

  const productTitleInput = document.getElementById('productTitle');
  const productPriceInput = document.getElementById('productPrice');
  const productDescriptionInput = document.getElementById('productDescription');

  const productTitle = productTitleInput.value;
  const productPrice = productPriceInput.value;
  const productDescription = productDescriptionInput.value;

  if(productTitle.trim() == '' || productPrice.trim() == '' || productDescription == ''){
    alert('Todos los campos son obligatorios');
    return;
  }

  fetch(baseURL + '/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title: productTitle,
      price: productPrice,
      description: productDescription
    })
  })
  .then(res => res.json())
  .then(data =>{
    products.unshift(data);
    renderProducts();

    productTitleInput.value = '';
    productPriceInput.value = '';
    productDescriptionInput.value = '';

  })
  .catch(error =>{
    console.log('Hubo un error al crear el producto: ', error)
  })

}

function editProduct(productID){

  const editForm = document.getElementById(`editForm-${productID}`)

  editForm.style.display = (editForm.style.display == 'none') ? 'block' : 'none'

}


function uploadProduct(productID){
  const editTitle = document.getElementById(`editTitle-${productID}`).value;
  const editPrice = document.getElementById(`editPrice-${productID}`).value;
  const editDescription = document.getElementById(`editDescription-${productID}`).value;

  fetch(baseURL + `/${productID}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: editTitle,
      price: editPrice,
      description: editDescription
    })
  })
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    const index = products.findIndex(product => product.id === productID);

    if(index != -1){
      products[index] = data;
    } else{
      alert('Hubo un error al actualizar la información del producto');
      return;
    }

    renderProducts();

  })
  .catch(error =>{
    console.error('Hubo un error al querer actualizar la información del producto: ', error)
  })

}


function deleteProduct(productID){

  fetch(baseURL + `/${productID}`, {
    method: 'DELETE'
  })
  .then(res => {

    if(res.ok){
      products = products.filter(product => product.id != productID);
      renderProducts();
    } else{
      console.error('Hubo un error al eliminar el producto')
    }
  })
  .catch(error =>{
    console.log("Hubo un error al eliminar el producto: ", error)
  })

}