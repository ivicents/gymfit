import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workouts-monitor-form',
  templateUrl: './workouts-monitor-form.component.html',
  styleUrls: ['./workouts-monitor-form.component.scss'],
})
export class WorkoutsMonitorFormComponent implements OnInit {
  private workoutId: string | null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.workoutId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Resultado es ', this.workoutId);
  }

  ngOnInit(): void {}
}
