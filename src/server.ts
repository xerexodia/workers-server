// src/server.ts
import mongoose from 'mongoose';
import { app } from './app';
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 5000;

io.on('connection', (socket: any) => {
  console.log('a user connected');
});
mongoose
  .connect('mongodb+srv://ibrahim:ibrahim@cluster0.sypi7bk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('success connection');
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => console.log(`Example app listening at http://127.0.0.1:${port}`));
