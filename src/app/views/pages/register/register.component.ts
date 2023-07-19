import { Component } from "@angular/core";

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { ValidationService } from "src/app/services/validation.service";

/** passwords must match - custom validator */
export class PasswordValidators {
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password");
    const confirm = control.get("confirmPassword");
    if (password?.valid && password?.value === confirm?.value) {
      confirm?.setErrors(null);
      return null;
    }
    confirm?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
}

@Component({
  selector: "register-component",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  
})
export class RegisterComponent {
  simpleForm!: FormGroup;
  submitted = false;
  formErrors: any;
  formControls!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private validationService: ValidationService
  ) {
    this.formErrors = this.validationService.errorMessages;
    this.createForm();
  }

  createForm() {
    this.simpleForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(this.validationService.formRules.passwordMin),
            Validators.pattern(this.validationService.formRules.passwordPattern)
          ]
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(this.validationService.formRules.passwordMin),
            Validators.pattern(this.validationService.formRules.passwordPattern)
          ]
        ],
        accept: [false, [Validators.requiredTrue]]
      },
      { validators: [PasswordValidators.confirmPassword] }
    );
    this.formControls = Object.keys(this.simpleForm.controls);
  }

  onValidate() {
    this.submitted = true;
    return this.simpleForm.status === "VALID";
  }

  onSubmit() {
    if (this.onValidate()) {
      this.user.addUser(this.simpleForm.value).then(result => {
        this.router.navigateByUrl("dashboard");
        console.log(result)
        alert("SUCCESS!");
      })
    }
  }
}