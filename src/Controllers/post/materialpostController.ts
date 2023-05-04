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
import { IMaterialPost } from '../../Models/materialpost';
//import { hashIt, validateEmail } from '../../utils/helpers';
import { IWorker } from '../../Models/worker';
//import { WorkersServices } from '../../Services/workerServices';
import { MaterialpostServices } from '../../Services/materialpostServices';

// materialpost controller
@Route('/materialpost')
export class materialPostController extends Controller {
  // add a materialpost
  @SuccessResponse('201', 'created successfully') // Custom success response
  @Post()
  public async createPost(
    @FormField() title: string,
    @FormField() adresse: string,
    @FormField() description: string,
    @FormField() workerId: string,
    @UploadedFile() photo: Express.Multer.File,
    @Request() req: express.Request,
  ): Promise<IMaterialPost> {
    const b64 = Buffer.from(photo?.buffer as any).toString('base64');
    const buffer = Buffer.from(b64, 'base64');
    const imagename = `${Date.now()}.jpeg`;
    fs.writeFileSync(`./src/uploads/${imagename}`, buffer);
    const basePath = `${req?.protocol}://${req?.get('host')}/src/uploads/`;
    const materialpost = await new MaterialpostServices().create({
      title,
      adresse,
      description,
      workerId,
      photo: `${basePath}${imagename}`,
    });
    return materialpost;
  }
  //   get all materialposts
  @SuccessResponse('201', 'fetched successfully') // Custom success response
  @Get()
  public async getmaterialposts(): Promise<IMaterialPost[]> {
    const materialposts = await new MaterialpostServices().getAll();
    return materialposts;
  }

  // get materialpost by id
  @SuccessResponse('201', 'fetched successfully') // Custom success response
  @Get('{materialpostId}')
  public async getPostById(@Path() materialpostId: string): Promise<IMaterialPost> {
    const posts = await new MaterialpostServices().getById(materialpostId);
    return posts;
  }

  // update materialpost
  @SuccessResponse('201', 'updated successfully') // Custom success response
  @Patch('{materialpostId}')
  public async updatematerialPost(
    @Request() req: express.Request,
    @Path() materialpostId: string,
    @FormField() title?: string,
    @FormField() adresse?: string,
    @FormField() description?: string,
    @FormField() workerId?: string,
    @UploadedFile() photo?: Express.Multer.File,
  ): Promise<IMaterialPost> {
    const b64 = Buffer.from(photo?.buffer as any).toString('base64');
    const buffer = Buffer.from(b64, 'base64');
    const imagename = `${Date.now()}.jpeg`;
    fs.writeFileSync(`./src/uploads/${imagename}`, buffer);
    const basePath = `${req?.protocol}://${req?.get('host')}/src/uploads/`;
    const post = await new MaterialpostServices().update(materialpostId, {
      title,
      adresse,
      description,
      workerId,
      photo: `${basePath}${imagename}`,
    });
    return post!;
  }

  //delete a materialpost
  @SuccessResponse('201', 'deleted successfully') // Custom success response
  @Delete('{materialpostId}')
  public async delete(@Path() materialpostId: string): Promise<void> {
    await new MaterialpostServices().delete(materialpostId);
  }
}
