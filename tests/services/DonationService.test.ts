import {getLatest, addDays} from "../../app/services/DonationService";
import {Donation} from "../../app/components/models/Donation";
import {DonationType} from "../../app/components/models/DonationType";

describe('testing DonationService', () => {
  test('getLatest(undefined, [...], 1) should return the latest donation entry, whatever its type, if none is specified', () => {
    // Given
    const now: Date = new Date();
    const donation1: Donation = new Donation(DonationType.PLASMA, addDays(now, -1));
    const donation2: Donation = new Donation(DonationType.PLATELETS, addDays(now, -2));

    // When
    const result: Donation[] = getLatest(undefined, [donation1, donation2], 1);

    // Then
    expect(result.length).toBe(1);
    expect(result[0]).toBe(donation1);
  })
});