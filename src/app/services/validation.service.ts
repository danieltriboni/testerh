import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  constructor() {
    this.errorMessages = {
      name: {
        required: 'Nome completo obrigatório',
      },
      email: {
        required: 'required',
        email: 'Endereço de e-mail incorreto',
      },
      password: {
        required: 'Senha incorreta',
        pattern: 'A senha deve conter: Maiúsculas, minúsculas e números',
        minLength: `A senha deve conter ao menos ${this.formRules.passwordMin} caracteres`
      },
      confirmPassword: {
        required: 'Confirmação de senha incorreta',
        passwordMismatch: 'As senhas não conferem'
      },
      accept: {
        requiredTrue: 'Você deve aceitar os Termos e Condições'
      },
    };
  }
}