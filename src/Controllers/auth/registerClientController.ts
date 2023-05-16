import multer from 'multer';
import { IClient } from '../../Models/client';
import { ClientsService, Payload } from '../../Services/clientsService';
import {
  Body,
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
    @Body() request: Pick<IClient, 'nom' | 'prenom' | 'password' | 'adresse' | 'email'>,
  ): Promise<any> {
    const client = await new ClientsService().findClient(request.email!);
    if (client) {
      return { msg: 'you have already an account' };
    } else {
      if (!validateEmail(request.email!)) return { msg: 'wrong mail' };
      if (request.password!.length <= 8) return { msg: 'password must be at least 8 characters' };

      const hashedPwd = hashIt(request.password);

      return await new ClientsService().create({
        ...request,
        password: hashedPwd,
      });
    }
  }
}
