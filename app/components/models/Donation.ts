import {DonationType} from "~/components/models/DonationType";

export class Donation {
  public readonly type: DonationType;
  public readonly date: Date;

  public constructor(type: DonationType | string, date: Date) {
    if (this.isDonationType(type)) {
      this.type = type;
    } else {
      this.type = this.toDonationType(type);
    }
    this.date = date;
  }

  private isDonationType(type: DonationType | string): type is DonationType {
    return type === 'BLOOD' || type === 'PLASMA' || type === 'PLATELETS';
  }

  private toDonationType(value: string | number): DonationType {
    if (!value) {
      throw new Error(`Non-empty donation type is not supported`);
    }
    if (typeof value === "number") {
      switch (value) {
        case 0:
          return DonationType.BLOOD;
        case 1:
          return DonationType.PLASMA;
        case 2:
          return DonationType.PLATELETS;
      }
    } else {
      if (value.toLowerCase() === "blood") {
        return DonationType.BLOOD;
      }
      if (value.toLowerCase() === "plasma") {
        return DonationType.PLASMA;
      }
      if (value.toLowerCase() === "platelets") {
        return DonationType.PLATELETS;
      }
    }

    throw new Error(`Donation type ${value} is not supported`);
  }
}