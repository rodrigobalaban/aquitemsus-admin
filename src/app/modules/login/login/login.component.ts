import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/shared/models';
import { AuthService, MessageService } from '../../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  displayPasswordRecovery = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
  }

  buildFormControls() {
    return {
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    };
  }

  login(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const userCredential: UserAuth = this.form.getRawValue();
    this._authService.authenticate(userCredential).then(
      () => this._router.navigate(['/']),
      () => this._messageService.show('E-mail e/ou senha inválidos. Verifique!')
    );
  }

  toggleRecoverPassword(): void {
    this.displayPasswordRecovery = !this.displayPasswordRecovery;
  }
}
