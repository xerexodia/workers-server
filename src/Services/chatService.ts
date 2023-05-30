import Chat from '../Models/chatRoom';
import Msg, { IMsg } from '../Models/msg';

export default class ChatRoom {
  public async createChat(clientId: string, workerId: string): Promise<any> {
    const chat = await new Chat({ workerId, clientId }).save();
    return chat.populate('workerId clientId');
  }

  public async postMsg(payload?: IMsg): Promise<any> {
    const msg = await new Msg(payload).save();
    return msg;
    //   const id = msg._id;
    //   const chatRoom = await Chat.findById(chatRoomId);
    //   chatRoom?.msgs.push(id);
    //   chatRoom?.save();
    //   return chatRoom?.populate('msgs');
  }
}
