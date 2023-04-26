import mongoose from 'mongoose';

export interface IWorker extends mongoose.Document {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  adresse?: string;
  photo?: string;
  role?: string;
  profession?: string;
  description?: string;
  experience?: string;
  avis?: number;
}

const workerSchema = new mongoose.Schema<IWorker>({
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
  avis: {
    type: Number,
  },
  experience: {
    type: String,
  },
  role: {
    type: String,
    default: 'worker',
  },
});

const Worker = mongoose.model<IWorker>('Worker', workerSchema);
export default Worker;
