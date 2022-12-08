import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base/base-form/base-form.component';
import {
  Establishment,
  Professional,
  Schedule,
} from 'src/app/shared/interfaces';
import { MessageService } from 'src/app/shared/services';
import { EstablishmentContextService } from 'src/app/shared/services/establishment-context.service';
import { EstablishmentService } from '../../establishment/services';
import { ScheduleService } from '../services';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
})
export class ScheduleFormComponent extends BaseFormComponent<Schedule> {
  establishment!: Establishment;

  constructor(
    protected activateRoute: ActivatedRoute,
    private _establishmentService: EstablishmentService,
    private _establishmentContextService: EstablishmentContextService,
    protected formBuilder: FormBuilder,
    protected messageService: MessageService,
    protected router: Router,
    protected scheduleService: ScheduleService
  ) {
    super(activateRoute, scheduleService, formBuilder, messageService, router);
    this.findEstablishment();
  }

  buildFormControls() {
    return {
      id: [null],
      establishment: [null, Validators.required],
      date: [null, Validators.required],
      status: ['Available', Validators.required],
      userSus: [null],
      professional: [null, Validators.required],
    };
  }

  async findEstablishment(): Promise<void> {
    const id = this._establishmentContextService.getContext()!.id;
    this.establishment = await this._establishmentService.getById(id);

    this.form.patchValue({ establishment: this.establishment });
  }

  compareOptionsSelect(op1: Professional, op2: Professional): boolean {
    return op1 && op2 ? op1.id === op2.id : op1 === op2;
  }

  patchValue(schedule: Schedule): void {
    schedule.date = moment(schedule.date).format('yyyy-MM-DDTHH:mm');
    super.patchValue(schedule);
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const timezone = '-03:00';
      const datetime = this.form.get('date')!.value + timezone;
      
      this.form.patchValue({ date: datetime });
    }

    super.onSubmit();
  }
}
