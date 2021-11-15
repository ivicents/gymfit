export class AuthDTO {
  user_id: string;
  access_token: string;
  mode: string;
  email: string;
  password: string;

  constructor(
    user_id: string,
    access_token: string,
    mode: string,
    email: string,
    password: string
  ) {
    this.user_id = user_id;
    this.access_token = access_token;
    this.mode = mode;
    this.email = email;
    this.password = password;
  }
}
