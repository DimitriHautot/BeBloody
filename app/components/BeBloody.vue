<script setup lang="ts">
  import { onMounted } from 'vue'
  import {ModalDonationForm} from "#components";
  import { computeNextDonationDates } from "~~/services/DonationService";
  import type {Donation} from "~/components/models/Donation";
  import {toDonationType} from "~/components/models/DonationType";

  const overlay = useOverlay();
  const modal = overlay.create(ModalDonationForm)
  let computedDates: Date[] = [new Date(), new Date(), new Date()]

  function loadDonations() : Donation[] {
    const loaded = JSON.parse(localStorage["donations"] || "[]")
    // Parse ISO date-time strings into real Date objects
    for (let loop=0; loop < loaded.length; loop++) {
      loaded[loop].date = new Date(loaded[loop].date)
    }
    return loaded
  }

  function appendAndStore(donation : Donation) : Donation[] {
    const updated : Donation[] = loadDonations()
    updated.push(donation)
    localStorage["donations"] = JSON.stringify(updated)
    return updated
  }

  onMounted(() => computedDates = computeNextDonationDates(loadDonations()))

  async function open() {
    const instance = modal.open()

    const donation = await instance.result as Donation
    if (donation && donation.type && donation.date) {
      // Store new donation
      console.log("Type du don: " + donation.type);
      console.log("Date du don: " + donation.date);
      const donations: Donation[] = appendAndStore(donation)

      // Parse ISO date-time strings into real Date objects
      // for (let loop=0; loop < donations.length; loop++) {
      //   donations[loop].date = new Date(donations[loop].date)
      // }

      // Compute next donation dates
      const result: Date[] = computeNextDonationDates(donations)
      console.log("Computed: " + result)
      console.log("--------------------------")
      computedDates = result
      return result
    }
  }
</script>

<template>
  Vos prochains dons
  <ul>
    <li>de sang: {{ computedDates[0].toDateString() }}</li>
    <li>de plasma:{{ computedDates[1].toDateString() }} </li>
    <li>de plaquettes: {{ computedDates[2].toDateString() }}</li>
  </ul>
  <UButton label="Encodez un don" color="neutral" variant="subtle" @click="open()" />

  <!--  <ModalDonationForm/>-->
</template>

<style scoped>

</style>