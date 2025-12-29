import {addDays, addWeeks, maxOf} from "../../app/utils/DateUtils";

describe('testing DateUtils', () => {

  test('addDays(2023/12/31, 1) should return a valid date(2024/01/01)', () => {
    // Given
    const date: Date = new Date(2023, 11, 31);

    // When
    const result = addDays(date, 1);

    // Then
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  })

  test('addDays(..., ...) over end of February should return a valid date, taking into account leap years', () => {
    // Given
    const dateLeapYear: Date = new Date(2024, 1, 27);
    const dateNonLeapYear: Date = new Date(2023, 1, 27);

    // When
    const resultLeapYear = addDays(dateLeapYear, 2);
    const resultNonLeapYear = addDays(dateNonLeapYear, 2);

    // Then
    expect(resultLeapYear.getFullYear()).toBe(2024);
    expect(resultLeapYear.getMonth()).toBe(1);
    expect(resultLeapYear.getDate()).toBe(29);

    expect(resultNonLeapYear.getFullYear()).toBe(2023);
    expect(resultNonLeapYear.getMonth()).toBe(2);
    expect(resultNonLeapYear.getDate()).toBe(1);
  })

  test('addWeeks(..., ...) over end of February should return a valid date, taking into account leap years', () => {
    // Given
    const dateLeapYear: Date = new Date(2024, 1, 27);
    const dateNonLeapYear: Date = new Date(2023, 1, 27);

    // When
    const resultLeapYear = addWeeks(dateLeapYear, 1);
    const resultNonLeapYear = addWeeks(dateNonLeapYear, 1);

    // Then
    expect(resultLeapYear.getFullYear()).toBe(2024);
    expect(resultLeapYear.getMonth()).toBe(2);
    expect(resultLeapYear.getDate()).toBe(5);

    expect(resultNonLeapYear.getFullYear()).toBe(2023);
    expect(resultNonLeapYear.getMonth()).toBe(2);
    expect(resultNonLeapYear.getDate()).toBe(6);
  })

  test('maxOf(Date, Date) should return the latest date', () => {
    // Given
    const date1a: Date = new Date()
    date1a.setHours(0, 0, 0, 0)
    const date1b: Date = new Date(date1a)
    let date2 = new Date()
    date2.setHours(0, 0, 0, 0);
    date2 = addDays(date2, 1)

    // When 1
    let result = maxOf(date1a, date1b);
    // Then 1
    expect(result).toBe(date1a)

    // When 2
    result = maxOf(date1b, date1a);
    // Then 2
    expect(result).toBe(date1b)

    // When 3
    result = maxOf(date1b, date1b);
    // Then 2
    expect(result).toBe(date1b)

    // When 3
    result = maxOf(date1a, date2);
    // Then 2
    expect(result).toBe(date2)
  })
});
