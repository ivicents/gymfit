import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { IncidenceService } from 'src/app/services/incidence.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-incidences-monitor',
  templateUrl: './incidences-monitor.component.html',
  styleUrls: ['./incidences-monitor.component.scss'],
})
export class IncidencesMonitorComponent implements OnInit {
  text: FormControl;
  incidenceForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private incidenceService: IncidenceService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {
    this.isValidForm = null;
    this.text = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(250),
    ]);

    this.incidenceForm = this.formBuilder.group({
      text: this.text,
    });
  }

  ngOnInit(): void {}

  async sendIncidence(): Promise<void> {
    let responseOK: boolean = false;
    let errorResponse: any;

    const monitorId = this.localStorageService.get('monitor_id');

    this.incidenceService
      .sendIncidence(this.incidenceForm.value.text, null, monitorId)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'toastFeedback',
            responseOK,
            errorResponse,
            'Incidencia enviada correctamente'
          );
        })
      )
      .subscribe(
        () => {
          responseOK = true;
          this.incidenceForm.reset();
        },
        (error) => {
          responseOK = false;
          errorResponse = error.error;
        }
      );
  }
}
