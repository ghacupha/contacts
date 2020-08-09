export interface IContact {
  id?: number;
  contactName?: string;
  department?: string;
  telephoneExtension?: string;
  phoneNumber?: string;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public contactName?: string,
    public department?: string,
    public telephoneExtension?: string,
    public phoneNumber?: string
  ) {}
}
