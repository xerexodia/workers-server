import mongoose from 'mongoose';
import { hashIt } from '../utils/helpers';

export interface IAdmin {
  email?: string;
  password?: string;
  role?: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    default: 'islemabdellaoui@gmail.com',
  },
  password: {
    type: String,
    default: hashIt('islem'),
  },
  role: {
    type: String,
    default: 'admin',
  },
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
