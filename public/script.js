const token = localStorage.getItem("mi_jwt");

if (!token) {
  window.location.href = "/login.html";
} else{
  validateToken(token);
}

async function validateToken(token) {
  try {
    const respuesta = await fetch('http://localhost:3000/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Le enviamos el token a tu checkToken
      }
    });

    if (respuesta.ok) {
      // ¡El backend dijo que es válido (status 200)! 
      // Ahora sí, cargamos DummyJSON con confianza.
      getProducts(); 
    } else {
      // El token era falso, fue manipulado o ya expiró (status 401).
      localStorage.removeItem("mi_jwt"); // Lo borramos por tramposo
      window.location.href = "/login.html"; // Lo pateamos al login
    }
  } catch (error) {
    console.error("Error validando el token:", error);
  }
}


const baseURL = "https://dummyjson.com/products";

let products = [];

let productsLimit = 30;

function getProducts() {
  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
      products = data.products;

      renderProducts();
    })
    .catch((error) =>
      console.error("Hubo un error al llamar a la api: ", error),
    );
}

function getMoreProducts(){

  if(productsLimit > 194){
     Swal.fire({
      icon: "info",
      text: "There aren't more products to show",
    });
    return;
  }
  
  const limit = 16;

  fetch(`${baseURL}?limit=${limit}&skip=${productsLimit}`)
  .then((res) => res.json())
  .then((data) =>{
    products.push(...data.products)

    renderProducts();
  })
  .catch((error) =>
      console.error("Hubo un error al llamar a la apiX: ", error),
  );

  productsLimit+=limit;

}

function renderProducts() {
  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");

    listItem.classList.add("productItem");

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
            <button onclick="updateProduct(${product.id})">Upload</button>
          </div>

        </div>

      `;

    productList.appendChild(listItem);
  });
}

function postProduct() {
  const productTitleInput = document.getElementById("productTitle");
  const productPriceInput = document.getElementById("productPrice");
  const productDescriptionInput = document.getElementById("productDescription");

  const productTitle = productTitleInput.value;
  const productPrice = productPriceInput.value;
  const productDescription = productDescriptionInput.value;

  if (
    productTitle.trim() == "" ||
    productPrice.trim() == "" ||
    productDescription == ""
  ) {
    Swal.fire({
      icon: "warning",
      text: "All fields are required",
    });
    return;
  }

  if (productPrice < 0) {
    Swal.fire({
      icon: "warning",
      text: "The price cannot be less than 0",
    });
    return;
  }

  const exists = products.some(
    (product) =>
      product.title.trim().toLowerCase() === productTitle.trim().toLowerCase(),
  );

  if (exists) {
    Swal.fire({
      icon: "error",
      text: "There cannot be products with the same name",
    });

    return;
  }

  fetch(baseURL + "/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      title: productTitle,
      price: productPrice,
      description: productDescription,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      products.unshift(data);
      renderProducts();

      Swal.fire({
        icon: "success",
        text: "Product created successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      productTitleInput.value = "";
      productPriceInput.value = "";
      productDescriptionInput.value = "";
    })
    .catch((error) => {
      console.log("Hubo un error al crear el producto: ", error);
    });
}

function editProduct(productID) {
  const editForm = document.getElementById(`editForm-${productID}`);
  
 if(editForm.style.display == ""){ 
 editForm.style.display = "none"; 
 }

  editForm.style.display = editForm.style.display == "none" ? "block" : "none";

}

function updateProduct(productID) {
  const editTitle = document.getElementById(`editTitle-${productID}`).value;
  const editPrice = document.getElementById(`editPrice-${productID}`).value;
  const editDescription = document.getElementById(
    `editDescription-${productID}`,
  ).value;

  if (
    editTitle.trim() == "" ||
    editPrice.trim() == "" ||
    editDescription == ""
  ) {
    Swal.fire({
      icon: "warning",
      text: "All fields are required",
    });
    return;
  }

  if (editPrice < 0) {
    Swal.fire({
      icon: "warning",
      text: "The price cannot be less than 0",
    });
    return;
  }

  const exists = products.some(
    (product) =>
      product.title.trim().toLowerCase() === editTitle.trim().toLowerCase() &&
      product.id !== productID
  );

  if (exists) {
    Swal.fire({
      icon: "error",
      text: "There cannot be products with the same name",
    });

    return;
  }

  if (productID > 194) {
    const index = products.findIndex((product) => product.id === productID);

    if (index != -1) {
      products[index].title = editTitle;
      products[index].price = editPrice;
      products[index].description = editDescription;

      renderProducts();
    }

    return;
  }

  fetch(baseURL + `/${productID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: editTitle,
      price: editPrice,
      description: editDescription,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const index = products.findIndex((product) => product.id === productID);

      if (index != -1) {
        products[index] = data;
      } else {
        Swal.fire({
          icon: "error",
          text: "There was an error updating the product information",
        });

        return;
      }

      renderProducts();
    })
    .catch((error) => {
      console.error(
        "Hubo un error al querer actualizar la información del producto: ",
        error,
      );
    });
}

function deleteProduct(productID) {
  Swal.fire({
    text: "Do you want to delete the product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#4A2F7A",
    cancelButtonColor: "#9B59B6",
  }).then((result) => {
    if (result.isConfirmed) {
      if (productID > 194) {
        products = products.filter((product) => product.id != productID);
        renderProducts();
        return;
      }

      fetch(baseURL + `/${productID}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            products = products.filter((product) => product.id != productID);
            renderProducts();
          } else {
            console.error("Hubo un error al eliminar el producto");
          }
        })
        .catch((error) => {
          console.log("Hubo un error al eliminar el producto: ", error);
        });
    }
  });
}
