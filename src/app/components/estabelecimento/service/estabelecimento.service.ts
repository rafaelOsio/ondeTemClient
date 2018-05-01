import { Injectable } from '@angular/core';

import { BaseService } from '../../../services/base.service';
import { IServiceCrud } from '../../../domain/interfaces/IServiceCrud';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../../../domain/interfaces/IResponse';

@Injectable()
export class EstabelecimentoService implements IServiceCrud{

  urlAPI = "Estabelecimento";

  constructor(private baseService: BaseService) { }

  GetAll() {
    return this.baseService.GetAll(this.urlAPI);
  }
  GetById(id: any) {
    return this.baseService.GetById(this.urlAPI, id);
  }
  Post(data: any) {
    return this.baseService.Post(this.urlAPI, data);
  }
  Put(data: any, id: any) {
    return this.baseService.Put(this.urlAPI, data, id);
  }
  Delete(id: any) {
    return this.baseService.Delete(this.urlAPI, id);
  }
  Authenticate(data) {
    return this.baseService.Post(`${this.urlAPI}/authenticate`, data).toPromise();
  }
  
}
