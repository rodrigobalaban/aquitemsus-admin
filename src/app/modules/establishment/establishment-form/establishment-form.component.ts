import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import {
  Category,
  City,
  Establishment,
  OpeningHours,
  Professional,
  Specialty,
} from 'src/app/shared/interfaces';
import { MessageService } from 'src/app/shared/services';
import {
  CityService,
  EstablishmentService,
  EstablishmentCategoryService,
  SpecialtyService,
} from '../services';

@Component({
  selector: 'app-establishment-form',
  templateUrl: './establishment-form.component.html',
  styleUrls: ['./establishment-form.component.scss'],
})
export class EstablishmentFormComponent extends BaseFormComponent<Establishment> {
  categories: Category[] = [];
  displayedColumns = ['name', 'delete'];
  filteredCityOptions: Observable<City[]>;
  filteredSpecialtyOptions: Observable<Specialty[]>;
  searchSpecialtiesControl = new FormControl();

  constructor(
    protected activatedRoute: ActivatedRoute,
    private _cityService: CityService,
    protected establishmentService: EstablishmentService,
    private _establishmentCategoryService: EstablishmentCategoryService,
    protected formBuilder: FormBuilder,
    protected messageService: MessageService,
    protected router: Router,
    private _specialtyService: SpecialtyService
  ) {
    super(
      activatedRoute,
      establishmentService,
      formBuilder,
      messageService,
      router
    );

    this.getCategories();
    this.filteredCityOptions = this.observeCityName();
    this.filteredSpecialtyOptions = this.observeSpecialtySearch();
  }

  buildFormControls() {
    return {
      id: [null],
      name: [null, Validators.required],
      category: [null, Validators.required],
      alwaysOpen: [false, Validators.required],
      openingHours: this.formBuilder.array([]),
      localization: this.formBuilder.group({
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
      }),
      address: this.formBuilder.group({
        street: [null, Validators.required],
        number: [null, Validators.required],
        complement: [null],
        district: [null, Validators.required],
        city: [null, Validators.required],
      }),
      email: [null, Validators.email],
      phone: [null, Validators.required],
      specialties: this.formBuilder.array([]),
      professionals: this.formBuilder.array([]),
      scheduling: [false, Validators.required],
    };
  }

  get formAddress(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get formLocalization(): FormGroup {
    return this.form.get('localization') as FormGroup;
  }

  get formOpeningHours(): FormArray {
    return this.form.get('openingHours') as FormArray;
  }

  get formProfessionals(): FormArray {
    return this.form.get('professionals') as FormArray;
  }

  get formSpecialties(): FormArray {
    return this.form.get('specialties') as FormArray;
  }

  get establishmentSpecialties(): Specialty[] {
    return this.formSpecialties.value;
  }

  async getCategories(): Promise<void> {
    this.categories = await this._establishmentCategoryService.getAll();
  }

  patchValue(establishment: Establishment): void {
    super.patchValue(establishment);

    establishment.specialties.forEach((specialty) => {
      this.addSpecialty(specialty);
    });

    establishment.openingHours.forEach((openingHours) => {
      this.addOpeningHours(openingHours);
    });

    establishment.professionals.forEach((professional) => {
      this.addProfessional(professional);
    });
  }

  observeCityName(): Observable<City[]> {
    return this.formAddress.get('city')?.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => {
        const name = typeof search === 'string' ? search : search?.name;
        return this.searchCities(name || '');
      })
    ) as Observable<City[]>;
  }

  searchCities(search: string): Observable<City[]> {
    return this._cityService.getAll(search, 0, 10);
  }

  displayCity(city: City): string {
    if (!city) {
      return '';
    }

    return city.name + ' - ' + city.state;
  }

  observeSpecialtySearch(): Observable<Specialty[]> {
    return this.searchSpecialtiesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => {
        return this.searchSpecialties(search || '');
      })
    );
  }

  searchSpecialties(search: string): Observable<Specialty[]> {
    return this._specialtyService.getAll(search, 0, 10);
  }

  addSpecialty(specialty: Specialty): void {
    var control = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
    });

    control.patchValue(specialty);
    this.formSpecialties.push(control);

    this.clearSearchSpecialty();
  }

  removeSpecialty(index: number): void {
    this.formSpecialties.removeAt(index);
  }

  clearSearchSpecialty(): void {
    this.searchSpecialtiesControl.setValue('');
  }

  addProfessional(professional?: Professional): void {
    var control = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      specialty: [null, Validators.required],
    });

    if (professional) {
      control.patchValue(professional);
    }

    this.formProfessionals.push(control);
  }

  removeProfessional(index: number): void {
    this.formProfessionals.removeAt(index);
  }

  addOpeningHours(openingHours?: OpeningHours): void {
    var control = this.formBuilder.group({
      id: [null],
      dayOfWeek: [null, Validators.required],
      openingTime: [null, Validators.required],
      closingTime: [null, Validators.required],
    });

    if (openingHours) {
      control.patchValue(openingHours);
    }

    this.formOpeningHours.push(control);
  }

  removeOpeningHours(index: number): void {
    this.formOpeningHours.removeAt(index);
  }

  compareOptionsSelect(
    c1: Category | Specialty,
    c2: Category | Specialty
  ): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
