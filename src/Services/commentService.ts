import Comment, { IComment } from '../Models/comments';

export class CommentServices {
  async create(payload: IComment): Promise<IComment> {
    const comment = await new Comment(payload).save();
    return comment.populate('creatorId');
  }
  async getAllByCommentsId(id: string): Promise<IComment[]> {
    return await Comment.find({ postId: id });
  }
  async delete(id: string): Promise<void> {
    await Comment.findByIdAndRemove(id);
  }
  async update(id: string, payload: IComment): Promise<IComment> {
    const comment = await Comment.findByIdAndUpdate(id, payload, { new: true });
    return comment!;
  }
}
