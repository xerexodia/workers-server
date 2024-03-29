import Client from '../Models/client';
import Post, { IPost } from '../Models/post';
import ReservedPost, { IResPost } from '../Models/reservedPost';

export type Payload = Omit<IPost, 'status' | 'createdAt' | 'updatedAt' | 'comments'>;
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
  async getByClientID(id: string): Promise<IPost[]> {
    const post = await Post.find({ clientId: id }).populate('clientId');
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
  async completedPost(postId: string): Promise<any> {
    const patchedPost = await Post.findByIdAndUpdate(postId, { status: 'completed' }, { new: true });
    console.log(patchedPost);
  }

  async getReservedPost(id: string): Promise<IResPost[]> {
    const resPost = await ReservedPost.find({ workerId: id }).populate('postId workerId');
    return resPost.filter((item: any) => item.postId.status === 'reserved');
  }
  async getCompletedPost(id: string): Promise<IResPost[]> {
    const res = await ReservedPost.find({ workerId: id }).populate('workerId postId');
    return res.filter((item: any) => item.postId.status === 'completed');
  }
}
