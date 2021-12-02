import { ExerciseDTO } from './exercise.dto';

export class WorkoutDTO {
  id?: string;
  name: string;
  exercises: ExerciseDTO[];

  constructor(name: string, exercises: ExerciseDTO[]) {
    this.name = name;
    this.exercises = exercises;
  }
}
