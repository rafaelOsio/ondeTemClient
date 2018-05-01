import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { IServiceCrud } from '../../../domain/interfaces/IServiceCrud';
import { IResponse } from '../../../domain/interfaces/IResponse';
import { BaseService } from '../../../services/base.service';
import { Produto } from '../../../domain/entities/Produto';
import { dataBancoParaDataTabela, pegaHorarioDaData, moedaBancoParaMoedaPt } from '../../../helper';

@Injectable()
export class ProdutoService implements IServiceCrud {
 
    urlAPI = "Produto";
    
    constructor(private baseS: BaseService) {
    }
    
    GetAll() {
        return this.baseS.GetAll(this.urlAPI).toPromise();
    }
    GetAllByEstabelecimento(id: any){
        return this.baseS.GetAll(this.urlAPI + "/GetAllByEstabelecimento/" + id)
            .toPromise()
            .then((res: IResponse) => {
                res.data.map((data: Produto) => {
                    data.dataCadastro = `${dataBancoParaDataTabela(data.dataCadastro)} ${pegaHorarioDaData(data.dataCadastro)}`
                    data.preco = moedaBancoParaMoedaPt(data.preco);
                    return data;
                });
                return res;
            })
    }
    GetById(id: any) {
        return this.baseS.GetById(this.urlAPI, id).toPromise();
    }
    Post(data: any) {
        return this.baseS.Post(this.urlAPI, data).toPromise();
    }
    Put(data: any, id: any) {
        return this.baseS.Put(this.urlAPI, data, id).toPromise();
    }
    Delete(id: any) {
        return this.baseS.Delete(this.urlAPI, id).toPromise();
    }
}