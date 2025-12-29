import {DonationType} from "~/components/models/DonationType";

export class Donation {
  public readonly type: DonationType;
  public readonly date: Date;

  public constructor(type: DonationType | string | number, date: Date) {
    if (this.isDonationType(type)) {
      this.type = type;
    } else {
      this.type = this.toDonationType(type);
    }
    this.date = date;
  }

  private isDonationType(type: DonationType | string | number): type is DonationType {
    if (typeof type === 'object') {
      return type === DonationType.BLOOD || type === DonationType.PLASMA || type === DonationType.PLATELETS;
    }
    return false;
  }

  private toDonationType(value: string | number): DonationType {
    if (value != null) {
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
        switch (value.toLowerCase()) {
          case "blood":
            return DonationType.BLOOD;
          case "plasma":
            return DonationType.PLASMA;
          case "platelets":
            return DonationType.PLATELETS;
        }
      }
    }

    throw new Error(`Donation type (type: ${typeof value}, value: '${value}') is not supported`);
  }
}
