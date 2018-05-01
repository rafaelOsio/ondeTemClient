import { Observable } from 'rxjs/Observable';
import { IResponse } from './IResponse';

export interface IServiceCrud {
  urlAPI: string;
  GetAll();
  GetById(id);
  Post(data);
  Put(data, id);
  Delete(id);
}