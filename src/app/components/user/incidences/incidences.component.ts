import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IncidenceService } from 'src/app/services/incidence.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-incidences',
  templateUrl: './incidences.component.html',
  styleUrls: ['./incidences.component.scss'],
})
export class IncidencesComponent implements OnInit {
  text: FormControl;
  incidenceForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private incidenceService: IncidenceService,
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

    const userId = this.localStorageService.get('user_id');

    this.incidenceService
      .sendIncidence(this.incidenceForm.value.text, userId, null)
      .subscribe(
        () => {
          responseOK = true;
          this.incidenceForm.reset();
          //TODO: Show toast

          //this._router.navigate(['profile']);
        },
        (error) => {
          console.log('Error es ', error);
          responseOK = false;
          errorResponse = error.error;
        }
      );
  }
}
