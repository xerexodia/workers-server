import Client from '../Models/worker';
import Post, { IMaterialPost } from '../Models/materialpost';

export type Payload = Omit<IMaterialPost, 'createdAt' | 'updatedAt'>;
export class MaterialpostServices {
  async create(payload: Payload): Promise<IMaterialPost> {
    const date = new Date().toLocaleDateString('en-GB');
    return await new Post({ ...payload, createdAt: date }).save();
  }
  async update(id: string, payload: Payload): Promise<IMaterialPost> {
    const date = new Date().toLocaleDateString('en-GB');
    const materialpost = await Post.findByIdAndUpdate(id, { ...payload, createdAt: date }, { new: true });
    return materialpost!;
  }
  async getById(id: string): Promise<IMaterialPost> {
    const materialpost = await Post.findById(id).populate('workerId');
    return materialpost!;
  }
  async getAll(): Promise<IMaterialPost[]> {
    const materialpost = await Post.find().populate('workerId');
    return materialpost!;
  }
  async delete(id: string): Promise<void> {
    await Post.findByIdAndRemove(id);
  }
}
