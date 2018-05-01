import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { MzModalComponent, MzToastService } from 'ng2-materialize';
import { EstabelecimentoService } from '../service/estabelecimento.service';
import { IResponse } from '../../../domain/interfaces/IResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { Estabelecimento } from '../../../domain/entities/Estabelecimento';

@Component({
	selector: 'app-estabelecimento-form',
	templateUrl: './estabelecimento-form.component.html',
	styleUrls: ['./estabelecimento-form.component.css']
})
export class EstabelecimentoFormComponent implements OnInit {

	@Input() object: Estabelecimento = new Estabelecimento;
	formEstabelecimento: FormGroup;	
	isSubmit: boolean = false;

	imagePreview: any = "";

	@ViewChild("modalLoading") modalLoading: MzModalComponent;

	constructor(private formBuilder: FormBuilder,
				private estabelecimentoService: EstabelecimentoService,
				private toastService: MzToastService,
				private router: Router,
				private active: ActivatedRoute) {
	}

	public modalOptions: Materialize.ModalOptions = {
		dismissible: false
	};

	ngOnInit() {
		this.buildForm();
		this.getParam();
	}

	getParam() {
		this.active.params.subscribe((params) => {
			const id = params.id;
			if(id){
				this.getById(id);
			}
		})
	}

	replaceNumber(number) {
		if (!number) return;
	
		number = number.replace(/([a-zA-Z-()\s$%@!])/g, '');
		number = number.replace(/^(\d{2})/g,'($1)')
		number = number.replace(/(\d{1})(\d{4})/g, '$1$2-');
	
		return number;
	  }

	getById(id) {
		this.estabelecimentoService.GetById(id).toPromise()
			.then((res: IResponse) => {
				this.object = res.data;
			})
			.catch((err) => {
				console.log(err);
			})
	}

	onSubmit() {

		this.isSubmit = true;

		if(this.object.id) {
			this.editDb();
		} 
		else {
			this.insertDB();
		}

		this.isSubmit = false;
	}

	fileChange(event) {
		var image:any = new Image();
		var file:File = event.target.files[0];
		var myReader:FileReader = new FileReader();
		myReader.onloadend = function (loadEvent:any) {
			image.src = loadEvent.target.result;
			var hash = image.src.split(",")
			this.object.imageHash = hash[1];
			this.imagePreview = image.src;
		}.bind(this);

		myReader.readAsDataURL(file);
	}

	insertDB() {
		
		this.modalLoading.open();

		//temporário
		this.object.latitude = 0;
		this.object.longitude = 0;

		this.estabelecimentoService.Post(this.object).toPromise()
			.then((res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.formEstabelecimento.reset();
				this.modalLoading.close();
				this.router.navigate(["/dashboard/estabelecimentos"])
			})
			.catch((err: IResponse) => {
				this.toastService.show(err.error.message, 4000, 'green');
				this.modalLoading.close();
			})
	}

	editDb() {
		this.modalLoading.open();

		this.estabelecimentoService.Put(this.object, this.object.id).toPromise()
			.then((res: IResponse) => {
				this.toastService.show(res.message, 4000, 'green');
				this.router.navigate(["/dashboard/estabelecimentos"])
				this.modalLoading.close();
			})
			.catch((err: IResponse) => {
				this.toastService.show(err.error.message, 4000, 'red');
				this.modalLoading.close();
			})
	}

	buildForm() {
		this.formEstabelecimento = this.formBuilder.group({
			nome: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(65)
			])],
			rua: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(65)
			])],
			bairro: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(65)
			])],
			numero: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(10)
			])],
			complemento: [null, Validators.compose([
				Validators.maxLength(65)
			])],
			telefonePrincipal: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(14)
			])],
			telefoneSecundario: [null, Validators.compose([
				Validators.maxLength(14)
			])],
			mensagemParaClientes: [null, Validators.compose([
				Validators.maxLength(400)
			])],
			imageHash: [null]
		})
	}

	validateFields = {
		nome: {
			required: "Este campo é obrigatório",
			maxlength: "Limite máximo de 65 caracteres excedido."
		},
		rua: {
			required: "Este campo é obrigatório",
			maxlength: "Limite máximo de 65 caracteres excedido."
		},
		bairro: {
			required: "Este campo é obrigatório",
			maxlength: "Limite máximo de 65 caracteres excedido."
		},
		numero: {
			required: "Este campo é obrigatório",
			maxlength: "Limite máximo de 10 caracteres excedido."
		},
		complemento: {
			maxlength: "Limite máximo de 65 caracteres excedido."
		},
		telefonePrincipal: {
			required: "Este campo é obrigatório",
			maxlength: "Limite máximo de 14 caracteres excedido."
		},
		telefoneSecundario: {
			maxlength: "Limite máximo de 65 caracteres excedido."
		},
		mensagemParaClientes: {
			maxlength: "Limite máximo de 400 caracteres excedido."
		}
	}

}
