import mongoose from 'mongoose';

export interface IResPost extends mongoose.Document {
  postId?: string;
  workerId?: string;
  reservedAt: string;
}

const resPostSchema = new mongoose.Schema<IResPost>({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  },
  reservedAt: {
    type: String,
    default: new Date().toLocaleDateString('es-GB'),
  },
});

const ReservedPost = mongoose.model<IResPost>('ResPost', resPostSchema);
export default ReservedPost;
