import { Injectable, Output, EventEmitter } from '@angular/core';

import { BaseService } from '../../../services/base.service';
import { IServiceCrud } from '../../../domain/interfaces/IServiceCrud';
import { Observable } from 'rxjs/Observable';
import { IResponse } from '../../../domain/interfaces/IResponse';


@Injectable()
export class EstabelecimentoService implements IServiceCrud{

  urlAPI = "Estabelecimento";

  constructor(private baseService: BaseService) { }

  @Output() updateEstabelecimento = new EventEmitter();

  GetAll() {
    return this.baseService.GetAll(this.urlAPI).toPromise();
  }
  GetById(id: any) {
    return this.baseService.GetById(this.urlAPI, id).toPromise();
  }
  Post(data: any) {
    return this.baseService.Post(this.urlAPI, data).toPromise();
  }
  Put(data: any, id: any) {
    return this.baseService.Put(this.urlAPI, data, id).toPromise();
  }
  Delete(id: any) {
    return this.baseService.Delete(this.urlAPI, id).toPromise();
  }
  Authenticate(data) {
    return this.baseService.Post(`${this.urlAPI}/authenticate`, data).toPromise();
  }
  
}
