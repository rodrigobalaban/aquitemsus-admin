import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: [
    './recover-password.component.scss',
    '../login/login.component.scss',
  ],
})
export class RecoverPasswordComponent {
  form: FormGroup;

  @Output()
  showLogin = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
  }

  buildFormControls() {
    return {
      email: [null, [Validators.email, Validators.required]],
    };
  }

  async resetPassword(): Promise<void> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.get('email')?.value;
    await this._userService.resetPassword(email);

    this._messageService.show(
      'Um e-mail foi enviado para ' + email + ' com a recuperação de senha.'
    );
    this.returnToLogin();
  }

  returnToLogin(): void {
    this.showLogin.emit();
  }
}
