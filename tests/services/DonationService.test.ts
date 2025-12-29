import {addDays} from "../../app/utils/DateUtils";
import {getLatest, getLatest1} from "../../app/services/DonationService";
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
});
