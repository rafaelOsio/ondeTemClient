import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Categoria } from '../../../domain/entities/Categoria';
import { Estabelecimento } from '../../../domain/entities/Estabelecimento';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { EstabelecimentoService } from '../../estabelecimento/service/estabelecimento.service';
import { IResponse } from '../../../domain/interfaces/IResponse';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../../../domain/entities/Produto';
import { MzToastService, MzModalComponent } from 'ng2-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-produto-form',
	templateUrl: './produto-form.component.html',
	styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

	@Input() object: Produto = new Produto();
	@ViewChild("modalLoading") modalLoading: MzModalComponent;
	formProduto: FormGroup;
	categorias: Categoria[] = [];

	imagePreview: any = "";

	constructor(private formBuilder: FormBuilder,
		private categoriaS: CategoriaService,
		private produtoS: ProdutoService,
		private toastService: MzToastService,
		private active: ActivatedRoute,
		private router: Router,
		private authS: AuthService) { }

	ngOnInit() {
		this.buildForm();
		this.getCategorias();
		this.getParam();
	}

	public modalOptions: Materialize.ModalOptions = {
		dismissible: false
	};

	getParam() {
		this.active.params.subscribe((params) => {
			const id = params.id;
			if(id){
				this.getById(id);
			}
		})
	}

	getById(id) {
		this.produtoS.GetById(id)
			.then((res: IResponse) => {
				this.object = res.data;
			})
			.catch((err) => {
				console.log(err);
			})
	}

	getCategorias() {
		this.categoriaS.GetAll().toPromise()
			.then((res: IResponse) => {
				this.categorias = res.data;
			})
			.catch((err) => {
				console.log(err);
			})
	}

	buildForm() {
		this.formProduto = this.formBuilder.group({
			nome: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(100)
			])],
			descricao: [null, Validators.compose([
				Validators.maxLength(500)
			])],
			categoriaId: [null, Validators.compose([
				Validators.required
			])],
			imageHash: [null]
		})
	}

	validateFields = {
		nome: {
			required: "Este campo é obrigatório",
			maxlength: "Limite máximo de 100 caracteres excedido."
		},
		descricao: {
			maxlength: "Limite máximo de 500 caracteres excedido."
		},
		categoriaId: {
			required: "Este campo é obrigatório",
		}
	}

	submitForm() {
		if(this.object.id) {
			this.editDb();
		}
		else {
			this.insertDb();
		}
	}

	insertDb() {
		this.modalLoading.open();

		this.object.estabelecimentoId = this.authS.currentUser['id'];

		this.produtoS.Post(this.object)
			.then((res) => {
				this.toastService.show(res.message, 4000, "green");
				this.formProduto.reset();
				this.modalLoading.close();
			})
			.catch((err) => {
				this.toastService.show("Ocorreu um erro. Tente novamente.", 4000, 'red');
				this.modalLoading.close();
			})
	}

	editDb() {
		this.modalLoading.open();

		this.produtoS.Put(this.object, this.object.id)
			.then((res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.router.navigate(["/dashboard/produtos"])
				this.modalLoading.close();
			})
			.catch((err: IResponse) => {
				this.toastService.show("Ocorreu um erro. Tente novamente.", 4000, 'red');
				this.modalLoading.close();
			})

	}

	fileChange(event) {
		var image:any = new Image();
		var file:File = event.target.files[0];
		var myReader:FileReader = new FileReader();
		myReader.onloadend = function (loadEvent:any) {
			image.src = loadEvent.target.result;
			this.imagePreview = image.src;
			var hash = image.src.split(",");
			this.object.imageHash = hash[1];
		}.bind(this);

		myReader.readAsDataURL(file);
	}

}