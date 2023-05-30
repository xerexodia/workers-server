import mongoose from 'mongoose';

export interface IMsg {
  content?: string;
  from?: string;
}

const msgSchema = new mongoose.Schema<IMsg>(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

const Msg = mongoose.model<IMsg>('Msg', msgSchema);
export default Msg;
