export class ExerciseDTO {
  id?: string;
  name: string;
  description: string;
  repetitions: number;
  weight: number;

  constructor(
    name: string,
    description: string,
    repetitions: number,
    weight: number
  ) {
    this.name = name;
    this.description = description;
    this.repetitions = repetitions;
    this.weight = weight;
  }
}
