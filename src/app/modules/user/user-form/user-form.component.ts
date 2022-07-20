import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { MessageService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  newUser = true;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
  }

  async ngOnInit(): Promise<void> {
    const id: number = this._activateRoute.snapshot.params.id;

    if (id) {
      this.newUser = false;
      const user = await this._userService.getById(id);
      this.form.patchValue(user);
    }
  }

  buildFormControls() {
    return {
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    };
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    var user: User = this.form.getRawValue();

    if (user.id) {
      await this._userService.update(user.id, user);
      this._messageService.show('Usuário atualizado com sucesso!');
    } else {
      await this._userService.save(user);
      this._messageService.show('Usuário salvo com sucesso!');
    }

    this.returnToList();
  }

  returnToList(): void {
    this._router.navigate(['..'], { relativeTo: this._activateRoute });
  }
}
