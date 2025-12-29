import {Donation} from "../../../app/components/models/Donation";
import {DonationType} from "../../../app/components/models/DonationType";


describe('Donation', () => {
  const now: Date = new Date()

  test('The constructor with appropriate values should create an instance properly', () => {
    // When
    const donation: Donation = new Donation(DonationType.BLOOD, now)

    // Then
    expect(donation.type).toBe(DonationType.BLOOD)
    expect(donation.date).toBe(now)
  })

  test('The constructor with supported string DonationType should create an instance properly', () => {
    // When 1
    let donation: Donation = new Donation('BlOoD', now)

    // Then 1
    expect(donation.type).toBe(DonationType.BLOOD)
    expect(donation.date).toBe(now)

    // When 2
    donation = new Donation('plasma', now)

    // Then 2
    expect(donation.type).toBe(DonationType.PLASMA)
    expect(donation.date).toBe(now)

    // When 3
    donation = new Donation('PLATELETS', now)

    // Then 3
    expect(donation.type).toBe(DonationType.PLATELETS)
    expect(donation.date).toBe(now)
  })

  test('The constructor with unsupported string DonationType should throw an error', () => {
    // When + then 1
    expect(() => new Donation('sang', now)).toThrow('Donation type (type: string, value: \'sang\') is not supported')
    expect(() => new Donation('', now)).toThrow('Donation type (type: string, value: \'\') is not supported')
    expect(() => new Donation(' ', now)).toThrow('Donation type (type: string, value: \' \') is not supported')
    expect(() => new Donation(null, now)).toThrow('Donation type (type: object, value: \'null\') is not supported')
    expect(() => new Donation(undefined, now)).toThrow('Donation type (type: undefined, value: \'undefined\') is not supported')
  })

  test('The constructor with supported number DonationType should create an instance properly', () => {
    // When 1
    let donation: Donation = new Donation(0, now)

    // Then 1
    expect(donation.type).toBe(DonationType.BLOOD)
    expect(donation.date).toBe(now)

    // When 2
    donation = new Donation(1, now)

    // Then 2
    expect(donation.type).toBe(DonationType.PLASMA)
    expect(donation.date).toBe(now)

    // When 3
    donation = new Donation(2, now)

    // Then 3
    expect(donation.type).toBe(DonationType.PLATELETS)
    expect(donation.date).toBe(now)
  })

  test('The constructor with unsupported number DonationType should throw an error', () => {
    // When + then 1
    expect(() => new Donation(-1, now)).toThrow('Donation type (type: number, value: \'-1\') is not supported')
    expect(() => new Donation(3.14, now)).toThrow('Donation type (type: number, value: \'3.14\') is not supported')
    expect(() => new Donation(3, now)).toThrow('Donation type (type: number, value: \'3\') is not supported')
  })
})