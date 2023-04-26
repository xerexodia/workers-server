import multer from 'multer';
import { IClient } from '../../Models/client';
import { ClientsService } from '../../Services/clientsService';
import {
  Controller,
  FormField,
  Get,
  Path,
  Post,
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

@Route('register/clients')
export class ClientsRegisterController extends Controller {
  // post client controller
  @SuccessResponse('201', 'Bienvenue') // Custom success response
  @Post()
  public async createClient(
    @Res() notFoundResponse: TsoaResponse<401, { msg: string }>,
    @FormField() nom: string,
    @FormField() prenom: string,
    @FormField() email: string,
    @FormField() password: string,
    @FormField() adresse: string,
    @Request() req: express.Request,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<IClient | undefined | string> {
    const client = await new ClientsService().findClient(email!);
    if (client) {
      return notFoundResponse(401, { msg: 'you have already an account' });
    } else {
      if (!validateEmail(email)) return notFoundResponse(401, { msg: 'wrong mail' });
      if (password.length <= 8) return notFoundResponse(401, { msg: 'password must be at least 8 characters' });
      const b64 = Buffer.from(photo?.buffer as any).toString('base64');
      const buffer = Buffer.from(b64, 'base64');
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
    }

    return;
  }
}
