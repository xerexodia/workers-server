import multer from 'multer';
import { IClient } from '../../Models/client';
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
import { compareIt, hashIt } from '../../utils/helpers';
import { IWorker } from '../../Models/worker';
import { LoginService, Payload } from '../../Services/loginService';

@Route('login')
export class LoginUserController extends Controller {
  // login user controller
  @SuccessResponse('201', 'Welcome back') // Custom success response
  @Post()
  public async loginUser(
    @Body() body: Payload,
    @Res() notFoundResponse: TsoaResponse<404, { msg: string }>,
  ): Promise<IWorker | IClient | string | undefined> {
    const user = await new LoginService().login(body!.email!);
    //cheking for existence of user
    if (!user) {
      return notFoundResponse(404, { msg: "user doesn't exist" });
    } else {
      // checking for password matching
      const match = compareIt(body!.password!, user!.password!);
      console.log(match);
      if (!match) {
        return notFoundResponse(404, { msg: 'wrong password' });
      } else return user;
    }
  }
}
