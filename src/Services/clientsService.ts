import Client, { IClient } from '../Models/client';
// A post request should not contain an id.

export type Payload = Pick<IClient, 'nom' | 'prenom' | 'adresse' | 'email' | 'password' | 'photo'>;

export class ClientsService {
  public async get(id: string): Promise<IClient | null> {
    const client = await Client.findById(id);
    return client;
  }

  public async create(payload: Payload) {
    let client = {
      ...payload,
    };
    return await new Client(client).save();
  }
}
