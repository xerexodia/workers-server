import mongoose from 'mongoose';

export interface IMsg extends mongoose.Document {
  expidteur?: string;
  destinataire?: string;
  contenu?: string;
  createdAt?: string;
}

const messageSchema = new mongoose.Schema<IMsg>({
  expidteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ['Client', 'Worker'],
  },
  destinataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ['Client', 'Worker'],
  },
  contenu: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

const Msg = mongoose.model<IMsg>('Msg', messageSchema);
export default Msg;
