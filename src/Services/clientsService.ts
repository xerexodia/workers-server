import { resolve } from 'path';
import Client, { IClient } from '../Models/client';
// A post request should not contain an id.

export type Payload = Pick<IClient, 'nom' | 'prenom' | 'adresse' | 'email' | 'password'>;

export class ClientsService {
  //get client by id
  public async get(id: string): Promise<IClient> {
    const client = await Client.findById(id);
    return client!;
  }
  // get all clients
  public async getAll(): Promise<IClient[]> {
    return await Client.find();
  }
  // create client
  public async create(payload: Payload) {
    let client = {
      ...payload,
    };
    return await new Client(client).save();
  }
  // get client by email
  public async findClient(email: string): Promise<IClient | undefined> {
    const client = await Client.findOne({ email });
    if (client) {
      return client!;
    }
    return;
  }
  //delete client
  public async deleteClient(id: string): Promise<void> {
    await Client.findByIdAndRemove(id);
  }
  //update client
  public async updateClient(
    id: string,
    payload: Pick<IClient, 'nom' | 'prenom' | 'password' | 'email' | 'adresse' | 'photo'>,
  ): Promise<IClient> {
    const client = await Client.findByIdAndUpdate(id, payload, { new: true });
    return client!;
  }
}
