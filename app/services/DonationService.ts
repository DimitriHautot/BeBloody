import type {Donation} from "~/components/models/Donation";
import {DonationType} from "~/components/models/DonationType";

const delayInWeeks: number[][] = [[12, 2, 4], [2, 2, 2], [4, 2, 4]];

export function computeNextDonationDates(donations: Donation[]): Date[] {
  const latestDonation : Donation | undefined = getLatest1(donations, undefined);
  return [
    computeNextBloodDonationDate(donations, latestDonation),
    computeNextPlasmaDonationDate(donations, latestDonation),
    computeNextPlateletsDonationDate(donations, latestDonation)
  ]
}

function getLatest1(donations: Donation[], type: DonationType | undefined): Donation | undefined {
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
    .sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, count-1) || [];
}

function computeNextBloodDonationDate(donations: Donation[], latest: Donation | undefined): Date {
  let next : Date = new Date();
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

function computeNextPlasmaDonationDate(donations: Donation[], latest: Donation | undefined): Date {
  let next : Date = new Date();
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

function computeNextPlateletsDonationDate(donations: Donation[], latest: Donation | undefined): Date {
  let next : Date = new Date();
  if (latest !== undefined) {
    // 1) Compute theoretical date
    // @ts-ignore
    next = addWeeks(latest.date, delayInWeeks[DonationType.PLATELETS][latest.type])

    // 2) Apply restrictions
    const latest24: Donation[] = getLatest(DonationType.PLATELETS, donations, 24)
    // Maximum 24 donations during 365 days
    if (latest24.length == 24) {
      if (latest24[0]) {
        return maxOf(addDays(latest24[0].date, 365), next);
      }
    }
  }

  return next;
}

// ---
// https://www.convex.dev/typescript/ecosystems-integrations/date-time/typescript-date#adding-or-subtracting-days

function maxOf(date1: Date, date2: Date) {
  if (date1.getTime() < date2.getTime()) {
    return date2;
  }

  return date1;
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
