import mongoose, { Schema } from 'mongoose';

const clientSchema: Schema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  adresse: {
    type: String,
  },
  photo: {
    type: String,
  },
  profession: {
    type: String,
  },
  description: {
    type: String,
  },
  experience: {
    type: String,
  },
  avis: {
    type: Number,
  },
  role: {
    type: String,
    default: 'worker',
  },
});

exports.Worker = mongoose.model('Client', clientSchema);
