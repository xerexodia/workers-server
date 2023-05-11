import mongoose from 'mongoose';

export interface IComment {
  creatorId?: string;
  postId: string;
  content?: string;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    creatorId: {
      type: String,
    },
    postId: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
