const express = require('express');
const handlebars = require('express-handlebars');
const socketio = require('socket.io');


const app = express();
const server = app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

const io = socketio(server);

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

