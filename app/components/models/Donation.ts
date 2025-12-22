import type {DonationType} from "~/components/models/DonationType";

export class Donation {
  public readonly type: DonationType;
  public readonly date: Date;

  public constructor(type: DonationType, date: Date) {
    this.type = type;
    this.date = date;
  }
}