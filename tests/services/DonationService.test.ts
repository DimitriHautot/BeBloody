import {addDays, addWeeks} from "../../app/utils/DateUtils";
import {computeNextDonationDates, getLatest, getLatest1} from "../../app/services/DonationService";
import {Donation} from "../../app/components/models/Donation";
import {DonationType} from "../../app/components/models/DonationType";

describe('testing DonationService', () => {
  test('getLatest(undefined, [...], 2) should return the 2 latest donation entry, whatever its type, if none is specified', () => {
    // Given
    const now: Date = new Date();
    const donation1: Donation = new Donation(DonationType.PLASMA, addDays(now, -1));
    const donation2: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));
    const donation3: Donation = new Donation(DonationType.BLOOD, addDays(now, -3));

    // When
    const result: Donation[] = getLatest(undefined, [donation1, donation2, donation3], 2);

    // Then
    expect(result.length).toBe(2);
    expect(result[0]).toBe(donation2);
    expect(result[1]).toBe(donation1);
  })

  test('getLatest(PLATELETS, [...], 2) should return the 2 latest platelets donation entries', () => {
    // Given
    const now: Date = new Date();
    const donation1a: Donation = new Donation(DonationType.PLASMA, addDays(now, -1));
    const donation1b: Donation = new Donation(DonationType.PLASMA, addDays(now, -2));
    const donation1c: Donation = new Donation(DonationType.PLASMA, addDays(now, -3));
    const donation2a: Donation = new Donation(DonationType.PLATELETS, addDays(now, -1));
    const donation2b: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));
    const donation2c: Donation = new Donation(DonationType.PLATELETS, addDays(now, -3));
    const donation3a: Donation = new Donation(DonationType.BLOOD, addDays(now, -1));
    const donation3b: Donation = new Donation(DonationType.BLOOD, addDays(now, -2));
    const donation3c: Donation = new Donation(DonationType.BLOOD, addDays(now, -3));

    // When
    const result: Donation[] = getLatest(DonationType.PLATELETS, [donation1a, donation1b, donation1c,
      donation2a, donation2b, donation2c, donation3a, donation3b, donation3c], 2);

    // Then
    expect(result.length).toBe(2);
    expect(result[0]).toBe(donation2b);
    expect(result[1]).toBe(donation2a);
  })

  test('getLatest(BLOOD, [...], 2) should return the only blood  donation entry', () => {
    // Given
    const now: Date = new Date();
    const donation1a: Donation = new Donation(DonationType.PLASMA, addDays(now, -1));
    const donation1b: Donation = new Donation(DonationType.PLASMA, addDays(now, -2));
    const donation1c: Donation = new Donation(DonationType.PLASMA, addDays(now, -3));
    const donation2a: Donation = new Donation(DonationType.PLATELETS, addDays(now, -1));
    const donation2b: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));
    const donation2c: Donation = new Donation(DonationType.PLATELETS, addDays(now, -3));
    const donation3a: Donation = new Donation(DonationType.BLOOD, addDays(now, -1));

    // When
    const result: Donation[] = getLatest(DonationType.BLOOD, [donation1a, donation1b, donation1c,
      donation2a, donation2b, donation2c, donation3a], 2);

    // Then
    expect(result.length).toBe(1);
    expect(result[0]).toBe(donation3a);
  })

  test('getLatest1(undefined, [...]) should return the latest donation entry, whatever its type, if none is specified', () => {
    // Given
    const now: Date = new Date();
    const donation1: Donation = new Donation(DonationType.PLASMA, addDays(now, -1));
    const donation2: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));
    const donation3: Donation = new Donation(DonationType.BLOOD, addDays(now, -3));

    // When
    const result: Donation[] = getLatest1(undefined, [donation1, donation2, donation3]);

    // Then
    expect(result).toBe(donation1);
  })

  test('getLatest1(PLASMA, [...]) should return the latest PLASMA donation entry', () => {
    // Given
    const now: Date = new Date();
    const donation1: Donation = new Donation(DonationType.PLASMA, addDays(now, -1));
    const donation2: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));
    const donation3: Donation = new Donation(DonationType.BLOOD, addDays(now, -3));

    // When
    const result: Donation[] = getLatest1(DonationType.PLASMA, [donation1, donation2, donation3]);

    // Then
    expect(result).toBe(donation1);
  })

  test('getLatest1(PLASMA, [...]) should return \'undefined\' if no donation is of the specified type', () => {
    // Given
    const now: Date = new Date();
    const donation2: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));
    const donation3: Donation = new Donation(DonationType.BLOOD, addDays(now, -3));

    // When
    const result = getLatest1(DonationType.PLASMA, [donation2, donation3]);

    // Then
    expect(result).toBe(undefined);
  })

  test('computeNextDonationDates(Donation[]) should return an array of 3 dates', () => {
    // Given
    const blood1: Donation = new Donation(DonationType.BLOOD, new Date(2025, 0, 15)); // January 15th
    const plasma1: Donation = new Donation(DonationType.PLASMA, addWeeks(blood1.date, 2));  // January 29th
    const plasma2: Donation = new Donation(DonationType.PLASMA, addWeeks(plasma1.date, 2)); // February 12th
    const platelets1: Donation = new Donation(DonationType.PLATELETS, addWeeks(plasma2.date, 2)); // February 26th
    const platelets2: Donation = new Donation(DonationType.PLATELETS, addWeeks(platelets1.date, 4)); // March 26th
    const blood2: Donation = new Donation(DonationType.BLOOD, addWeeks(blood1.date, 12)); // April 9th

    // If we compute the next donation dates for each type of donation, the day after the latest actual donation event occurred on April 9th
    const nextBloodDonationDate = new Date(2025, 6, 2, 0, 0, 0, 0)
    const nextPlasmaDonationDate = new Date(2025, 3, 23, 0, 0, 0, 0)
    const nextPlateletsDonationDate = new Date(2025, 4, 7, 0, 0, 0, 0)

    // When
    const result = computeNextDonationDates([blood1, blood2, plasma1, plasma2, platelets1, platelets2], addDays(blood2.date, 1));

    // Then
    expect(result.length).toBe(3);
    expect(result[0].getTime()).toBeGreaterThanOrEqual(nextBloodDonationDate.getTime());
    expect(result[1].getTime()).toBeGreaterThanOrEqual(nextPlasmaDonationDate.getTime());
    expect(result[2].getTime()).toBeGreaterThanOrEqual(nextPlateletsDonationDate.getTime());
  })

  test('Blood donation - test restriction: maximum 4 donations per 365 days', () => {
    // Given
    const bloodDonation1: Donation = new Donation(DonationType.BLOOD, new Date(2025, 1, 1))
    // The law seems to say that the minimum is 2 months between 2 donations, which is +/- 9 weeks
    const bloodDonation2: Donation = new Donation(DonationType.BLOOD, addWeeks(bloodDonation1.date, 9))
    const bloodDonation3: Donation = new Donation(DonationType.BLOOD, addWeeks(bloodDonation2.date, 9))
    const bloodDonation4: Donation = new Donation(DonationType.BLOOD, addWeeks(bloodDonation3.date, 9))

    // When
    const today = addWeeks(bloodDonation4.date, 9);
    const result = computeNextDonationDates([bloodDonation1, bloodDonation2, bloodDonation3, bloodDonation4], today)

    // Then
    expect(result.length).toBe(3);
    expect(result[0].getTime()).toBeGreaterThanOrEqual(addDays(bloodDonation1.date, 365).getTime());
  })
});
