import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import { User } from 'src/app/shared/interfaces';
import { MessageService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends BaseFormComponent<User> {
  constructor(
    protected activateRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected messageService: MessageService,
    protected router: Router,
    protected userService: UserService
  ) {
    super(activateRoute, userService, formBuilder, messageService, router);
  }

  buildFormControls() {
    return {
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    };
  }
}
