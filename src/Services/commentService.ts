import Comment, { IComment } from '../Models/comments';

export class CommentServices {
  async create(payload: IComment): Promise<IComment> {
    return await new Comment(payload).save();
  }
}
