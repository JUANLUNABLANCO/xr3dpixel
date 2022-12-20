export class User {

  constructor (
    public name: string,
    public email: string,
    public provider?: string,
    public id_network?: string,
    public salt?: string,
    public password?: string,
    public url_photo?: string,
    public role?: string,
    public _id?: string
  ) {}
}
