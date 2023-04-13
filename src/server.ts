// src/server.ts
import mongoose from 'mongoose';
import { app } from './app';

const port = 5000;
mongoose
  .connect('mongodb+srv://ibrahim:ibrahim@cluster0.sypi7bk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('success connection');
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
