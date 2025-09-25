export class Donation {
  public readonly type: string;
  public readonly date: Date;

  public constructor(type: string, date: Date) {
    this.type = type;
    this.date = date;
  }
}