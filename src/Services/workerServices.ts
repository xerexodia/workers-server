import Worker, { IWorker } from '../Models/worker';
// A post request should not contain an id.

export type Payload = Pick<
  IWorker,
  'nom' | 'prenom' | 'adresse' | 'email' | 'password' | 'photo' | 'experience' | 'avis' | 'description' | 'profession'
>;

export class WorkersServices {
  // get worker by id
  public async getById(id: string): Promise<IWorker | null> {
    const client = await Worker.findById(id);
    return client;
  }
  // create worker
  public async create(payload: Payload) {
    let worker = {
      ...payload,
    };
    return await new Worker(worker).save();
  }

  // get worker by profession
  public async getByProfession(profession: string): Promise<IWorker[]> {
    const reg = new RegExp(profession, 'g');
    const worker = await Worker.find({ profession: { $regex: reg } });

    return worker;
  }

  // update by id
  public async update(id: string, payload: Payload): Promise<IWorker> {
    const worker = await Worker.findByIdAndUpdate(id, { ...payload }, { new: true });
    return worker!;
  }
  public async findWorker(email: string): Promise<IWorker | undefined> {
    const worker = await Worker.findOne({ email });
    if (worker) return worker!;
    return;
  }
}
