import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MzToastService, MzModalComponent } from 'ng2-materialize';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Estabelecimento } from '../../../../domain/entities/Estabelecimento';
import { EstabelecimentoService } from '../../../estabelecimento/service/estabelecimento.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Input() estabelecimento: Estabelecimento = new Estabelecimento();
  @ViewChild("modalLoading") modalLoading: MzModalComponent;

  constructor(
    private formBuilder: FormBuilder,
    private estabelecimentoS: EstabelecimentoService,
    private toastService: MzToastService,
    private router: Router,
    private authSerice: AuthService) { }

  ngOnInit() {
    this.buildForm();

    var email = window.localStorage.getItem("email");
    if(email) 
      this.estabelecimento.email = email;
    
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
      rememberEmail: [false]
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
    }
  }

  onSubmit() {
    this.modalLoading.open();

    this.estabelecimentoS.Authenticate(this.form.value)
    .then((res) => {

      if(this.estabelecimento.rememberEmail) {
        window.localStorage.clear();
        window.localStorage.setItem("email", this.form.value.email);
      }

      this.modalLoading.close();
      
      this.authSerice.token = res.token;
      this.toastService.show("Autenticado com sucesso.", 4000, 'green');
      this.router.navigate(["/dashboard"]);
    })
    .catch((err) => {
      this.estabelecimento.password = "";
      this.modalLoading.close();
      this.toastService.show(err.error.message, 4000, 'red');
    })
  }

}
