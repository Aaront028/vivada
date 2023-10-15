export class Contact {
  id: string;
  name: string;
  email: string;
  phone: string | undefined;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
