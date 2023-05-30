import mongoose from 'mongoose';

const chat = new mongoose.Schema(
  {
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    msgs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Msg',
      },
    ],
  },
  { timestamps: true },
);

const Chat = mongoose.model('Chat', chat);
export default Chat;
