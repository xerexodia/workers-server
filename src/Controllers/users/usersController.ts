import multer from 'multer';
import { IClient } from '../../Models/client';
import { ClientsService, Payload } from '../../Services/clientsService';
import {
  Body,
  Controller,
  FormField,
  Get,
  Patch,
  Path,
  Post,
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
import { hashIt, validateEmail } from '../../utils/helpers';
@Tags('clients')
@Route('clients')
export class UserssRegisterController extends Controller {
  // post client controller
  @SuccessResponse('201', 'Bienvenue') // Custom success response
  @Patch('update/{id}')
  public async updateClient(
    @Path() id: string,
    @FormField() nom?: string,
    @FormField() prenom?: string,
    @FormField() email?: string,
    @FormField() password?: string,
    @FormField() adresse?: string,
    @UploadedFile() photo?: Express.Multer.File,
    @Request() req?: express.Request,
  ): Promise<any> {
    let path: any = '';
    if (photo) {
      const b64 = Buffer.from(photo?.buffer as any).toString('base64');
      const buffer = Buffer.from(b64, 'base64');
      const imagename = `${Date.now()}.jpeg`;
      fs.writeFileSync(`./src/uploads/${imagename}`, buffer);
      const basePath = `${req?.protocol}://${req?.get('host')}/src/uploads/`;
      path = `${basePath}${imagename}`;
    }

    const hashedPwd = hashIt(password);
    return await new ClientsService().updateClient(id, {
      nom,
      prenom,
      email,
      password: hashedPwd,
      adresse,
      photo: path,
    });
  }
}
