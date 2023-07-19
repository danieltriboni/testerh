import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  formControls!: string[];
  reduceName: string | undefined

  constructor( private formBuilder: FormBuilder,
                private router: Router,
                private user: UserService,
                private register: RegisterService,
                private validationService: ValidationService)
  {
    this.createForm();
    this.formErrors = this.validationService.errorMessages;
    this.reduceName = this.user.getUserName()
  }

  createForm() {
    this.simpleForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        cnpj: ["", [Validators.required]],
        cep: ["", [Validators.required]],
        endereco: [""],
        bairro: [""],
        complemento: [""],
        cidade: [""],
        estado: [""],
        cpf: ["", [Validators.required]],
        celular: ["", [Validators.required]],
        admin: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]]
      }
    );
    this.formControls = Object.keys(this.simpleForm.controls);
  }

  ngOnInit(): void {}

  getCEP(ev: any)
  {
    let _cep = ev.target.value
    if (_cep.length == 8)
    {
      this.register.getCEP(_cep).subscribe(result => {
        console.log(result)
        this.simpleForm.controls['endereco'].setValue(result.logradouro)
        this.simpleForm.controls['complemento'].setValue(result.complemento)
        this.simpleForm.controls['cidade'].setValue(result.localidade)
        this.simpleForm.controls['bairro'].setValue(result.bairro)
        this.simpleForm.controls['estado'].setValue(result.uf)
      })
    }
  }

  onValidate() {
    this.submitted = true;
    return this.simpleForm.status === "VALID";
  }

  onSubmit() {
    if (this.onValidate()) {
       this.user.addUser(this.simpleForm.value).then(result => {
        console.log(result)
        alert("Usuário Salvo com sucesso!");
      })
    }
  }

  
}
