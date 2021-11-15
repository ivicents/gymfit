export class UserDTO {
  id?: string;
  access_token?: string;
  name: string;
  surname: string;
  gender: string;
  birthday: Date;
  email: string;
  password: string;

  constructor(
    name: string,
    surname: string,
    gender: string,
    birthday: Date,
    email: string,
    password: string
  ) {
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.birthday = birthday;
    this.email = email;
    this.password = password;
  }
}
