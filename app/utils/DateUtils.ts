// https://www.convex.dev/typescript/ecosystems-integrations/date-time/typescript-date#adding-or-subtracting-days

export function maxOf(date1: Date, date2: Date) {
  if (date1.getTime() < date2.getTime()) {
    return date2;
  }

  return date1;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
