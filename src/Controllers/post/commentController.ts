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

// comment controller
@Tags('comments')
@Route('/comment')
export class CommentController extends Controller {
  // add a comment
  @SuccessResponse('201', 'created successfully') // Custom success response
  @Post()
  public async addComment(@Body() request: IComment): Promise<IComment> {
    return await new CommentServices().create(request);
  }
  //fetch comments
  @SuccessResponse('200', 'created successfully') // Custom success response
  @Get()
  public async getAllComments(@Query() postId: string, @Query() userId: string): Promise<IComment[]> {
    return await new CommentServices().getAllByCommentsId(postId, userId);
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
