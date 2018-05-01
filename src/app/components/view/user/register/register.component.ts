import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MzModalComponent, MzToastService } from 'ng2-materialize';
import { IResponse } from '../../../../domain/interfaces/IResponse';
import { Router } from '@angular/router';
import { Estabelecimento } from '../../../../domain/entities/Estabelecimento';
import { EstabelecimentoService } from '../../../estabelecimento/service/estabelecimento.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	form: FormGroup;
	@Input() estabelecimento: Estabelecimento = new Estabelecimento();
	@ViewChild("modalLoading") modalLoading: MzModalComponent;

	constructor(private formBuilder: FormBuilder,
		private estabelecimentoS: EstabelecimentoService,
		private toastService: MzToastService,
		private router: Router) { }

	ngOnInit() {
		this.buildForm();
	}

	public modalOptions: Materialize.ModalOptions = {
		dismissible: false
	};

	buildForm() {
		this.form = this.formBuilder.group({
			email: [null, Validators.compose([
				Validators.required,
				Validators.maxLength(100),
				Validators.email
			])],
			password: [null, Validators.compose([
				Validators.required
			])],
			passwordRepeat: [null, Validators.compose([
				Validators.required
			])]
		})
	}

	validateFields = {
		email: {
			required: "Este campo é obrigatório.",
			maxLength: "Este campo aceita apenas 100 caracteres.",
			email: "Email inválido."
		},
		password: {
			required: "Este campo é obrigatório."
		},
		passwordRepeat: {
			required: "Este campo é obrigatório."
		}
	}

	verifyPassword() {
		if (this.estabelecimento.password !== this.estabelecimento.passwordRepeat)
			return false;

		return true;
	}

	onSubmit() {

		if (!this.verifyPassword()) {
			this.toastService.show("As senhas não coincidem.", 4000, 'red');			
			this.estabelecimento.passwordRepeat = "";
			return;
		}

		this.modalLoading.open();

		this.estabelecimentoS.Post(this.estabelecimento)
			.toPromise()
			.then((res: IResponse) => {
				this.router.navigate(["/"]);
				this.toastService.show("Cadastrado com sucesso. Seja bem vindo ao 'OndeTem?'.", 4000, 'green');
				this.modalLoading.close();
			})
			.catch((err: IResponse) => {
				this.toastService.show(err.error.message, 4000, 'red');
				this.modalLoading.close();
			})
	}

}
