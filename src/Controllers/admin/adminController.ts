import { Body, Controller, Delete, Get, Path, Post, Res, Response, Route, Tags } from 'tsoa';
import { IAdmin } from '../../Models/admin';
import { AdminService } from '../../Services/adminService';
import { IClient } from '../../Models/client';
import { ClientsService } from '../../Services/clientsService';
import { IWorker } from '../../Models/worker';
import { WorkersServices } from '../../Services/workerServices';
import { IPost } from '../../Models/post';
import { PostServices } from '../../Services/postServices';
import { MaterialpostServices } from '../../Services/materialpostServices';
import { IMaterialPost } from '../../Models/materialpost';

@Route('/admin')
@Tags('AdminController')
export class AdminController extends Controller {
  // login....
  @Post('/login')
  @Response('201', 'welcome')
  public async create(@Body() requestBody: IAdmin): Promise<IAdmin> {
    const admin = await new AdminService().loginAdmin(requestBody.email!);
    return admin;
  }
  // get clients
  @Get('/clients')
  @Response('201', 'data fetched succesfully')
  public async getAllClients(): Promise<IClient[]> {
    return await new ClientsService().getAll();
  }
  //get Client by id
  @Get('/clients/{id}')
  @Response('201', 'client fetched successfully')
  public async getClient(@Path() id: string): Promise<IClient> {
    const client = await new ClientsService().get(id);
    return client!;
  }
  //delete client
  @Delete('/clients/{id}')
  @Response('201', 'client deleted successfully')
  public async deleteClient(@Path() id: string): Promise<void> {
    await new ClientsService().deleteClient(id);
  }

  // get workers
  @Get('/workers')
  @Response('201', 'data fetched succesfully')
  public async getAllWorkers(): Promise<IWorker[]> {
    return await new WorkersServices().getAllWorkers();
  }
  //get worker by id
  @Get('/workers/{id}')
  @Response('201', 'worker fetched successfully')
  public async getWorkerById(@Path() id: string): Promise<IWorker> {
    const worker = await new WorkersServices().getById(id);
    return worker!;
  }
  //delete worker
  @Delete('/workers/{id}')
  @Response('201', 'worker deleted successfully')
  public async deleteWorker(@Path() id: string): Promise<void> {
    await new WorkersServices().deleteWorker(id);
  }

  //get posts
  @Get('/posts')
  @Response('201', 'data fetched successfully')
  public async getAllPosts(): Promise<IPost[]> {
    return await new PostServices().getAll();
  }
  // get posts by id
  @Get('/posts/{id}')
  @Response('201', 'post fetched successfully')
  public async getPostById(@Path() id: string): Promise<IPost> {
    return await new PostServices().getById(id);
  }
  // delete posts by id
  @Delete('/posts/{id}')
  @Response('201', 'post deleted successfully')
  public async deletePost(@Path() id: string): Promise<void> {
    await new PostServices().delete(id);
  }
  //get material posts
  @Get('/materialPosts')
  @Response('201', 'data fetched successfully')
  public async getAllMaterialPosts(): Promise<IMaterialPost[]> {
    return await new MaterialpostServices().getAll();
  }
  // get material posts by id
  @Get('/materialPosts/{id}')
  @Response('201', 'post fetched successfully')
  public async getMaterialPostById(@Path() id: string): Promise<IMaterialPost> {
    return await new MaterialpostServices().getById(id);
  }
  // delete material posts by id
  @Delete('/materialPosts/{id}')
  @Response('201', 'post deleted successfully')
  public async deleteMaterialPost(@Path() id: string): Promise<void> {
    await new PostServices().delete(id);
  }
}
