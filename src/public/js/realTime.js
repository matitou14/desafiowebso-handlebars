const socket = io();

const addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = addProductForm.elements.name.value;
  const price = addProductForm.elements.price.value;
  socket.emit('add-product', { name, price });
});

// eliminar un producto al hacer clic en "Eliminar"
const deleteButtons = document.querySelectorAll('.delete-product');
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    socket.emit('delete-product', { id });
  });
});

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

socket.on('connection', (socket) => {
  console.log('Nuevo cliente conectado!');

  socket.on('producto', (data) => {
    console.log('Evento "producto" recibido del cliente:', data);
    io.sockets.emit('producto', data);
  });

  socket.on('add-product', (newProduct) => {
    console.log('Evento "add-product" recibido del cliente:', newProduct);
    products.push({ id: products.length, ...newProduct });
    io.emit('products', products);
  });

  socket.on('delete-product', (deletedProduct) => {
    console.log('Evento "delete-product" recibido del cliente:', deletedProduct);
    products.splice(deletedProduct.id, 1);
    io.emit('products', products);
  });
});
