import type { Donation } from "~/components/models/Donation";

function latest(type: string, donations: Donation[]) : Date | undefined {
  return donations
  .filter((donation) => donation.type === type)
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .map((donation) => donation.date)[0] || undefined;
}

export function computeNextDonationDates(donations: Donation[]) : Date[] {
  const latestSang = latest('sang', donations)
  const latestPlasma = latest('plasma', donations);
  const latestPlaquettes = latest('plaquettes', donations);

  // TODO Actual computation

  return [
    latestSang || new Date(),
    latestPlasma || new Date(),
    latestPlaquettes || new Date()
  ];
}