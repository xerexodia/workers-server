import {
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
  TsoaResponse,
  UploadedFile,
} from 'tsoa';
import express from 'express';
import fs from 'fs';
import { hashIt, validateEmail } from '../../utils/helpers';
import { IWorker } from '../../Models/worker';
import { WorkersServices } from '../../Services/workerServices';
import { IPost } from '../../Models/post';
import { PostServices } from '../../Services/postServices';
import { IResPost } from '../../Models/reservedPost';

// post controller
@Route('post')
export class PostController extends Controller {
  // add a post
  @SuccessResponse('201', 'created successfully') // Custom success response
  @Post()
  public async createPost(
    @FormField() title: string,
    @FormField() adresse: string,
    @FormField() description: string,
    @FormField() clientId: string,
    @UploadedFile() photo: Express.Multer.File,
    @Request() req: express.Request,
  ): Promise<IPost> {
    const b64 = Buffer.from(photo?.buffer as any).toString('base64');
    const buffer = Buffer.from(b64, 'base64');
    const imagename = `${Date.now()}.jpeg`;
    fs.writeFileSync(`./src/uploads/${imagename}`, buffer);
    const basePath = `${req?.protocol}://${req?.get('host')}/src/uploads/`;
    const post = await new PostServices().create({
      title,
      adresse,
      description,
      clientId,
      photo: `${basePath}${imagename}`,
    });
    return post;
  }
  //   get all posts
  @SuccessResponse('201', 'fetched successfully') // Custom success response
  @Get()
  public async getPosts(): Promise<IPost[]> {
    const posts = await new PostServices().getAll();
    return posts;
  }

  // get post by id
  @SuccessResponse('201', 'fetched successfully') // Custom success response
  @Get('{postId}')
  public async getPostById(@Path() postId: string): Promise<IPost> {
    const posts = await new PostServices().getById(postId);
    return posts;
  }

  // update post
  @SuccessResponse('201', 'updated successfully') // Custom success response
  @Patch('{postId}')
  public async updatePost(
    @Request() req: express.Request,
    @Path() postId: string,
    @FormField() title?: string,
    @FormField() adresse?: string,
    @FormField() description?: string,
    @FormField() clientId?: string,
    @UploadedFile() photo?: Express.Multer.File,
  ): Promise<IPost> {
    const b64 = Buffer.from(photo?.buffer as any).toString('base64');
    const buffer = Buffer.from(b64, 'base64');
    const imagename = `${Date.now()}.jpeg`;
    fs.writeFileSync(`./src/uploads/${imagename}`, buffer);
    const basePath = `${req?.protocol}://${req?.get('host')}/src/uploads/`;
    const post = await new PostServices().update(postId, {
      title,
      adresse,
      description,
      clientId,
      photo: `${basePath}${imagename}`,
    });
    return post!;
  }

  //delete a post
  @SuccessResponse('201', 'deleted successfully') // Custom success response
  @Delete('{postId}')
  public async delete(@Path() postId: string): Promise<void> {
    await new PostServices().delete(postId);
  }
  @SuccessResponse('201', 'deleted successfully') // Custom success response
  @Patch()
  public async reserve(
    @Query() postId: string,
    @Query() workerId: string,
    @Res() reservedPost: TsoaResponse<401, { msg: string }>,
  ): Promise<IResPost> {
    const post = await new PostServices().getById(postId);
    if (post?.status === 'reserved' || post?.status === 'completed') {
      return reservedPost(401, { msg: 'reserved task' });
    }
    const resPost = await new PostServices().reservePost(postId, workerId);
    return resPost!;
  }
}
