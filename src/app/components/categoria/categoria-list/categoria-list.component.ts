import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Categoria } from "../../../domain/entities/Categoria";
import { CategoriaService } from '../service/categoria.service';
import { IResponse } from '../../../domain/interfaces/IResponse';
import { LoaderComponent } from '../../loader/loader/loader.component'
import { MzModalComponent, MzToastService } from 'ng2-materialize';
import { Table } from '../../table/model/table'
import { convertDate } from '../../../helper';

@Component({
	selector: 'app-categoria-list',
	templateUrl: './categoria-list.component.html',
	styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

	tableConfig: Table
	form: FormGroup;
	obj: Categoria[] = [];
	loadingList = false;
	loadingModal = false;
	isSubmit = true;

	isEdit = false;
	objEdit: Categoria;

	@ViewChild('modalCategoria') modalCategoria: MzModalComponent;

	constructor(
		private categoriaService: CategoriaService,
		private formBuilder: FormBuilder,
		private toastService: MzToastService) {
	}

	ngOnInit() {
		this.loadList();
		this.tableConfigure();

		this.form = this.formBuilder.group({
			nome: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(30)
			])],
			descricao: [null, Validators.maxLength(100)]
		});
	}

	tableConfigure() {
		this.tableConfig = {
			columns: [
			{ title: "Id", nameData: "id"},
			{ title: "Nome", nameData: "nome" },
			{ title: "Descrição", nameData: "descricao" }
			],
			readOnly: false
		}
	}

	public modalOptions: Materialize.ModalOptions = {
		inDuration: 400,
		outDuration: 400,
		complete: () => {
			this.isSubmit = true;
			this.loadingModal = false;
			this.resetModal();
		}
	};

	validateFields = {
		nome: {
			required: "Este campo é obrigatório.",
			maxlength: "Limite máximo de 30 caracteres excedido."
		},
		descricao: {
			maxlength: "Limite máximo de 100 caracteres excedido."
		}
	}

	resetModal() {
		this.form.reset();
	}

	loadList() {
		this.loadingList = true;
		this.categoriaService.GetAll()
		.subscribe((res: IResponse) => {
				this.obj = res.data;
				this.loadingList = false;
			},
			err => {
				console.log(err);
			}
		);
	}

	getById(id) {
		this.categoriaService
			.GetById(id)
			.toPromise()
			.then((res: IResponse) => {
				this.modalCategoria.open();
				this.form.setValue({
					nome: res.data.nome,
					descricao: res.data.descricao
				});
				this.objEdit = res.data;
				this.isEdit = true;
			})
			.catch(() => {
				this.loadingModal = false;
			}
		);
	}

	onSubmit() {
		if(!this.isSubmit)
			return;

		if(this.isEdit) {
			this.objEdit.nome = this.form.value.nome;
			this.objEdit.descricao = this.form.value.descricao;

			this.editDB();
		}
		else {
			this.insertDB();
			this.isEdit = false;
		}
	}

	insertDB() {
		this.loadingModal = true;
		this.isSubmit = false;

		this.categoriaService.Post(this.form.value).subscribe(
			(res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.obj.unshift(res.data);
				this.modalCategoria.close();
			},
			err => {
				console.log(err.error.message);
			}
		);
	}

	editDB() {
		this.loadingModal = true;
		this.categoriaService.Put(this.objEdit, this.objEdit.id).subscribe(
			(res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.obj.map(function(item) {
					if(item.id === this.objEdit.id) {
						item.nome = this.objEdit.nome;
						item.descricao = this.objEdit.descricao;
					}
				}.bind(this))

				this.modalCategoria.close();
			},
			err => {
				console.log(err);
			}
		);
		this.loadingModal = false;
		this.isEdit = false;
	}


	deleteDB(id) {
		this.categoriaService.Delete(id).subscribe(
			(res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.obj = this.obj.filter(function(item) {
					return item.id != id;
				})
			},
			err => {
				this.toastService.show(err.error.message, 4000, 'red')
			}
		);
	}
}
