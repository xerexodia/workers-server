import {
  Body,
  Controller,
  Delete,
  FormField,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Request,
  Res,
  Route,
  SuccessResponse,
  Tags,
  TsoaResponse,
  UploadedFile,
} from 'tsoa';
import express from 'express';
import fs from 'fs';
import { IMaterialPost } from '../../Models/materialpost';
//import { hashIt, validateEmail } from '../../utils/helpers';
import { IWorker } from '../../Models/worker';
//import { WorkersServices } from '../../Services/workerServices';
import { MaterialpostServices } from '../../Services/materialpostServices';
import { IComment } from '../../Models/comments';
import { CommentServices } from '../../Services/commentService';
import { ClientsService } from '../../Services/clientsService';
import { WorkersServices } from '../../Services/workerServices';
import ChatRoom from '../../Services/chatService';
import { IMsg } from '../../Models/msg';

interface IRequest {
  content: string;
  from: string;
}
// chat controller
@Tags('chat')
@Route('/chat')
export class ChatController extends Controller {
  // add a chatRoom
  @SuccessResponse('201', 'created successfully') // Custom success response
  @Post('{firstUser}/{secondUser}')
  public async addComment(@Path() firstUser: string, @Path() secondUser: string): Promise<any> {
    const chatRoom = await new ChatRoom().createChat(firstUser, secondUser);
    return chatRoom;
  }
  // add a msg

  @SuccessResponse('201', 'created successfully') // Custom success response
  @Post('msg/{chatRoomId}')
  public async addMsg(@Path() chatRoomId?: string, @Body() request?: IMsg): Promise<any> {
    const msgs = await new ChatRoom().postMsg(request);
    return msgs;
  }
}
