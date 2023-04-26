import mongoose from 'mongoose';

export interface IPost {
  title?: string;
  description?: string;
  updatedAt?: string;
  clientId?: string;
  adresse?: string;
  photo?: string;
  createdAt: string;
  status: 'pending' | 'reserved' | 'completed';
}

const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
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
  status: {
    type: String,
    default: 'pending',
  },
});

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
