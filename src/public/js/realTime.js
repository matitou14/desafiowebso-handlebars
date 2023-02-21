const socket = io();

const addProductForm = document.getElementById('add-product-form');
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = addProductForm.elements.name.value;
    const price = addProductForm.elements.price.value;
    socket.emit('add-product', { name, price });
  });

  // eliminar un producto al hacer clic en "Eliminar"
  const deleteButtons = document.getElementsByClassName('delete-product');
  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      socket.emit('delete-product', { id });
    });
  }

  // actualizar la lista de productos cuando se recibe un evento "products" de socket
  socket.on('products', (updatedProducts) => {
    const productList = document.querySelector('ul');
    productList.innerHTML = updatedProducts.map((product) => `
      <li>
        ${product.name} - $${product.price}
        <button class="delete-product" data-id="${product.id}">Eliminar</button>
      </li>
    `).join('');
  });
  io.sockets.emit('products', data)