import Client from '../Models/client';
import Post, { IPost } from '../Models/post';
import ReservedPost, { IResPost } from '../Models/reservedPost';

export type Payload = Omit<IPost, 'status' | 'createdAt' | 'updatedAt'>;
export class PostServices {
  async create(payload: Payload): Promise<IPost> {
    const date = new Date().toLocaleDateString('en-GB');
    return await new Post({ ...payload, createdAt: date }).save();
  }
  async update(id: string, payload: Payload): Promise<IPost> {
    const date = new Date().toLocaleDateString('en-GB');
    const post = await Post.findByIdAndUpdate(id, { ...payload, createdAt: date }, { new: true });
    return post!;
  }
  async getById(id: string): Promise<IPost> {
    const post = await Post.findById(id).populate('clientId');
    return post!;
  }
  async getAll(): Promise<IPost[]> {
    const post = await Post.find({ status: 'pending' }).populate('clientId');
    return post!;
  }
  async delete(id: string): Promise<void> {
    await Post.findByIdAndRemove(id);
  }

  async reservePost(postId: string, workerId: string): Promise<IResPost | undefined> {
    const patchedPost = await Post.findByIdAndUpdate(postId, { status: 'reserved' }, { new: true });
    if (patchedPost) {
      const resPost = await new ReservedPost({ postId: postId, workerId: workerId }).save();
      return resPost.populate('postId workerId')!;
    }
    return;
  }
}
