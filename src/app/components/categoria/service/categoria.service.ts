import { Injectable } from '@angular/core';
import { IServiceCrud } from '../../../domain/interfaces/IServiceCrud';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../../../domain/interfaces/IResponse';
import { BaseService } from '../../../services/base.service';

@Injectable()
export class CategoriaService implements IServiceCrud {

  urlAPI = "Categoria";

  constructor(private base: BaseService) { }

  GetAll(): Observable<IResponse> {
    return this.base.GetAll(this.urlAPI);
  }
  GetById(id: any): Observable<IResponse> {
    return this.base.GetById(this.urlAPI, id);
  }
  Post(data: any): Observable<IResponse> {
    return this.base.Post(this.urlAPI, data);
  }
  Put(data: any, id: any): Observable<IResponse> {
    return this.base.Put(this.urlAPI, data, id);
  }
  Delete(id: any): Observable<IResponse> {
    return this.base.Delete(this.urlAPI, id);
  }

}
