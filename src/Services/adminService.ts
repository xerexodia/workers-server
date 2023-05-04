import Admin, { IAdmin } from '../Models/admin';

export class AdminService {
  async loginAdmin(email: string): Promise<IAdmin> {
    const user = await Admin.findOne({ email });
    return user!;
  }
}
