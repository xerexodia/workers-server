// src/server.ts
import mongoose from 'mongoose';
import { app } from './app';
import { Socket } from 'socket.io';
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 5000;
io.on('chat message', (socket: any) => {
  socket.emit('chat message', 'msg');
});

mongoose
  .connect('mongodb+srv://ibrahimfarhat2018:ibrahim@cluster0.g8o5npv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('success connection');
  })
  .catch((err) => {
    console.log(err);
  });
server.listen(port, () => console.log(`Example app listening at http://127.0.0.1:${port}`));
