import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ng2-materialize';
import { Router } from '@angular/router';

import { EstabelecimentoService } from '../service/estabelecimento.service';
import { IResponse } from '../../../domain/interfaces/IResponse';

@Component({
  selector: 'app-estabelecimento-list',
  templateUrl: './estabelecimento-list.component.html',
  styleUrls: ['./estabelecimento-list.component.css']
})
export class EstabelecimentoListComponent implements OnInit {

  imageUrl: string = '../../../assets/images/';
  items = [];
  loading: boolean = false;

  constructor(private estabelecimentoService: EstabelecimentoService,
              private toastService: MzToastService,
              private router: Router) { }

  
  ngOnInit() {
    this.loadList();
  }

  edit(id) {
    this.router.navigate(['dashboard', 'estabelecimentos', 'editar', id]);
  }

  loadList() {    
    this.loading = true;
    this.estabelecimentoService.GetAll().toPromise()
      .then((res: IResponse) => {
        this.items = res.data;
        this.items.map((item) => {
          item.caminhoImage = this.imageUrl + item.caminhoImage;
        })
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      })    
  }

  deleteDB(id) {
    this.estabelecimentoService.Delete(id).toPromise()
      .then((res:IResponse) => {
        this.items = this.items.filter((item) => {          
          return item.id !== id;
        });
        this.toastService.show(res.message, 4000, 'green');
      })
      .catch((err:IResponse) => {
        this.toastService.show(err.error.message, 4000, 'red')
      })
  }

}
