import type {Donation} from "~/components/models/Donation";
import {DonationType} from "~/components/models/DonationType";
import {addDays, addWeeks, maxOf, subtractDays} from "~/utils/DateUtils";

const delayInWeeks: number[][] = [[12, 2, 4], [2, 2, 2], [4, 2, 4]];

export function getLatest1(type: DonationType | undefined, donations: Donation[]): Donation | undefined {
  const latest1 = getLatest(type, donations, 1);
  if (latest1 !== undefined && latest1.length == 1) {
    return latest1[0];
  }
  return undefined;
}

export function getLatest(type: DonationType | undefined, donations: Donation[], count: number): Donation[] {
  if (type !== undefined) {
    donations = donations.filter((donation) => donation.type === type);
  }
  return donations
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(-count);
}

function getAllSince(types: DonationType[] | undefined, donations: Donation[], lowerBoundaryDate: Date): Donation[] {
  if (types !== undefined) {
    donations = donations.filter((donation) => types.includes(donation.type));
  }
  return donations
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter((donation) => donation.date.getTime() >= lowerBoundaryDate.getTime());
}

export function computeNextDonationDates(donations: Donation[], baseDate?: Date): Date[] {
  const latestDonation : Donation | undefined = getLatest1(undefined, donations);
  const today = baseDate || new Date();
  return [
    computeNextBloodDonationDate(donations, latestDonation, today),
    computeNextPlasmaDonationDate(donations, latestDonation, today),
    computeNextPlateletsDonationDate(donations, latestDonation, today)
  ]
}

function computeNextBloodDonationDate(donations: Donation[], latest: Donation | undefined, baseDate?: Date): Date {
  let next : Date = baseDate || new Date();
  if (latest !== undefined) {
    // 1) Compute theoretical date
    // @ts-ignore
    next = addWeeks(latest.date, delayInWeeks[DonationType.BLOOD][latest.type])

    // 2) Apply restrictions
    const latest4: Donation[] = getLatest(DonationType.BLOOD, donations, 4)
    // Maximum 4 donations during 365 days
    if (latest4.length == 4) {
      if (latest4[0]) {
        return maxOf(addDays(latest4[0].date, 365), next);
      }
    }
  }

  return next;
}

function computeNextPlasmaDonationDate(donations: Donation[], latest: Donation | undefined, baseDate?: Date): Date {
  let next : Date = baseDate || new Date();
  if (latest !== undefined) {
    // 1) Compute theoretical date
    // @ts-ignore
    next = addWeeks(latest.date, delayInWeeks[DonationType.PLASMA][latest.type])

    // 2) Apply restrictions
    const latest23: Donation[] = getLatest(DonationType.PLASMA, donations, 23)
    // Maximum 23 donations during 365 days
    if (latest23.length == 23) {
      if (latest23[0]) {
        return maxOf(addDays(latest23[0].date, 365), next);
      }
    }
  }

  return next;
}

function computeNextPlateletsDonationDate(donations: Donation[], latest: Donation | undefined, baseDate?: Date): Date {
  let next : Date = baseDate || new Date();
  if (latest !== undefined) {
    // 1) Compute theoretical date
    // @ts-ignore
    next = addWeeks(latest.date, delayInWeeks[DonationType.PLATELETS][latest.type])

    // 2) Apply restrictions
    const selectionSince365: Donation[] = getAllSince([DonationType.PLATELETS, DonationType.BLOOD], donations, subtractDays(baseDate || new Date(), 365))
    // Maximum 24 platelets *and* blood donations during 365 days
    if (selectionSince365.length == 24) {
      if (selectionSince365[0]) {
        return maxOf(addDays(selectionSince365[0].date, 365), next);
      }
    }
  }

  return next;
}
