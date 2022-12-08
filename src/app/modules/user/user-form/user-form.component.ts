import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import { Establishment, User } from 'src/app/shared/interfaces';
import { MessageService, UserService } from 'src/app/shared/services';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { EstablishmentService } from '../../establishment/services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends BaseFormComponent<User> {
  filteredEstablishmentsOptions: Observable<Establishment[]>;
  searchEstablishmentsControl = new FormControl();

  constructor(
    protected activateRoute: ActivatedRoute,
    private _establishmentService: EstablishmentService,
    protected formBuilder: FormBuilder,
    protected messageService: MessageService,
    protected router: Router,
    protected userService: UserService
  ) {
    super(activateRoute, userService, formBuilder, messageService, router);

    this.filteredEstablishmentsOptions = this.observeEstablishmentSearch();
  }

  buildFormControls() {
    return {
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      role: [null, Validators.required],
      allowedEstablishments: this.formBuilder.array([]),
    };
  }

  get isEmployee(): boolean {
    return this.form.get('role')?.value === 'Employee';
  }

  get formAllowedEstablishments(): FormArray {
    return this.form.get('allowedEstablishments') as FormArray;
  }

  patchValue(user: User): void {
    super.patchValue(user);

    user.allowedEstablishments.forEach((establishment) => {
      this.addAllowedEstablishment(establishment);
    });
  }

  observeEstablishmentSearch(): Observable<Establishment[]> {
    return this.searchEstablishmentsControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => {
        return this.searchEstablishments(search || '');
      })
    );
  }

  async searchEstablishments(search: string): Promise<Establishment[]> {
    return (await this._establishmentService.getAll(search, 0, 10)).items;
  }

  addAllowedEstablishment(establishment: Establishment): void {
    var control = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      address: this.formBuilder.group({
        city: this.formBuilder.group({
          name: [null],
          state: [null],
        }),
      }),
    });

    control.patchValue(establishment);
    this.formAllowedEstablishments.push(control);

    this.clearSearchEstablishment();
  }

  clearSearchEstablishment(): void {
    this.searchEstablishmentsControl.setValue('');
  }

  removeAllowedEstablishment(index: number): void {
    this.formAllowedEstablishments.removeAt(index);
  }

  getCityName(establishment: AbstractControl): string {
    var city = establishment.get('address')?.get('city');

    return city?.get('name')?.value + ' - ' + city?.get('state')?.value;
  }
}
