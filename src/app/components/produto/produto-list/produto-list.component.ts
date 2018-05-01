import { Component, OnInit } from '@angular/core';

import { Table } from '../../table/model/table';
import { Produto } from '../../../domain/entities/Produto';
import { ProdutoService } from '../service/produto.service';
import { EstabelecimentoService } from '../../estabelecimento/service/estabelecimento.service';
import { Estabelecimento } from '../../../domain/entities/Estabelecimento';
import { IResponse } from '../../../domain/interfaces/IResponse';
import { MzToastService } from 'ng2-materialize';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-produto-list',
	templateUrl: './produto-list.component.html',
	styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

	tableConfig: Table
	produtos: Produto[] = [];

	loadingList: boolean = false;

	constructor(private produtoS: ProdutoService,
		private toastService: MzToastService,
		private router: Router,
		private authS: AuthService) { }

	ngOnInit() {
		this.tableConfiguration();
		this.getAllProdutos();
	}

	getAllProdutos() {
		this.loadingList = true;

		this.produtoS.GetAllByEstabelecimento(this.authS.currentUser['id'])
			.then((res: IResponse) => {
				this.loadingList = false;
				this.produtos = res.data;
			})
			.catch((err: IResponse) => {
				console.log(err);
			})
	}

	edit(id) {
		this.router.navigate(['dashboard', 'produtos', 'editar', id]);
	}

	deleteDB(id) {
		this.produtoS
			.Delete(id)
			.then((res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.produtos = this.produtos.filter((item) => {
					return item.id != id;
				})
			})
			.catch((err: IResponse) => {
				this.toastService.show(err.error.message, 4000, 'red');
			})
	}

	tableConfiguration() {
		this.tableConfig = {
			columns: [
				{ title: "Id", nameData: "id" },
				{ title: "Nome", nameData: "nome"},
				{ title: "Acessos", nameData: "acessos"},
				{ title: "Data cadastro", nameData: "dataCadastro"}
			],
			readOnly: false
		}
	}

}
