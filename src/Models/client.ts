import mongoose from 'mongoose';

export interface IClient extends mongoose.Document {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  adresse?: string;
  photo?: string;
  role?: string;
}

const clientSchema = new mongoose.Schema<IClient>({
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
  role: {
    type: String,
    default: 'client',
  },
});

const Client = mongoose.model<IClient>('User', clientSchema);
export default Client;
