const fs = require('fs');

let products = [];

fs.readFile('products.json', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  products = JSON.parse(data);
});
