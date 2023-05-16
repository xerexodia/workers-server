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

// comment controller
@Tags('comments')
@Route('/comment')
export class CommentController extends Controller {
  // add a comment
  @SuccessResponse('201', 'created successfully') // Custom success response
  @Post()
  public async addComment(@Body() request: IComment): Promise<IComment> {
    const comment = await new CommentServices().create(request);
    return comment;
  }
  //fetch comments
  @SuccessResponse('200', 'created successfully') // Custom success response
  @Get()
  public async getAllComments(@Query() postId: string): Promise<any> {
    const comment = new CommentServices().getAllByCommentsId(postId);
    const data = Promise.all(
      (await comment).map(async (item) => {
        const worker = await new WorkersServices().getById(item.creatorId!);
        const client = await new ClientsService().get(item.creatorId!);
        if (client) {
          return { comment: item, user: client };
        } else if (worker) {
          return { comment: item, user: worker };
        } else return;
      }),
    );
    return data;
  }
  //upadte comment
  @SuccessResponse('201', 'updated successfully') // Custom success response
  @Patch('{id}')
  public async UpdateComment(@Body() request: IComment, @Path() id: string): Promise<IComment> {
    const comment = await new CommentServices().update(id, request);
    return comment!;
  }
  //delete comment
  @SuccessResponse('204', 'deleted successfully') // Custom success response
  @Delete('{id}')
  public async delete(@Path() id: string): Promise<void> {
    await new CommentServices().delete(id);
  }
}
