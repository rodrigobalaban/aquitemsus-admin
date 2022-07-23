import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseRecord } from '../../interfaces/base-record';
import { MessageService } from '../../services';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-base-form',
  template: '',
  styles: [],
})
export class BaseFormComponent<T extends BaseRecord> implements OnInit {
  form: FormGroup;
  newRecord = true;
  successSaveMessage = 'Registro salvo com sucesso!';
  successUpdateMessage = 'Registro atualizado com sucesso!';

  constructor(
    protected activateRoute: ActivatedRoute,
    protected baseService: BaseService<T>,
    protected formBuilder: FormBuilder,
    protected messageService: MessageService,
    protected router: Router
  ) {
    this.form = this.formBuilder.group(this.buildFormControls());
  }

  async ngOnInit(): Promise<void> {
    const id: number = this.activateRoute.snapshot.params.id;

    if (id) {
      this.newRecord = false;

      const record = await this.baseService.getById(id);
      this.form.patchValue(record);
    }
  }

  buildFormControls(): any {}

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    var record: T = this.form.getRawValue();

    if (record.id) {
      await this.update(record);
    } else {
      await this.save(record);
    }

    this.returnToList();
  }

  private async save(record: T) {
    await this.baseService.save(record);
    this.messageService.show(this.successSaveMessage);
  }

  private async update(record: T) {
    await this.baseService.update(record.id, record);
    this.messageService.show(this.successUpdateMessage);
  }

  returnToList(): void {
    this.router.navigate(['..'], { relativeTo: this.activateRoute });
  }
}
