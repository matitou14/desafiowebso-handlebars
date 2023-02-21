import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from '../src/utils.js';
import viewRouter from './routes/view.router.js'
import { Server } from 'socket.io';
import path from 'path'

const products = [];

const app = express();
const httpServer = app.listen(8080, () =>{console.log('Server listening on PORT 8080')});

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewRouter);
app.use('/realtimeproducts', viewRouter)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!');
    socket.on('producto', (data) => {
        io.sockets.emit('producto', data);
    });
});

io.on('connection', (socket) => {
    // enviar la lista actual de productos al cliente cuando se conecte
    socket.emit('products', products);
  
    // agregar un nuevo producto al array "products"
    socket.on('add-product', (newProduct) => {
      products.push({ id: products.length, ...newProduct });
      io.emit('products', products);
    });
  
    // eliminar un producto del array "products"
    socket.on('delete-product', (deletedProduct) => {
      products.splice(deletedProduct.id, 1);
      io.emit('products', products);
    });
  });

export { products };