import mongoose from 'mongoose';

export interface IMaterialPost {
  title?: string;
  description?: string;
  updatedAt?: string;
  workerId?: string;
  adresse?: string;
  photo?: string;
  createdAt: string;
}

const materialpostSchema = new mongoose.Schema<IMaterialPost>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  },
  adresse: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  photo: {
    type: String,
  },

});

const materialpost = mongoose.model<IMaterialPost>('materialpost', materialpostSchema);
export default materialpost;
