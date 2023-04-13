import multer from 'multer';
import { IClient } from '../../Models/client';
import { ClientsService } from '../../Services/clientsService';
import { Controller, FormField, Get, Path, Post, Request, Route, SuccessResponse, UploadedFile } from 'tsoa';
import express from 'express';
import fs from 'fs';
import { hashIt } from '../../utils/helpers';

@Route('clients')
export class ClientsController extends Controller {
  // get client by id
  @Get('{id}')
  public async getUser(@Path() id: string): Promise<IClient | null> {
    return new ClientsService().get(id);
  }

  // post client controller
  @SuccessResponse('201', 'Bienvenue') // Custom success response
  @Post()
  public async createClient(
    @FormField() nom?: string,
    @FormField() prenom?: string,
    @FormField() email?: string,
    @FormField() password?: string,
    @FormField() adresse?: string,
    @UploadedFile() photo?: Express.Multer.File,
    @Request() req?: express.Request,
  ): Promise<IClient | null | undefined> {
    try {
      const b64 = Buffer.from(photo?.buffer as any).toString('base64');
      const buffer = Buffer.from(b64, 'base64');
      console.log(buffer);
      const imagename = `${Date.now()}.jpeg`;
      fs.writeFileSync(`./src/uploads/${imagename}`, buffer);
      const basePath = `${req?.protocol}://${req?.get('host')}/src/uploads/`;
      const hashedPwd = hashIt(password);

      return await new ClientsService().create({
        nom,
        prenom,
        email,
        password: hashedPwd,
        adresse,
        photo: `${basePath}${imagename}`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
