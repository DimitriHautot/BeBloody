export enum DonationType {
  BLOOD = 0,
  PLASMA = 1,
  PLATELETS = 2
}

export function toDonationType(value: string): DonationType {
  if (!value) {
    throw new Error(`Non-empty donation type is not supported`);
  }
  if (value.toLowerCase() === "blood") {
    return DonationType.BLOOD;
  }
  if (value.toLowerCase() === "plasma") {
    return DonationType.PLASMA;
  }
  if (value.toLowerCase() === "platelets") {
    return DonationType.PLATELETS;
  }

  throw new Error(`Donation type ${value} is not supported`);
}