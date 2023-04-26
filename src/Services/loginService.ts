import Client, { IClient } from '../Models/client';
import Worker, { IWorker } from '../Models/worker';
// A post request should not contain an id.

export type Payload = Pick<IWorker, 'email' | 'password'>;
export class LoginService {
  public async login(email: string): Promise<IWorker | IClient | undefined> {
    try {
      const client = await Client.findOne({ email });
      const worker = await Worker.findOne({ email });
      if (client) {
        return client;
      } else if (worker) {
        return worker;
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
