const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const routerViews = require('./routes/views.routes')



const app = express();
const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));
const io = new Server(httpServer);



app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', routerViews);
app.use('/realtimeproducts', routerViews);

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('add-product', (data) => {
        console.log(data);
    })

    socket.on('delete-product', (data) => {
        console.log(data);
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })

    socket.on('productAdded', () => {
        io.emit('updateProducts')});

})
   
